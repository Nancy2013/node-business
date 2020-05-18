<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-17 10:20:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <bl-header>
      <bl-breadcrumb slot="left"
                     :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
      <div slot="right">
        <a-select v-show="defaultActiveKey==='userList'"
                  v-model="roleid"
                  class="component-w-224"
                  @change="handleChange">
          <a-select-option value="-1">
            全部角色
          </a-select-option>
          <a-select-option v-for="item in roleList"
                           :key="item.id"
                           :value="item.id">
            {{ item.rolename }}
          </a-select-option>
        </a-select>
        <a-button v-if="defaultActiveKey==='roleList'"
                  class="ml10"
                  type="primary"
                  @click="add">添加角色
        </a-button>
        <template v-else>
          <a-input-search v-model.trim="search"
                          placeholder="输入人员名称"
                          class="component-w-224"
                          style="margin:0 10px;"
                          enter-button
                          @search="doSearch" />
          <a-button type="primary"
                    @click="add">添加人员
          </a-button>
        </template>
      </div>
    </bl-header>
    <bl-page-wrapper>
      <div slot="content">
        <div>
          <a-tabs :default-active-key="defaultActiveKey"
                  class="log-list"
                  @change="changeTab">
            <a-tab-pane key="userList"
                        tab="普通人员">
            </a-tab-pane>
            <a-tab-pane key="installerList"
                        tab="安装工"
                        force-render>
            </a-tab-pane>
            <a-tab-pane key="roleList"
                        tab="角色列表"
                        force-render>
            </a-tab-pane>
          </a-tabs>
          <router-view ref="listModal"></router-view>
        </div>
      </div>
    </bl-page-wrapper>
  </div>
</template>


<script>
  import service from 'servicePath/index';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

  const { userManageAsk } = service;
  export default {
    name: 'UserManage',
    components: {},
    props: {},
    data() {
      return {
        breadcrumbRoutes: [
          {
            name: '人员管理',
            breadcrumbName: '全部人员',
          },
        ],
        id: this.$route.params.id,
        defaultActiveKey: this.$route.name,
        search: '',
        roleid: '-1',
        roleList: [],
      };
    },
    computed: {},
    watch: {},
    created() {
      this.getRole();
    },
    mounted() {},
    methods: {
      // 添加人员
      ...mapMutations('userManage', ['setRoleid']),
      ...mapMutations('userManage', ['searchDisplayname']),
      handleChange(val) {
        this.setRoleid(val);
      },
      doSearch() {
        const { search } = this;
        this.searchDisplayname(search);
        this.$refs.listModal.doSearch();
      },
      add() {
        this.$refs.listModal.add();
      },
      // 切换Tab
      changeTab(activeKey) {
        this.defaultActiveKey = activeKey;
        this.search = '';
        this.roleid = '-1';
        this.searchDisplayname(this.search);
        this.$router.push({ name: activeKey });
        if (activeKey == 'userList') {
          this.getRole();
        }
      },
      getRole() {
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
        };
        userManageAsk
          .getRole(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              this.roleList = data.alist && data.alist.filter(v => v.rolename !== '安装工');
            } else {
              this.roleList = [];
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
