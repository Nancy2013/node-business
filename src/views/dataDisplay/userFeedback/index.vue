<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 10:02:54
 * @LastEditTime: 2019-08-27 11:17:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <bl-page-wrapper>
    <div slot="content">
      <div>
        <a-tabs :default-active-key="defaultActiveKey"
                @change="changeTab">
          <a-tab-pane key="userEvaluation"
                      tab="用户评价">
          </a-tab-pane>
          <a-tab-pane key="troubleRepair"
                      tab="故障报修"
                      force-render>
          </a-tab-pane>
        </a-tabs>
        <router-view></router-view>
      </div>
    </div>
  </bl-page-wrapper>
</template>


<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    name: 'UserFeedback',
    components: {},
    props: {},
    data() {
      return {
        defaultActiveKey: this.$route.name,
        id: this.$route.params.id,
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      ...mapMutations('logManage', ['setRangeTime']),
      calendarChange(value) {
        this.setRangeTime(value);
      },
      // 切换Tab
      changeTab(activeKey) {
        this.defaultActiveKey = activeKey;
        const { id } = this;
        if (id) {
          // 详情
          this.$router.push({ name: activeKey });
        } else {
          // 添加
          this.$router.push({ path: activeKey });
        }
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
