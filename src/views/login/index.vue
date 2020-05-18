<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-29 17:34:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div :style="styleObject"
       class="login">
    <div class="center">
      <div class="header">
        <div class="title-panel">
          <div class="title">
            {{ projectInfo.projectname }}
          </div>
        </div>
      </div>
      <div class="form-panel">
        <div class="form-content mt30">
          <a-form :form="form"
                  hide-required-mark
                  class="reset-form-item">
            <a-form-item :label-col="{ span: 0 }"
                         :wrapper-col="{ span: 24 }"
                         :colon="false"
                         style="margin-bottom:20px;"
                         label="">
              <a-input v-decorator="formRules.accountName"
                       placeholder="账号"
                       style="margin-bottom:10px;"
                       @focus="focus">
                <a-icon slot="prefix"
                        type="user" />
              </a-input>
            </a-form-item>
            <a-form-item :label-col="{ span: 0 }"
                         :wrapper-col="{ span: 24 }"
                         :colon="false"
                         label="">
              <a-input v-decorator="formRules.password"
                       placeholder="密码"
                       type="password"
                       style="margin-bottom:10px;"
                       @focus="focus">
                <span slot="prefix"
                      class="iconfont iconsuo"></span>
              </a-input>
            </a-form-item>
            <span v-if="isError"
                  class="error-tips">账号或密码错误，请重新输入</span>
            <a-form-item :label-col="{ span: 0 }"
                         :wrapper-col="{ span: 24 }"
                         :colon="false"
                         label="">
              <a-button type="primary"
                        class="bottom-btn mt20"
                        @click="login">登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import service from 'servicePath/index';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import logo from 'stylesPath/images/logo.png';
  import loginBg from 'stylesPath/images/body_bg.jpg';

  const { appAsk } = service;
  export default {
    name: 'Login',
    components: {},
    props: {},
    data() {
      return {
        isError: false,
        form: this.$form.createForm(this),
        formRules: {
          accountName: [
            'accountname',
            {
              rules: [{ required: true, message: '请输入用户名' }],
            },
          ],
          password: [
            'password',
            {
              rules: [{ required: true, message: '请输入密码' }],
            },
          ],
        },
        logo,
        loginBg,
      };
    },
    computed: {
      ...mapState('app', ['userInfo', 'projectInfo']),
      minHeight() {
        return this.$store.state.app.window.height;
      },
      styleObject() {
        const { minHeight, projectInfo } = this;
        return {
          minHeight: `${minHeight}px`,
          backgroundImage: `url(${projectInfo.loginuiurl || loginBg})`,
        };
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      ...mapMutations('app', ['setUserInfo']),
      // 清除错误提示
      focus() {
        this.isError = false;
      },
      // 登录
      login() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { accountname, password } = fieldsValue;
          const params = {
            accountname,
            password: this.$md5(password),
            pid: `${this.projectInfo.id}`,
          };
          appAsk
            .loginAccount(params)
            .then(result => {
              const { errcode, data } = result;
              if (errcode === 200) {
                const { accountinfo, uid, token } = data;
                // 同步用户登录信息
                const auth = {
                  token,
                  expired: new Date(),
                };
                const { id } = this.projectInfo;
                localStorage.setItem(`authB_${id}`, JSON.stringify(auth));
                localStorage.setItem(
                  `userInfoB_${id}`,
                  JSON.stringify({
                    ...accountinfo,
                    accountpwd: this.$md5(password),
                  })
                );
                this.setUserInfo(accountinfo);
                setTimeout(() => {
                  this.$router.push({ path: '/home' });
                }, 500);
              }
            })
            .catch(e => {
              const { errcode } = e;
              if (errcode === 403) {
                this.isError = true;
              }
              console.error(e);
            });
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .login {
    background-size: cover;
    color: @bl-white;
    .center {
      text-align: center;
    }
  }
  .header {
    padding-top: 150px;
    padding-bottom: 60px;
    .title-panel {
      display: inline-block;
      .title {
        font-size: 40px;
      }
      .sub-header {
        font-size: 14px;
      }
    }
  }
  .form-panel {
    text-align: center;
    .form-content {
      text-align: left;
      border-radius: 10px;
      width: 380px;
      display: inline-block;
    }
    .bottom-btn {
      width: 100%;
    }
    .error-tips {
      color: @bl-white;
    }
  }
</style>
