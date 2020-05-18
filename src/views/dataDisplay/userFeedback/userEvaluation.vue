<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:57:01
 * @LastEditTime: 2019-10-08 11:09:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-table :columns="columns"
           :row-key="record => record.id"
           :data-source="data"
           :loading="loading"
           :pagination="pagination"
           class="reset-pagination"
           @change="userEvaluationChange">
    <template slot="Score"
              slot-scope="text, record">
      <a-rate :value="record.score"
              disabled />
    </template>
  </a-table>
</template>

<script>
  import service from 'servicePath/index';
  import Mix from '@/mixins';
  import { mapState } from 'vuex';

  const { dataDisplayAsk } = service;
  const { PageTableCreaterMix } = Mix;
  const columns = [
    {
      title: '时间',
      dataIndex: 'date',
      align: 'center',
      width: '10%',
    },
    {
      title: '站点',
      dataIndex: 'site',
      align: 'center',
      width: '10%',
    },
    {
      title: '用户名ID',
      dataIndex: 'account',
      align: 'center',
      width: '10%',
    },
    {
      title: '体验时间',
      dataIndex: 'exptime',
      align: 'center',
      width: '10%',
    },
    {
      title: '评星',
      dataIndex: 'score',
      align: 'center',
      width: '10%',
      scopedSlots: { customRender: 'Score' },
    },
    {
      title: '用户评价',
      dataIndex: 'content',
      align: 'center',
      width: '20%',
    },
  ];
  export default {
    name: 'UserEvaluation',
    mixins: [PageTableCreaterMix('userEvaluation')],
    props: {},
    data() {
      return {
        columns,
      };
    },
    computed: {
      ...mapState('dataDisplay', ['rangeTime']),
    },
    watch: {
      rangeTime(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init();
        }
      },
    },
    created() {},
    mounted() {},
    methods: {
      // 请求数据
      async userEvaluationFetchList(params) {
        const { rangeTime } = this;
        if (rangeTime[0]) {
          params.starttime = rangeTime[0].format(this.GLOBAL.TIME_LOG);
          params.endtime = rangeTime[1].format(this.GLOBAL.TIME_LOG);
        }
        const { errcode, data = {} } = await dataDisplayAsk.getFeedback({
          ...params,
          order: 'date',
        });
        const { feedbacks = [] } = data;
        feedbacks.forEach(v => {
          if (v.date) {
            v.date = this.$moment(v.date).format(this.GLOBAL.TIME_FOEMAT);
          }
          if (v.exptime) {
            v.exptime = `${v.exptime.split(':')[0]}分${v.exptime.split(':')[1]}秒`;
          }
        });
        return { total: data.totalsize, data: data.feedbacks };
      },
    },
  };
</script>

<style scoped>
</style>
