<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-16 16:25:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-table :columns="columns"
             :row-key="record => record.id"
             :data-source="data"
             :loading="loading"
             :pagination="pagination"
             class="reset-pagination"
             @change="roleListChange">
      <template slot="index"
                slot-scope="text, record,index">
        <span>{{ index+1 }}</span>
      </template>
      <template slot="operation"
                slot-scope="text, record">
        <a @click="edit(record)">编辑</a>
      </template>
    </a-table>
    <!-- 人员弹窗 -->
    <a-modal v-if="isModal"
             ref="modalBlack"
             :title="modalTitle"
             v-model="isModal"
             :mask-closable="false"
             :width="468"
             :closable="false"
             ok-text="确定"
             cancel-text="取消">
      <a-form :form="form"
              hide-required-mark>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="名称">
          <a-input v-decorator="[ `rolename`,{
            initialValue: current.rolename,
            rules: [{ required: true, message: '请输入角色名称' }],} ]" />
        </a-form-item>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="权限">
          <a-checkbox-group v-model="selected"
                            class="modal-border-panel">
            <a-row v-for="item in urlSiteList"
                   :key="item.id"
                   class="mb10">
              <a-checkbox :value="item.id">{{ item.urlname }}</a-checkbox>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button key="back"
                  @click="handleCancel">取消</a-button>
        <a-button v-show="current.id"
                  type="danger"
                  @click="showDelModal">删除</a-button>
        <a-button key="submit"
                  type="primary"
                  @click="handleOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { userManageAsk } = service;
  const { PageTableCreaterMix } = Mix;
  // 表头
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: '10%',
      align: 'center',
      scopedSlots: { customRender: 'index' },
    },
    {
      title: '角色名称',
      dataIndex: 'rolename',
      width: '10%',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'left',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  export default {
    name: 'RoleList',
    mixins: [PageTableCreaterMix('roleList')],
    data() {
      return {
        form: this.$form.createForm(this),
        isModal: false,
        urlSiteList: [],
        selected: [],
        ruids: [],
        current: {},
        columns,
      };
    },
    computed: {
      modalTitle() {
        const { current } = this;
        return `${current.id ? '编辑' : '添加'}角色`;
      },
    },
    methods: {
      // 添加
      add() {
        this.isModal = true;
        this.current = {};
        this.getAllUrl();
      },
      // 编辑
      async edit(record) {
        this.isModal = true;
        this.current = {
          ...record,
        };
        await this.getAllUrl();
        const { id } = this.current;
        const params = {
          rid: `${id}`,
        };
        userManageAsk
          .getRU(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { alist = [] } = data;
              this.selected = alist && alist.map(v => v.urlid);
              this.ruids = alist && alist.map(v => v.id);
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 获取权限
      getAllUrl() {
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
        };
        userManageAsk
          .getUrlsite(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { alist = [] } = data;
              this.urlSiteList = alist;
            } else {
              this.urlSiteList = [];
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 删除
      showDelModal(record) {
        const { status } = this.current;
        if (status === 1) {
          // 系统初始化角色不能删除
          this.$message.warning('系统初始化角色不能删除!');
          return;
        }
        const that = this;
        this.$confirm({
          title: '确定要删除角色？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del(record);
          },
          onCancel() {},
        });
      },
      // 确定弹窗
      handleOk() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { current } = this;
          this.current = {
            ...current,
            rolename: fieldsValue.rolename,
          };
          if (current.id) {
            // 编辑
            this.modRoletable();
          } else {
            // 添加
            this.addRoletable();
          }
        });
      },
      // 取消
      handleCancel() {
        this.selected = [];
        this.isModal = false;
      },
      // 添加
      async addRoletable() {
        const roleid = await this.addRole();
        this.roleListFetch();
        this.modRoleUrl(roleid);
      },
      // 添加角色
      async addRole() {
        const params = {
          rolename: this.current.rolename,
          status: 2,
        };
        return userManageAsk
          .addRole(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              return `${data.uid}`;
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 编辑
      modRoletable() {
        const { id, rolename } = this.current;
        const Params = {
          id,
          rolename,
        };
        userManageAsk
          .modRole(Params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.roleListFetch();
              this.modRoleUrl(id);
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 删除
      del() {
        const { id } = this.current;
        const params = {
          uid: id,
        };
        userManageAsk
          .delRole(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.formatPagination();
              this.roleListFetch();
              this.handleCancel();
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 解绑再绑定
      async modRoleUrl(id) {
        const { ruids, selected } = this;
        const params = {
          ruids,
          roleid: id,
        };
        const urlParams = {
          roleid: id,
          urlid: selected,
        };
        // 解绑
        userManageAsk
          .unbindRU(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              if (selected.length !== 0) {
                // 重新绑定
                userManageAsk.bindRU(urlParams).catch(e => {
                  console.error(e);
                });
              }
              this.$message.success('操作成功！');
              this.handleCancel();
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 请求数据
      async roleListFetchList(params) {
        const { errcode, data = {} } = await userManageAsk.getRole({
          ...params,
          order: 'id',
        });
        return { total: data.totalsize, data: data.alist };
      },
    },
  };
</script>

<style scoped>
</style>
