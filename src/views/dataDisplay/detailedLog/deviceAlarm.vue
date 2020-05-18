<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:57:01
 * @LastEditTime: 2019-09-29 17:05:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-table :columns="columns"
           :row-key="record => `${record.taskid}${Math.random()}`"
           :data-source="data"
           :loading="loading"
           :pagination="pagination"
           class="reset-pagination"
           @change="deviceAlarmChange">
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
      dataIndex: 'createtime',
      align: 'center',
    },
    {
      title: '设备did',
      dataIndex: 'did',
      align: 'center',
    },
    {
      title: '错误码',
      dataIndex: 'errcode',
      align: 'center',
    },
    {
      title: '错误信息',
      dataIndex: 'errmsg',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
    },
  ];
  export default {
    name: 'DeviceAlarm',
    mixins: [PageTableCreaterMix('deviceAlarm')],
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
      async deviceAlarmFetchList(params) {
        const { rangeTime } = this;
        if (rangeTime[0]) {
          params.starttime = rangeTime[0].format(this.GLOBAL.TIME_LOG);
          params.endtime = rangeTime[1].format(this.GLOBAL.TIME_LOG);
        }
        const { errcode, data = {} } = await dataDisplayAsk.getAlarmLog({
          ...params,
          order: 'createtime',
        });
        const { deviceerrorloginfos = [] } = data;
        deviceerrorloginfos.forEach(v => {
          if (v.createtime) {
            v.createtime = this.$moment(v.createtime).format(this.GLOBAL.TIME_FOEMAT);
          }
        });
        return { total: data.totalsize, data: data.deviceerrorloginfos };
      },
    },
  };
</script>

<style scoped>
</style>
