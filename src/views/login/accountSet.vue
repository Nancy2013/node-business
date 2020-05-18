<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-30 14:59:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <Topbar />
    <div class="reset-container">
      <div class="header-panel">
        <bl-header>
          <span slot="left"
                class="cursor"
                @click="goBack">
            <a-icon type="arrow-left"
                    class="mr10" />账号设置</span>
        </bl-header>
      </div>
      <bl-page-wrapper>
        <div slot="content">
          <div class="reset-panel">
            <div>
              <div class="form-panel">
                <div class="form-content">
                  <a-form hide-required-mark>
                    <a-form-item :label-col="{ span: 6 }"
                                 :wrapper-col="{ span: 16 }"
                                 :colon="false"
                                 label="账号">
                      <a-input v-model="userInfo.accountname"
                               disabled />
                    </a-form-item>

                    <a-form-item :label-col="{ span: 6}"
                                 :wrapper-col="{ span: 16 }"
                                 :colon="false"
                                 label="用户名">
                      <a-row :gutter="10">
                        <a-col :span="18">
                          <a-input v-model="userInfo.displayname"
                                   disabled />
                        </a-col>
                        <a-col :span="6">
                          <a-button type="primary"
                                    block
                                    @click="editName">编辑</a-button>
                        </a-col>
                      </a-row>
                    </a-form-item>

                    <a-form-item :label-col="{ span: 6 }"
                                 :wrapper-col="{ span: 16 }"
                                 :colon="false"
                                 label="密码">
                      <a-row :gutter="10">
                        <a-col :span="18">
                          <a-input placeholder="*********"
                                   disabled
                                   type="password" />
                        </a-col>
                        <a-col :span="6">
                          <a-button type="primary"
                                    block
                                    @click="editPSD">编辑</a-button>
                        </a-col>
                      </a-row>
                    </a-form-item>
                  </a-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </bl-page-wrapper>

    </div>

    <!-- 修改用户名 -->
    <a-modal :mask-closable="false"
             :width="400"
             :closable="false"
             v-model="isUserModal"
             title="修改用户名"
             ok-text="确定"
             cancel-text="取消"
             @ok="setNameOk">
      <a-form :form="formName"
              hide-required-mark>
        <a-form-item :label-col="{ span: 0}"
                     :wrapper-col="{ span: 24 }"
                     :colon="false"
                     label="">
          <a-input v-decorator="formRules.displayname"
                   placeholder="请输入用户名" />
        </a-form-item>
      </a-form>

    </a-modal>

    <!-- 修改密码 -->
    <a-modal v-if="isPSDModal"
             :mask-closable="false"
             :width="400"
             :closable="false"
             v-model="isPSDModal"
             title="修改密码"
             ok-text="确定"
             cancel-text="取消"
             @ok="setPSDOk">
      <a-form :form="formPwd"
              hide-required-mark
              class="reset-form-item">
        <a-form-item :label-col="{ span: 0}"
                     :wrapper-col="{ span: 24 }"
                     :colon="false"
                     label="">
          <a-input v-decorator="formRules.accountpwd"
                   type="password"
                   style="margin-bottom:10px;"
                   placeholder="请输入原登录密码"
                   @focus="focus" />
        </a-form-item>
        <a-form-item :label-col="{ span: 0}"
                     :wrapper-col="{ span: 24 }"
                     :colon="false"
                     label="">
          <a-input v-decorator="formRules.newAccountpwd"
                   type="password"
                   style="margin-bottom:10px;"
                   placeholder="请输入新密码" />
        </a-form-item>
        <span v-if="isError"
              class="error-tips">原密码输入错误，请重新输入</span>
      </a-form>

    </a-modal>
  </div>
</template>


<script>
  import Topbar from 'viewsPath/common/Topbar.vue';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { appAsk } = service;
  export default {
    name: 'AccountSet',
    components: {
      Topbar,
    },
    props: {},
    data() {
      return {
        isUserModal: false,
        isPSDModal: false,
        isError: false,
        formName: this.$form.createForm(this),
        formPwd: this.$form.createForm(this),
        formRules: {
          displayname: [
            'displayname',
            {
              rules: [{ required: true, message: '请输入用户名长度不超过20个字符', max: 20 }],
            },
          ],
          accountpwd: [
            'accountpwd',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入原登录密码' }],
            },
          ],
          newAccountpwd: [
            'newAccountpwd',
            {
              initialValue: '',
              rules: [{ required: true, message: '请输入新密码不少于6个字符', min: 6, max: 20 }],
            },
          ],
        },
      };
    },
    computed: {
      ...mapState('app', ['userInfo', 'projectInfo']),
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      ...mapMutations('app', ['setUserInfo']),
      goBack() {
        this.$router.go(-1);
      },
      /* 编辑用户名 */
      editName() {
        const { displayname } = this.userInfo;
        this.isUserModal = true;
        this.$nextTick(() => {
          this.formName.setFieldsValue({
            displayname,
          });
        });
      },
      /* 确定保存用户名 */
      setNameOk() {
        this.formName.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { displayname } = fieldsValue;
          const { id } = this.userInfo;
          // 昵称
          const params = {
            id,
            displayname,
          };
          appAsk
            .modAccount(params)
            .then(result => {
              const { errcode, data } = result;
              if (errcode === 200) {
                this.$message.success('修改成功！');
                const userInfo = {
                  ...this.userInfo,
                  displayname,
                };
                this.setUserInfo(userInfo);
                localStorage.setItem(`userInfoB_${this.projectInfo.id}`, JSON.stringify(userInfo));
                this.isUserModal = false;
              }
            })
            .catch(e => {
              console.error(e);
            });
        });
      },
      // 清除错误
      focus() {
        this.isError = false;
      },
      /* 编辑密码 */
      editPSD() {
        this.isPSDModal = true;
      },
      /* 确定保存密码 */
      setPSDOk() {
        this.formPwd.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { id } = this.projectInfo;
          const userInfo = JSON.parse(localStorage[`userInfoB_${id}`] || '{}');
          const initAccountpwd = userInfo.accountpwd;
          const { accountpwd, newAccountpwd } = fieldsValue;
          if (initAccountpwd !== this.$md5(accountpwd)) {
            this.isError = true;
            return;
          }
          // 修改密码
          const params = {
            id: this.userInfo.id,
            accountpwd: this.$md5(newAccountpwd),
          };
          appAsk
            .modAccount(params)
            .then(result => {
              const { errcode, data } = result;
              if (errcode === 200) {
                this.$message.success('修改成功！');
                const userInfo = {
                  ...this.userInfo,
                  accountpwd: this.$md5(newAccountpwd),
                };
                this.setUserInfo(userInfo);
                localStorage.setItem(`userInfoB_${id}`, JSON.stringify(userInfo));
                this.isPSDModal = false;
              }
            })
            .catch(e => {
              console.error(e);
            });
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .reset-container {
    .reset-panel {
      padding: 20px;
      background: #fff;
      .form-panel {
        margin-top: 100px;
        text-align: center;
      }
      .form-content {
        display: inline-block;
        width: 520px;
      }
    }
  }
</style>
