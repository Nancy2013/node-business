<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 11:07:16
 * @LastEditTime: 2019-08-27 11:18:38
 * @LastEditors: Please set LastEditors
 -->
<!-- 位置管理-列表 -->
<template>
  <div>
    <div class="header-panel">
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
        <div slot="right">
          <DistrictSelect ref="districtSelect"
                          route-name="routeName"
                          @change="handleDistrictChange" />
          <a-input-search v-model.trim="search"
                          placeholder="输入名称搜索"
                          class="component-w-224"
                          style="margin:0 10px;"
                          enter-button
                          @change="getSearch"
                          @search="doSearch" />
          <a-button type="primary"
                    @click="add">{{ formatAdd }}</a-button>
        </div>
      </bl-header>
    </div>
    <bl-page-wrapper>
      <div slot="content">
        <a-tabs :default-active-key="defaultActiveKey"
                @change="changeTab">
          <a-tab-pane key="siteList"
                      tab="站点列表">
          </a-tab-pane>
          <a-tab-pane key="storeList"
                      tab="门店列表"
                      force-render>
          </a-tab-pane>
        </a-tabs>
        <router-view :ref="defaultActiveKey"
                     class="tab-panel"></router-view>
      </div>
    </bl-page-wrapper>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import DistrictSelect from './../components/districtSelect.vue';

  const { locationManageAsk } = service;

  export default {
    name: 'LocationList',
    components: {
      DistrictSelect,
    },
    props: {},
    data() {
      return {
        breadcrumbRoutes: [
          {
            name: '位置管理',
            breadcrumbName: '全部位置',
          },
        ],
        search: '',
        defaultActiveKey: this.$route.name,
      };
    },
    computed: {
      formatAdd() {
        const { name } = this.$route;
        return `添加${name === 'siteList' ? '站点' : '门店'}`;
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 更新搜索内容
      ...mapMutations('locationManage', ['updateLocation', 'updateSearch']),
      handleDistrictChange() {
        this.doSearch();
      },
      getSearch() {
        const { search } = this;
        this.updateSearch(search);
      },
      // 搜索
      doSearch() {
        const { name } = this.$route;
        this.$refs[name].doSearch();
      },
      add() {
        const { name } = this.$route;
        this.$router.push({ name: name.replace('List', 'Add') });
      },
      // 切换tab
      changeTab(activeKey) {
        // 重置省/市区
        const {
          $refs: { districtSelect },
        } = this;
        this.defaultActiveKey = activeKey;
        districtSelect.init();
        this.search = '';
        this.updateSearch(this.search);
        this.$router.push({ name: activeKey });
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
