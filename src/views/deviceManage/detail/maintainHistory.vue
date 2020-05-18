<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:57:01
 * @LastEditTime: 2019-09-17 16:29:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-table :columns="columns"
           :row-key="record => `${record.createtime}${Math.random()}`"
           :data-source="data"
           :loading="loading"
           :pagination="pagination"
           class="reset-pagination"
           @change="appChange">
    <template slot="createtime"
              slot-scope="text, record">
      <span>{{ record.createtime?$moment().format(GLOBAL.TIME_FOEMAT):'— —' }}</span>
    </template>
    <template slot="status"
              slot-scope="text, record">
      <span :class="{error:text==='3'}">{{ getStatus(text) }}</span>
    </template>
  </a-table>
</template>
<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { deviceManageAsk } = service;
  const { PageTableCreaterMix } = Mix;
  export default {
    name: 'MaintainHistory',
    components: {},
    mixins: [PageTableCreaterMix('app')],
    props: {},
    data() {
      return {
        did: this.$route.params.did,
      };
    },
    computed: {
      ...mapState('deviceManage', ['deviceStatusArray']),
      getStatus() {
        return function(val) {
          const status = this.deviceStatusArray.filter(v => v.key === val)[0];
          return status ? status.text : '';
        };
      },
    },
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
      init() {
        this.pagination.current = 1;
        this.appFetch();
      },
      // 表头
      appColumns() {
        const columns = [
          {
            title: '时间',
            dataIndex: 'createtime',
            align: 'center',
            width: '20%',
            scopedSlots: { customRender: 'createtime' },
          },
          {
            title: '任务',
            dataIndex: 'taskname',
            align: 'center',
            width: '20%',
          },
          {
            title: '安装工',
            dataIndex: 'workername',
            align: 'center',
            width: '20%',
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: '20%',
            align: 'center',
            scopedSlots: { customRender: 'status' },
          },
          {
            title: '',
            dataIndex: 'operate',
            align: 'center',
          },
        ];
        return columns;
      },
      // 请求数据
      async appFetchList(params) {
        const { did } = this;
        const { errcode, data = {} } = await deviceManageAsk.getAssignmentDevLog({
          ...params,
          order: 'createtime',
          type: '0',
          did,
        });
        return { total: data.totalsize, data: data.assignmentdevices };
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
