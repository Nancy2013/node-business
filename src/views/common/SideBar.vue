<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-09-18 09:35:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="sidebar">
    <div style="width: 200px">
      <div class="side-menu">
        导航
      </div>
      <a-menu :default-selected-keys="defaultSelectedKeys"
              mode="inline"
              theme="dark"
              @click="selectMenu">
        <a-menu-item v-for="item in menuList"
                     :key="item.name"
                     :value="item.path">
          <span :class="['iconfont',item.icon]"></span>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { asyncRoutes } from 'routerPath';

  export default {
    name: 'SideBar',
    components: {},
    props: {},
    data() {
      return {
        menuList: [],
      };
    },
    computed: {
      defaultSelectedKeys() {
        return [this.$route.meta.activeName || this.$route.name];
      },
      ...mapGetters('app', ['addRouters']),
    },
    watch: {},
    created() {},
    mounted() {
      this.getMenu();
    },
    methods: {
      // 生成menu菜单 TODO浏览器后台高亮menu
      getMenu() {
        const main = this.addRouters[0].children;
        const { children } = main[0];
        const menu = children;
        this.menuList = menu;
      },
      // 选择菜单
      selectMenu({ item, key, keyPath }) {
        this.$router.push({ path: item.value });
      },
    },
  };
</script>

<style lang="less" scoped>
  .side-menu {
    padding-left: 24px;
    line-height: 40px;
    color: #fff;
  }
</style>
