<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-10 10:56:24
 * @LastEditTime: 2019-10-10 10:56:24
 * @LastEditors: your name
 -->
<template>
  <a-spin :spinning="spinning">
    <div>
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
      </bl-header>
      <bl-page-wrapper class="content-padding">
        <div slot="content">
          <a-form :form="form"
                  hide-required-mark
                  class="reset-line-height"
                  style="width:800px;">
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="门店名称">
              <a-input v-decorator="[ `name`,{
          initialValue:data.name,
          rules: [{ required: true, message: '输入门店名称长度不超过20个字符' ,max:GLOBAL.NAME_MAX_LEN}],} ]" />
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="{span:20}"
                         :colon="false"
                         label="门店位置">
              <bl-cascader :default-value="defaultValue"
                           style="margin-right:10px;"
                           @update="updateLocation" />
              <a-input v-decorator="[ `location`,{
          initialValue:data.location,
          rules: [{ required: true, message: '输入详细门店位置' }],} ]"
                       placeholder="详细地址：如道路门牌"
                       class="component-w-224" />
            </a-form-item>
            <a-form-item :label-col="{span:0}"
                         :wrapper-col="{span:24}"
                         :colon="false"
                         label=""
                         style="margin-top:100px;">
              <a-button class="mr10"
                        @click="cancel">取消</a-button>
              <a-button v-if="id"
                        class="mr10"
                        type="danger"
                        @click="showDelModal">删除</a-button>
              <a-button class="mr10"
                        type="primary"
                        @click="ok">确定
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </bl-page-wrapper>
    </div>
  </a-spin>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';

  const { locationManageAsk } = service;

  export default {
    name: 'StoreDetail',
    components: {},
    props: {},
    data() {
      return {
        data: {},
        spinning: false,
        id: this.$route.params.id,
        form: this.$form.createForm(this),
        labelCol: { span: 2 },
        wrapperCol: { span: 6 },
        breadcrumbRoutes: [],
        provincial: '',
        urban: '',
        areas: '',
        defaultValue: undefined,
      };
    },
    computed: {},
    watch: {},
    created() {
      this.init();
    },
    mounted() {},
    methods: {
      init() {
        this.setBreadcrumb();
        const { id, data } = this;
        if (id) {
          this.getDetail();
        } else {
          this.data = {
            ...data,
            provincial: '北京市',
            urban: '市辖区',
            areas: '东城区',
          };
        }
      },
      // 设置面包屑
      setBreadcrumb() {
        const breadcrumbRoutes = [
          {
            name: '位置管理',
            breadcrumbName: '全部位置',
          },
        ];
        if (this.id) {
          // 详情
          this.breadcrumbRoutes = [
            ...breadcrumbRoutes,
            {
              name: '',
              breadcrumbName: '门店详情',
            },
          ];
        } else {
          // 添加门店
          this.breadcrumbRoutes = [
            ...breadcrumbRoutes,
            {
              name: '',
              breadcrumbName: '添加门店',
            },
          ];
        }
      },
      // 更新位置
      updateLocation(params) {
        const [provincial, urban, areas] = params;
        this.data = {
          ...this.data,
          provincial,
          urban,
          areas,
        };
      },
      // 取消
      cancel() {
        this.$router.back();
      },
      // 删除确认弹窗
      showDelModal() {
        const that = this;
        this.$confirm({
          title: '确定要删除门店？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del();
          },
          onCancel() {},
        });
      },
      // 确定
      ok() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { id, data } = this;
          const { name, location } = fieldsValue;
          this.data = {
            ...data,
            name,
            location,
          };
          if (id) {
            // 编辑
            this.mod();
          } else {
            // 添加
            this.add();
          }
        });
      },
      // 添加
      add() {
        this.spinning = true;
        const params = {
          ...this.data,
        };
        locationManageAsk
          .addStore(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'storeList' });
              this.spinning = false;
            }
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 修改
      mod() {
        this.spinning = true;
        const params = {
          ...this.data,
        };
        locationManageAsk
          .modStore(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'storeList' });
              this.spinning = false;
            }
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      del() {
        const { id } = this;
        const params = {
          storeids: [id],
        };
        locationManageAsk
          .delStore(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'storeList' });
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 查询详情
      getDetail() {
        this.spinning = true;
        const { id } = this;
        const params = {
          limit: 1,
          offset: 1,
          id: parseInt(id),
        };

        locationManageAsk
          .storeList(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { stores = [] } = data;
              this.data = stores[0] || {};
              const { provincial = '北京市', urban = '市辖区', areas = '东城区' } = this.data;
              this.defaultValue = [provincial, urban, areas];
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
