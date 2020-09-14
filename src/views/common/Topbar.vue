<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2020-09-14 16:02:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="topbar">
    <div class="header-brand">
      <img :src="projectInfo.logourl||logo"
           alt="">
    </div>
    <div class="header-title ml20">
      {{ projectInfo.projectname }}
    </div>
    <div class="header-operate">
      <span class="iconfont icontouxiang mr10"></span>
      <a-dropdown class="topbar-dropdown">
        <span class="ant-dropdown-link"
              href="#">
          {{ userInfo.displayname }}
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item @click="nextRoute('accountSet')">
            <span style="padding-right:30px;">账号设置 </span>
          </a-menu-item>
          <a-menu-item @click="nextRoute('projectSet')">
            <span style="padding-right:30px;">设置 </span>
          </a-menu-item>
          <a-menu-item @click="exit">
            <span style="padding-right:30px;">退出</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import logo from 'stylesPath/images/logo.png';

  const { appAsk } = service;

  export default {
    name: 'Main',
    components: {},
    data() {
      return {
        messageList: [],
        logo,
      };
    },
    computed: {
      ...mapState('app', ['userInfo', 'projectInfo']),
    },
    created() {
      const userInfo = localStorage[`userInfoB_${this.projectInfo.id}`];
      if (userInfo) {
        this.setUserInfo(JSON.parse(userInfo));
      }
    },
    mounted() {},
    methods: {
      /* 账号设置 */
      ...mapMutations('app', ['setUserInfo']),
      nextRoute(to) {
        const { name } = this.$route;
        const filters = ['accountSet', 'projectSet']; // 如果当前界面为账号设置或系统设置则使用replace
        const operate = filters.includes(name) ? 'replace' : 'push';
        this.$router[operate]({ path: `/${to}` });
      },
      /* 退出 */
      exit() {
        const { id } = this.projectInfo;
        const userInfo = JSON.parse(localStorage[`userInfoB_${id}`]);
        const params = {
          ...userInfo,
        };
        appAsk
          .logoutAccount(params)
          .then(
            result => {
              const { errcode, data } = result;
              if (errcode === 200) {
                localStorage.removeItem(`authB_${id}`);
                localStorage.removeItem(`userInfoB_${id}`);
                this.$router.push({ path: '/login' });
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
  .topbar {
    height: 60px;
    padding-right: 24px;
    line-height: 60px;
    .header-brand {
      height: 100%;
      width: 200px;
      background: #002140;
      text-align: center;
      img {
        height: 60px;
        max-width: 200px;
        object-fit: cover;
      }
    }
    .header-brand,
    .header-title,
    .header-operate {
      display: inline-block;
    }
    .header-title {
      font-size: @bl-font-size-lg;
      font-weight: @bl-font-weight-base;
    }
    .header-operate {
      position: absolute;
      right: 24px;
      font-size: 16px;
    }
  }
</style>
