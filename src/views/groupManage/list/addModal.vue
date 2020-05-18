<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 10:36:21
 * @LastEditTime: 2019-10-29 14:53:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-modal :title="modalTitle"
             v-model="isModal"
             :mask-closable="false"
             :width="400"
             :footer="null"
             ok-text="确定"
             cancel-text="取消"
             @cancel="cancel">
      <a-form :form="form"
              hide-required-mark>
        <a-form-item v-if="group.parentgid"
                     :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     :colon="false"
                     label="上级分组">
          <a-input v-model="group.parentname"
                   disabled />
        </a-form-item>
        <a-form-item :label-col="labelCol"
                     :wrapper-col="wrapperCol"
                     :colon="false"
                     label="分组名称">
          <a-input v-decorator="[
            'name',
            {
              initialValue: group.name,
              rules: [
                {
                  required: true,
                  message: '请输入分组名称长度不超过20个字符',
                  max: GLOBAL.NAME_MAX_LEN,
                },
              ],
            },
          ]" />
        </a-form-item>
      </a-form>
      <div class="modal-footer-btn-right">
        <a-button class="mr10"
                  @click="cancel">取消</a-button>
        <a-button v-if="isShowDel"
                  type="danger"
                  class="mr10"
                  @click="showDelModal">删除</a-button>
        <a-button type="primary"
                  @click="ok">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { groupManageAsk } = service;

  export default {
    name: 'AddModal',
    components: {},
    mixins: [],
    props: {
      isAdd: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        form: this.$form.createForm(this),
        isModal: true,
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      };
    },
    computed: {
      ...mapState('groupManage', ['node']),
      ...mapGetters('groupManage', ['formatGroup']),
      group() {
        const { isAdd } = this;
        return this.formatGroup(isAdd);
      },
      modalTitle() {
        const { id } = this.group;
        return `${id ? '编辑' : '添加'}分组`;
      },
      isShowDel() {
        const { isJump, $children = [], expanded, dataRef = {} } = this.node;
        if (isJump) {
          // 跳转选中，都不显示删除按钮
          return false;
        }
        // 判断是否有子分组 展开时有1个无效子节点 | 折叠有2个无效子节点
        const isGroupEmpty =
          (expanded && $children && $children.length <= 1) ||
          (!expanded && $children && $children.length <= 2);
        // 判断是否有子设备
        const isDeviceEmpty = dataRef && !dataRef.devicenum;
        // 显示删除按钮条件: 非根分组 | 编辑分组 | 无子分组 | 无设备
        return dataRef.parentgid && this.group.id && isGroupEmpty && isDeviceEmpty;
      },
    },
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
      ...mapMutations('groupManage', ['updateNode']),
      // 取消
      cancel() {
        this.$emit('cancel');
      },
      // 确定
      ok() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { isAdd } = this;
          if (isAdd) {
            // 添加
            this.addGroup();
          } else {
            // 编辑
            this.modGroup();
          }
        });
      },
      // 删除提示
      showDelModal() {
        const that = this;
        this.$confirm({
          title: '确定删除该数据？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del();
          },
          onCancel() {},
        });
      },
      // 删除
      del() {
        const { id } = this.group;
        const params = { id };
        groupManageAsk
          .delGroup(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$emit('del');
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      addGroup() {
        const { name } = this.form.getFieldsValue();
        const params = {
          ...this.group,
          name,
        };
        groupManageAsk
          .addGroup(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              // 根分组
              this.$emit('ok', data);
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      modGroup() {
        const { name } = this.form.getFieldsValue();
        const params = {
          ...this.group,
          name,
          title: `${name}(${this.group.devicenum || 0}台)`,
        };
        groupManageAsk
          .modGroup(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              const { node } = this;
              const { devicenum } = node.dataRef;
              const newNode = {
                ...node,
                dataRef: params,
                title: `${name}(${devicenum || 0}台)`,
              };
              this.$emit('ok', newNode);
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
