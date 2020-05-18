<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:57:01
 * @LastEditTime: 2019-10-09 16:34:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-table :columns="columns"
           :row-key="record => `${record.taskid}${Math.random()}`"
           :data-source="data"
           :loading="loading"
           :pagination="pagination"
           class="reset-pagination"
           @change="maintainTaskChange">
    <template slot="remark"
              slot-scope="text, record">
      <div class="">
        <a-tooltip placement="bottomLeft">
          <template slot="title">
            <span>{{ text }}</span>
          </template>
          <div class="ellipsis"
               style="width:100px;">{{ text }}</div>
        </a-tooltip>
      </div>
    </template>
    <!--  <template slot="asstype"
              slot-scope="text, record">
      <span>{{ getStatus('taskType',text) }}</span>
    </template> -->
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
      width: '10%',
    },
    {
      title: '用户名',
      dataIndex: 'workername',
      align: 'center',
      width: '10%',
    },
    {
      title: '任务名称',
      dataIndex: 'taskname',
      align: 'center',
      width: '10%',
    },
    {
      title: '任务ID',
      dataIndex: 'taskid',
      align: 'center',
      width: '10%',
    },
    {
      title: '关联设备',
      dataIndex: 'did',
      align: 'center',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: '10%',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      scopedSlots: { customRender: 'remark' },
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      align: 'center',
    },
    {
      title: '设备位置',
      dataIndex: 'location',
      align: 'center',
      width: '10%',
    },
  ];
  export default {
    name: 'MaintainTask',
    mixins: [PageTableCreaterMix('maintainTask')],
    props: {},
    data() {
      return {
        columns,
      };
    },
    computed: {
      ...mapState('dataDisplay', ['rangeTime']),
      ...mapState('taskManage', ['taskType']),
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
      async maintainTaskFetchList(params) {
        const { rangeTime, taskType } = this;
        if (rangeTime[0]) {
          params.starttime = rangeTime[0].format(this.GLOBAL.TIME_LOG);
          params.endtime = rangeTime[1].format(this.GLOBAL.TIME_LOG);
        }
        const { errcode, data = {} } = await dataDisplayAsk.getAssignmentLog({
          ...params,
          asstype: taskType[0].key,
          order: 'createtime',
        });
        const { assignmentinfos = [] } = data;
        assignmentinfos.forEach(v => {
          if (v.createtime) {
            v.createtime = this.$moment(v.createtime).format(this.GLOBAL.TIME_FOEMAT);
          }
        });
        return { total: data.totalsize, data: data.assignmentinfos };
      },
    },
  };
</script>

<style scoped>
</style>
