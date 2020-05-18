<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 10:02:54
 * @LastEditTime: 2019-10-08 15:02:42
 * @LastEditors: Please set LastEditors
 -->
<!-- 数据展示 -->
<template>
  <bl-page-wrapper class="chart-content">
    <div slot="content">
      <div class="data-o">
        <ProceduresUsing />
        <DataSta />
      </div>
      <div class="data-s">
        <SiteSta />
        <div class="data-s-r">
          <DeviceUsing />
          <DeviceBroken />
        </div>
      </div>
    </div>
  </bl-page-wrapper>
</template>
<script>
  import service from 'servicePath/index';
  import { mapGetters, mapMutations } from 'vuex';
  import ProceduresUsing from './../components/proceduresUsing.vue';
  import DataSta from './../components/dataSta.vue';
  import SiteSta from './../components/siteSta.vue';
  import DeviceUsing from './../components/deviceUsing.vue';
  import DeviceBroken from './../components/deviceBroken.vue';

  const { dataDisplayAsk } = service;
  export default {
    name: 'DataPresentation',
    components: {
      ProceduresUsing,
      DataSta,
      SiteSta,
      DeviceUsing,
      DeviceBroken,
    },
    props: {},
    data() {
      return {};
    },
    computed: {
      minHeight() {
        return this.$store.state.app.window.height - 120;
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="less" scoped>
  .chart-content {
    background-color: #efefef;
  }
  .data-o {
    height: 340px;
    margin-bottom: 20px;
  }
  .data-s {
    height: 340px;
  }
  .data-s-r {
    width: 40%;
    height: 100%;
    display: inline-block;
  }
</style>
