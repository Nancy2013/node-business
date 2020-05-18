<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 16:42:03
 * @LastEditTime: 2019-09-17 16:31:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-table :columns="columns"
           :row-key="record => record.createtime"
           :data-source="data"
           :loading="loading"
           :pagination="pagination"
           class="reset-pagination"
           @change="appChange">
    <template slot="createtime"
              slot-scope="text, record">
      <span>{{ text?$moment(text).format(GLOBAL.TIME_FOEMAT):'— —' }}</span>
    </template>
    <template slot="exptime"
              slot-scope="text, record">
      <span>{{ `${text}` }}</span>
    </template>
  </a-table>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { deviceManageAsk } = service;
  const { PageTableCreaterMix } = Mix;
  export default {
    name: 'ServiceHistory',
    components: {},
    mixins: [PageTableCreaterMix('app')],
    props: {},
    data() {
      return {
        did: this.$route.params.did,
      };
    },
    computed: {},
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
            title: '用户ID',
            dataIndex: 'account',
            align: 'center',
            width: '20%',
          },
          {
            title: '使用时长',
            dataIndex: 'exptime',
            align: 'center',
            width: '20%',
            scopedSlots: { customRender: 'exptime' },
          },
          {
            title: '',
            dataIndex: 'operation',
            align: 'center',
          },
        ];
        return columns;
      },
      // 请求数据
      async appFetchList(params) {
        const { did } = this;
        const { errcode, data = {} } = await deviceManageAsk.getDeviceService({
          ...params,
          did,
          order: 'createtime',
        });
        return { total: data.totalsize, data: data.services };
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
