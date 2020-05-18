<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:41:01
 * @LastEditTime: 2019-09-02 17:46:12
 * @LastEditors: Please set LastEditors
 -->
<!-- 定时、场景、联动 -->
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
        <a-tabs :default-active-key="defaultActiveKey"
                @change="changeTab">
          <a-tab-pane key="timingList"
                      tab="定时">
          </a-tab-pane>
          <a-tab-pane key="sceneList"
                      tab="场景"
                      force-render>
          </a-tab-pane>
          <a-tab-pane key="linkageList"
                      tab="联动"
                      force-render>
          </a-tab-pane>
        </a-tabs>
        <a-spin :spinning="spinning">
          <router-view :ref="defaultActiveKey"
                       class="tab-panel"
                       @updateSpinning="updateSpinning"></router-view>
        </a-spin>
      </div>
    </bl-page-wrapper>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    name: 'TimeLinkageList',
    components: {},
    props: {},
    data() {
      return {
        spinning: false,
        breadcrumbRoutes: [
          {
            name: '定时联动',
            breadcrumbName: '定时联动',
          },
        ],
        defaultActiveKey: this.$route.name,
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 切换tab
      changeTab(activeKey) {
        this.defaultActiveKey = activeKey;
        this.$router.push({ name: activeKey });
      },
      // 更新loading
      updateSpinning(flag) {
        this.spinning = flag;
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
