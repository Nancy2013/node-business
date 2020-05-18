<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-16 17:33:56
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
             @change="userListChange">
      <template slot="index"
                slot-scope="text, record,index">
        <span>{{ index+1 }}</span>
      </template>
      <template slot="operation"
                slot-scope="text, record">
        <a @click="edit(record)">{{ record.rolename==='超级管理员'?'':'编辑' }}</a>
      </template>
    </a-table>
    <!-- 人员弹窗 -->
    <a-modal v-if="isModal"
             ref="modalBlack"
             :title="modalTitle"
             v-model="isModal"
             :mask-closable="false"
             :width="332"
             :closable="false"
             ok-text="确定"
             cancel-text="取消">
      <a-form :form="form"
              hide-required-mark>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="角色">
          <a-select v-model="current.roleid"
                    style="width: 100%">
            <a-select-option v-for="item in roleList"
                             :key="item.id"
                             :value="item.id">
              {{ item.rolename }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="名称">
          <a-input v-decorator="[ `displayname`,{
            initialValue: current.displayname,
            rules: [{ required: true, message: '请输入用户名称' }],} ]" />
        </a-form-item>
        <a-form-item :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="账号">
          <a-input v-decorator="[ `accountname`,{
            initialValue: current.accountname,
            rules: [{ required: true, message: '请输入正确手机号', pattern:accountVer }],} ]"
                   :disabled="current.id?true:false" />
        </a-form-item>
        <a-form-item v-if="current.id"
                     :label-col="{ span: 4 }"
                     :wrapper-col="{ span: 20 }"
                     :colon="false"
                     label="密码">
          <a-input v-decorator="[ `accountpwd`,{
                     initialValue: current.accountpwd,
                     rules: [{ required: true, message: '请输入密码' }],} ]"
                   type="password"
                   style="width: 56%;margin-right: 5px" />
          <a-button key="submit"
                    type="primary"
                    style="padding: 0 6px;font-size: 10px;line-height: 1.699"
                    @click="resetPwd">重置为初始密码</a-button>
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
  import service from 'servicePath/index';
  import Mix from '@/mixins';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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
      title: '账号',
      dataIndex: 'accountname',
      width: '10%',
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'displayname',
      width: '10%',
      align: 'center',
    },
    {
      title: '角色',
      dataIndex: 'rolename',
      width: '10%',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: '10%',
      align: 'center',
      scopedSlots: { customRender: 'operation' },
    },
    {
      title: '',
      dataIndex: 'hide',
      align: 'center',
      scopedSlots: { customRender: 'hide' },
    },
  ];
  export default {
    name: 'UserList',
    mixins: [PageTableCreaterMix('userList')],
    data() {
      return {
        form: this.$form.createForm(this),
        isModal: false,
        installerid: '',
        roleList: [],
        current: {},
        accountVer: /^1[34578][0-9]{9}$/,
        columns,
      };
    },
    computed: {
      ...mapState('userManage', ['roleID']),
      ...mapState('userManage', ['displayName']),
      ...mapState('app', ['userInfo', 'projectInfo']),
      modalTitle() {
        const { current } = this;
        return `${current.id ? '编辑' : '添加'}人员`;
      },
    },
    watch: {
      roleID(newVal, oldVal) {
        if (newVal === '-1') {
          this.setRoleid(`-${this.installerid}`);
        }
        this.init();
      },
    },
    beforeCreate() {
      this.$nextTick(function() {
        this.getRole();
      });
    },
    methods: {
      ...mapMutations('userManage', ['setRoleid']),
      ...mapMutations('app', ['setUserInfo']),
      doSearch() {
        this.init();
      },
      // 添加
      async add() {
        this.isModal = true;
        await this.getRole();
        const { roleList } = this;
        this.current = {
          roleid: roleList.length > 0 ? roleList[0].id : '',
        };
      },
      // 编辑
      async edit(record) {
        this.isModal = true;
        this.current = {
          ...record,
        };
        await this.getRole();
        const { roleList } = this;
        if (roleList[0]) {
          const idIndex = this.roleList.findIndex(v => v.id === this.current.roleid);
          if (idIndex < 0) {
            this.current.roleid = '';
          }
        }
      },
      // 重置密码
      resetPwd() {
        const { accountname } = this.current;
        this.form.setFieldsValue({
          accountpwd: accountname.substr(-6),
        });
      },
      // 删除
      showDelModal() {
        const { id } = this.current;
        if (id === this.userInfo.id) {
          this.$message.warning('不能删除自己的账户!');
          return;
        }
        const that = this;
        this.$confirm({
          title: '确定要删除人员？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del();
          },
          onCancel() {},
        });
      },
      // 取消
      handleCancel() {
        this.isModal = false;
      },
      // 删除
      del() {
        const { accountname, id } = this.current;
        const params = {
          ...this.current,
          accountname,
          uid: id,
          pid: `${this.projectInfo.id}`,
        };
        userManageAsk
          .delAccounttable(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.formatPagination();
              this.userListFetch();
              this.isModal = false;
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 确定弹窗
      handleOk() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { $md5, current } = this;
          const { id } = this.current;
          const initAccountpwd = this.current.accountpwd;
          const { displayname, accountname, accountpwd } = fieldsValue;
          this.current = {
            ...current,
            displayname,
            accountname,
          };
          if (id) {
            // 修改
            this.current = {
              ...this.current,
              accountpwd: initAccountpwd === accountpwd ? accountpwd : $md5(accountpwd),
            };
            this.modUsertable();
          } else {
            // 添加
            this.current = {
              ...this.current,
              accountpwd: $md5(accountname.substr(-6)),
            };
            this.addUsertable();
          }
        });
      },
      modUsertable() {
        const { id } = this.userInfo;
        const params = {
          ...this.current,
        };
        userManageAsk
          .modAccounttable(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              if (this.current.id == id) {
                this.setUserInfo(params);
                localStorage.setItem(`userInfoB_${this.projectInfo.id}`, JSON.stringify(params));
              }
              this.userListFetch();
              this.isModal = false;
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      addUsertable() {
        const params = {
          ...this.current,
        };
        userManageAsk
          .addAccounttable(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.userListFetch();
              this.isModal = false;
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      async getRole() {
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
        };
        await userManageAsk
          .getRole(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { alist = [] } = data;
              this.roleList = alist;
              const index = this.roleList.findIndex(v => v.rolename === '安装工');
              if (index > -1) {
                this.installerid = this.roleList[index].id;
                this.setRoleid(`-${this.installerid}`);
              }
            } else {
              this.roleList = [];
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 请求数据
      async userListFetchList(params) {
        const { roleID, displayName } = this;
        const { errcode, data = {} } = await userManageAsk.getAccounttable({
          ...params,
          displayname: displayName,
          roleid: roleID,
          order: 'accountname',
        });
        return { total: data.totalsize, data: data.alist };
      },
    },
  };
</script>

<style scoped>
</style>
