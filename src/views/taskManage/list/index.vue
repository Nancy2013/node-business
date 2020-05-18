<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 09:51:56
 * @LastEditTime: 2019-09-26 15:06:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="header-panel">
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
        <div slot="right">
          <a-select v-model="worker"
                    class="component-w-224"
                    @change="doSearch">
            <a-select-option value="-1">全部安装工</a-select-option>
            <a-select-option v-for="item in installList"
                             :key="item.accountname"
                             :value="item.accountname">
              {{ item.displayname }}
            </a-select-option>
          </a-select>
          <a-select v-model="status"
                    class="component-w-224"
                    style="margin:0 10px;"
                    @change="doSearch">
            <a-select-option value="-1">全部任务进度</a-select-option>
            <a-select-option v-for="item in taskStatus"
                             :key="item.key"
                             :value="item.key">
              {{ item.text }}
            </a-select-option>
          </a-select>
          <a-input-search v-model.trim="search"
                          placeholder="输入任务名称搜索"
                          class="component-w-224"
                          enter-button
                          @search="doSearch" />
          <a-button type="primary"
                    class="ml10"
                    @click="add">创建任务</a-button>
        </div>
      </bl-header>
    </div>
    <bl-page-wrapper>
      <div slot="content">
        <a-table :columns="columns"
                 :row-key="record => `${record.id}${Math.random()}`"
                 :data-source="data"
                 :loading="loading"
                 :pagination="pagination"
                 class="reset-pagination"
                 @change="appChange">
          <template slot="index"
                    slot-scope="text, record,index">
            <span>{{ index+1 }}</span>
          </template>
          <template slot="createtime"
                    slot-scope="text, record">
            <span>{{ record.createtime?$moment().format(GLOBAL.TIME_FOEMAT):'— —' }}</span>
          </template>
          <template slot="type"
                    slot-scope="text, record">
            <span>{{ getStatus('taskType',text) }}</span>
          </template>
          <template slot="status"
                    slot-scope="text, record">
            <span>{{ getStatus('taskStatus',text) }}</span>
          </template>
          <template slot="operation"
                    slot-scope="text, record">
            <a @click="detail(record)">详情</a>
          </template>
        </a-table>
      </div>
    </bl-page-wrapper>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { taskManageAsk } = service;
  const { PageTableCreaterMix } = Mix;
  export default {
    name: 'TaskList',
    components: {},
    mixins: [PageTableCreaterMix('app')],
    props: {},
    data() {
      return {
        breadcrumbRoutes: [
          {
            name: '任务管理',
            breadcrumbName: '全部任务',
          },
        ],
        search: '',
        worker: '-1',
        status: '-1',
      };
    },
    computed: {
      ...mapGetters('taskManage', ['installList']),
      ...mapState('taskManage', ['taskType', 'taskStatus']),
      getStatus() {
        return function(statusArray, val) {
          const status = this[statusArray].filter(v => v.key === val)[0];
          return status ? status.text : '';
        };
      },
    },
    watch: {},
    created() {
      this.getRoleList();
    },
    mounted() {},
    destroyed() {},
    methods: {
      ...mapActions('taskManage', ['getRoleList']),
      // 表头
      appColumns() {
        const columns = [
          {
            title: '创建时间',
            dataIndex: 'createtime',
            align: 'center',
            width: '20%',
            scopedSlots: { customRender: 'createtime' },
          },
          {
            title: '任务类型',
            dataIndex: 'type',
            align: 'center',
            width: '10%',
            scopedSlots: { customRender: 'type' },
          },
          {
            title: '任务名称',
            dataIndex: 'taskname',
            align: 'center',
            width: '20%',
          },
          {
            title: '安装工',
            dataIndex: 'workname',
            align: 'center',
            width: '10%',
          },
          {
            title: '任务进度',
            dataIndex: 'status',
            align: 'center',
            width: '10%',
            scopedSlots: { customRender: 'status' },
          },
          {
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
            width: '10%',
            scopedSlots: { customRender: 'operation' },
          },
          {
            title: '',
            dataIndex: 'extra',
            align: 'center',
          },
        ];
        return columns;
      },
      doSearch() {
        this.init();
      },
      // 创建任务
      add() {
        this.$router.push({ name: 'taskAdd' });
      },
      detail(record) {
        this.$router.push({ name: 'taskDetail', params: { id: record.id } });
      },
      // 请求数据
      async appFetchList(params) {
        const { search, type, status, worker } = this;
        if (worker !== '-1') {
          params.worker = worker;
        }
        if (status !== '-1') {
          params.status = status;
        }
        const { errcode, data = {} } = await taskManageAsk.getAssignment({
          ...params,
          taskname: search,
          order: 'createtime',
        });
        return { total: data.totalsize, data: data.assignmentInfos };
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
