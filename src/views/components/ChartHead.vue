<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:01:57
 * @LastEditTime: 2019-08-26 17:24:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="chart-top">
    <slot name="head-l"></slot>
    <div class="top-r">
      <slot name="head-r"></slot>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'ChartHead',
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="less" scoped>
  .chart-top {
    border-left: 4px solid @theme-color;
    margin: 15px 15px 0 0;
  }
  .top-r {
    float: right;
  }
</style>
