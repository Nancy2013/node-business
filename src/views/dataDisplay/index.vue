<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-10 14:45:16
 * @LastEditors: Please set LastEditors
 -->
<!-- 数据展示 -->
<template>
  <div class="reset-header">
    <bl-header>
      <div slot="left">
        <span class="mr10">操作日志</span>
        <a-button :type="dataType(['dataPresentation'])"
                  class="mr10"
                  @click="data">数据展示</a-button>
        <a-button :type="dataType(['detailedLog','wechatLogin','webLogin',
                                   'appLogin','remoteControl','deviceAlarm',
                                   'systemOperation','installTask','maintainTask'])"
                  class="mr10"
                  @click="log">详细日志</a-button>
        <a-button :type="dataType(['userFeedback','userEvaluation','troubleRepair'])"
                  @click="feedback">用户反馈</a-button>
      </div>
      <div slot="right">
        <a-range-picker v-show="defaultActiveKey"
                        v-model="rangeTime"
                        style="width:280px;text-align:center" />
      </div>
    </bl-header>
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'DataDisplay',
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {
      rangeTime: {
        get: function() {
          const { rangeTime } = this.$store.state.dataDisplay;
          return rangeTime;
        },
        set: function(v) {
          this.setRangeTime(v);
        },
      },
      defaultActiveKey() {
        const { name } = this.$route;
        return name !== 'dataPresentation';
      },
      dataType() {
        const { name } = this.$route;
        return function(values) {
          const pos = values.includes(name);
          return pos ? 'primary' : null;
        };
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      ...mapMutations('dataDisplay', ['setRangeTime']),
      data() {
        this.setRangeTime([]);
        this.$router.push({ name: 'dataPresentation' });
      },
      log() {
        this.$router.push({ name: 'detailedLog' });
      },
      feedback() {
        this.$router.push({ name: 'userFeedback' });
      },
    },
  };
</script>

<style lang="less" scoped>
  .reset-header /deep/ .content-header .left {
    flex: 16;
  }
</style>
