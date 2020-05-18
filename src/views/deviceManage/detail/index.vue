<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-03 17:10:04
 * @LastEditTime: 2019-08-27 11:17:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="header-panel">
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
      </bl-header>
    </div>
    <bl-page-wrapper>
      <div slot="content">
        <div>
          <a-tabs :default-active-key="defaultActiveKey"
                  @change="changeTab">
            <a-tab-pane key="baseInfo"
                        tab="基本信息">
            </a-tab-pane>
            <a-tab-pane key="serviceHistory"
                        tab="服务记录"
                        force-render>
            </a-tab-pane>
            <a-tab-pane key="maintainHistory"
                        tab="维修记录"
                        force-render>
            </a-tab-pane>
          </a-tabs>
          <router-view :class="{plr20:defaultActiveKey==='baseInfo'}"></router-view>
        </div>
      </div>
    </bl-page-wrapper>
  </div>
</template>
<script>
  // import { mapGetters, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { deviceManageAsk } = service;
  export default {
    name: 'DeviceDetail',
    components: {},
    mixins: [],
    props: {},
    data() {
      return {
        breadcrumbRoutes: [],
        defaultActiveKey: this.$route.name,
      };
    },
    computed: {},
    watch: {},
    created() {
      this.setBreadcrumb();
    },
    mounted() {},
    destroyed() {},
    methods: {
      // 设置面包屑
      setBreadcrumb() {
        const breadcrumbRoutes = [
          {
            name: '设备管理',
            breadcrumbName: '全部设备',
          },
          {
            name: '',
            breadcrumbName: '设备详情',
          },
        ];
        this.breadcrumbRoutes = breadcrumbRoutes;
      },
      // 切换Tab
      changeTab(activeKey) {
        this.defaultActiveKey = activeKey;
        this.$router.push({ name: activeKey });
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
