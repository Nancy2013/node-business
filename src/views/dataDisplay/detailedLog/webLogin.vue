<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:57:01
 * @LastEditTime: 2019-09-29 13:26:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-table :columns="columns"
           :row-key="record => record.id"
           :data-source="data"
           :loading="loading"
           :pagination="pagination"
           class="reset-pagination"
           @change="webLoginChange">
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
      title: '用户名',
      dataIndex: 'account',
      align: 'center',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'remark',
      align: 'center',
      width: '10%',
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
      align: 'center',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'hide',
      align: 'center',
      scopedSlots: { customRender: 'hide' },
    },
  ];
  export default {
    name: 'WebLogin',
    mixins: [PageTableCreaterMix('webLogin')],
    props: {},
    data() {
      return {
        columns,
        createtime: '',
      };
    },
    computed: {
      ...mapState('dataDisplay', ['rangeTime', 'loginType']),
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
      async webLoginFetchList(params) {
        const { rangeTime, loginType } = this;
        if (rangeTime[0]) {
          params.starttime = rangeTime[0].format(this.GLOBAL.TIME_LOG);
          params.endtime = rangeTime[1].format(this.GLOBAL.TIME_LOG);
        }
        const { errcode, data = {} } = await dataDisplayAsk.getLogList({
          ...params,
          order: 'createtime',
          type: loginType.web,
        });
        const { alist = [] } = data;
        alist.forEach(v => {
          if (v.createtime) {
            v.createtime = this.$moment(v.createtime).format(this.GLOBAL.TIME_FOEMAT);
          }
        });
        return { total: data.totalsize, data: data.alist };
      },
    },
  };
</script>

<style scoped>
</style>
