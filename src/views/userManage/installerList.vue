<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-16 17:42:32
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
             @change="installerListChange">
      <template slot="index"
                slot-scope="text, record,index">
        <span>{{ index+1 }}</span>
      </template>
      <template slot="operation"
                slot-scope="text, record">
        <a @click="generate(record)">生成二维码</a>
        <a-divider type="vertical" />
        <a @click="edit(record)">编辑</a>
      </template>
    </a-table>
    <!-- 二维码弹窗 -->
    <a-modal v-if="isModal"
             ref="modalBlack"
             v-model="isModal"
             :mask-closable="false"
             :width="400"
             :closable="true"
             title="安装APP授权"
             class="qrcodeModal">
      <p v-show="isgenerate"
         class="settime">请设置授权有效期限</p>
      <a-range-picker v-show="isgenerate"
                      v-model="defaultTime"
                      :format="dateFormat" />
      <div v-show="isdownload"
           class="showqrcode">
        <img :src="imgUrl"
             style="width: 50%" />
        <span class="qrcodeTip">请使用安装APP扫码</span>
      </div>
      <template slot="footer">
        <a-button v-show="isgenerate"
                  key="submit"
                  type="primary"
                  @click="handlegenerate">生成二维码</a-button>
        <a-button v-show="isdownload"
                  type="primary"
                  @click="handledownload">
          <a :href="imgUrl"
             download="二维码.png"
             class="aUnderline">下载</a>
        </a-button>
      </template>
    </a-modal>
    <!-- 人员弹窗 -->
    <a-modal v-if="isMdl"
             ref="modalBlack"
             :title="mdlTitle"
             v-model="isMdl"
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
          <a-select :disabled="true"
                    v-model="current.roleid"
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
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import moment from 'moment';
  import QRCode from 'qrcode';
  import atob from 'atob';
  import Blob from 'blob';

  const { userManageAsk } = service;
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
      title: '二维码时效',
      dataIndex: 'vetimestr',
      width: '20%',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: '20%',
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
    name: 'InstallerList',
    data() {
      return {
        data: [],
        form: this.$form.createForm(this),
        isModal: false,
        isgenerate: true,
        isdownload: false,
        isMdl: false,
        roleList: [],
        current: {},
        accountToken: '',
        imgUrl: '',
        dateFormat: 'YYYY/MM/DD',
        defaultTime: [],
        accountVer: /^1[34578][0-9]{9}$/,
        columns,
        loading: false,
        pagination: {
          current: 1,
          pageSize: 15,
          total: 0,
        },
      };
    },
    computed: {
      ...mapState('userManage', ['displayName']),
      ...mapState('app', ['userInfo', 'projectInfo']),
      mdlTitle() {
        const { current } = this;
        return `${current.id ? '编辑' : '添加'}人员`;
      },
    },
    watch: {},
    created() {
      this.getInstallerList();
    },
    methods: {
      ...mapMutations('app', ['setUserInfo']),
      moment,
      doSearch() {
        this.pagination.current = 1;
        this.getInstallerList();
      },
      // 添加
      async add() {
        this.isMdl = true;
        await this.getRole();
        const { roleList = [] } = this;
        const index = this.roleList.findIndex(v => v.rolename === '安装工');
        this.current = {
          roleid: index > -1 ? roleList[index].id : '',
        };
      },
      // 编辑
      edit(record) {
        this.isMdl = true;
        this.current = {
          ...record,
        };
        this.getRole();
      },
      // 重置密码
      resetPwd() {
        const { accountname } = this.current;
        this.form.setFieldsValue({
          accountpwd: accountname.substr(-6),
        });
      },
      // 生成
      generate(record) {
        this.current = {
          ...record,
        };
        this.isModal = true;
        this.isgenerate = true;
        this.isdownload = false;
        const { dateFormat } = this;
        const { validtime, expiretime, vetimestr } = this.current;
        if (vetimestr && vetimestr != '-') {
          this.defaultTime = [moment(validtime, dateFormat), moment(expiretime, dateFormat)];
        } else {
          this.defaultTime = [];
        }
      },
      // 删除
      showDelModal(record) {
        const that = this;
        this.$confirm({
          title: '确定要删除人员？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del(record);
          },
          onCancel() {},
        });
      },
      // 取消
      handleCancel() {
        this.isMdl = false;
      },
      // 删除
      del() {
        const { accountname, id } = this.current;
        const params = {
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
              this.getInstallerList();
              this.isMdl = false;
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
            // 编辑
            this.current = {
              ...this.current,
              accountpwd: initAccountpwd === accountpwd ? accountpwd : $md5(accountpwd),
            };
            this.modInstallertable();
          } else {
            // 添加
            this.current = {
              ...this.current,
              accountpwd: $md5(accountname.substr(-6)),
            };
            this.addInstallertable();
          }
        });
      },
      modInstallertable() {
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
              this.getInstallerList();
              this.isMdl = false;
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      addInstallertable() {
        const params = {
          ...this.current,
        };
        userManageAsk
          .addAccounttable(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.getInstallerList();
              this.isMdl = false;
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 生成二维码
      async handlegenerate() {
        const [validtime, expiretime] = this.defaultTime;
        if (!validtime) {
          this.$message.warning('请先选择授权有效期限！');
          return;
        }
        const auth = await this.modAccountAuth();
        if (auth) {
          // 修改用户信息成功
          const token = await this.getToken();
          if (token) {
            // 获得token成功
            this.generateQRcode(token);
          }
        }
      },
      // 修改用户授权有效期限
      modAccountAuth() {
        const { id, accountname } = this.current;
        const [validtime, expiretime] = this.defaultTime;
        const params = {
          id,
          accountname,
          validtime: validtime ? validtime.format(this.GLOBAL.TIME_EFFECETIVE) : '',
          expiretime: expiretime ? expiretime.format(this.GLOBAL.TIME_EFFECETIVE) : '',
        };
        return userManageAsk
          .modAccounttable(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.getInstallerList();
              return true;
            }
            return false;
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 获得二维码token
      async getToken() {
        const { accountpwd, accountname } = this.current;
        const params = {
          accountname,
          password: accountpwd,
          ctype: '2', // 安装工请求token
          pid: `${this.projectInfo.id}`,
        };
        return userManageAsk
          .getToken(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              return data.token;
            }
            return null;
          })
          .catch(e => console.error(e));
      },
      // 显示二维码
      generateQRcode(token) {
        QRCode.toDataURL(token)
          .then(url => {
            this.imgUrl = url;
            this.isgenerate = false;
            this.isdownload = true;
          })
          .catch(err => {
            this.$message.error('生成二维码失败！');
            console.error(err);
          });
      },
      // 下载
      handledownload() {
        const { imgUrl } = this;
        if (imgUrl) {
          if (window.navigator.msSaveOrOpenBlob) {
            const bstr = atob(imgUrl.split(',')[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n) {
              n -= 1;
              u8arr[n] = bstr.charCodeAt(n);
            }
            const blob = new Blob([u8arr]);
            window.navigator.msSaveOrOpenBlob(blob, '二维码.png');
          }
        }
      },
      // 获取角色
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
            } else {
              this.roleList = [];
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 切换页
      installerListChange(p, filter, sorter) {
        this.pagination = { ...p };
      },
      // 查询安装工
      getInstallerList() {
        this.loading = true;
        const { displayName } = this;
        const params = {
          displayname: displayName,
          order: 'createtime',
          offset: 1,
          limit: this.GLOBAL.MAX_LEN,
          seq: 1,
        };
        userManageAsk
          .getAccounttable(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { alist = [] } = data;
              this.data = alist.filter(v => v.rolename === '安装工');
              const { pagination } = this;
              this.pagination = {
                ...pagination,
                total: this.data.length,
              };
            }
            this.loading = false;
          })
          .catch(e => {
            console.error(e);
            this.loading = false;
          });
      },
    },
  };
</script>

<style scoped>
  .qrcodeModal {
    text-align: center;
  }
  .showqrcode {
    text-align: center;
  }
  .qrcodeTip {
    display: block;
  }
</style>
