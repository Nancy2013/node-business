<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 17:52:51
 * @LastEditTime: 2019-10-08 11:11:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-table :columns="columns"
           :row-key="record => record.id"
           :data-source="data"
           :loading="loading"
           :pagination="pagination"
           class="reset-pagination"
           @change="troubleRepairChange">
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
      width: '20%',
    },
    {
      title: '站点',
      dataIndex: 'location',
      align: 'center',
      width: '10%',
    },
    {
      title: '用户名ID',
      dataIndex: 'account',
      align: 'center',
      width: '15%',
    },
    {
      title: '故障详细',
      dataIndex: 'remark',
      align: 'center',
      width: '40%',
    },
  ];
  export default {
    name: 'TroubleRepair',
    mixins: [PageTableCreaterMix('troubleRepair')],
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
      async troubleRepairFetchList(params) {
        const { rangeTime } = this;
        if (rangeTime[0]) {
          params.starttime = rangeTime[0].format(this.GLOBAL.TIME_LOG);
          params.endtime = rangeTime[1].format(this.GLOBAL.TIME_LOG);
        }
        const { errcode, data = {} } = await dataDisplayAsk.getRepair({
          ...params,
          order: 'createtime',
        });
        const { repairinfos = [] } = data;
        repairinfos.forEach(v => {
          if (v.createtime) {
            v.createtime = this.$moment(v.createtime).format(this.GLOBAL.TIME_FOEMAT);
          }
        });
        return { total: data.totalsize, data: data.repairinfos };
      },
    },
  };
</script>

<style scoped>
</style>
