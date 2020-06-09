<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2020-06-09 11:18:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="header-panel">
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
        <div slot="right">
          <a-select v-model="online"
                    :default-value="-1"
                    class="component-w-224"
                    @change="doSearch">
            <a-select-option v-for="item in onlineStatusList"
                             :key="item.value"
                             :value="item.value">
              {{ item.text }}
            </a-select-option>
          </a-select>
          <a-input-search v-model.trim="searchVal"
                          placeholder="输入设备名称搜索"
                          class="component-w-224"
                          style="margin:0 10px;"
                          enter-button
                          @search="
                            val => {
                              doSearch(val, 'search');
                            }
                          " />
          <a-input-search v-model.trim="locationVal"
                          placeholder="输入站点名称搜索"
                          class="component-w-224"
                          enter-button
                          @search="
                            val => {
                              doSearch(val, 'location');
                            }
                          " />
        </div>
      </bl-header>
    </div>
    <bl-page-wrapper>
      <div slot="content">
        <a-table :columns="columns"
                 :row-key="record => `${record.id}${record.did}`"
                 :data-source="data"
                 :loading="loading"
                 :pagination="pagination"
                 class="reset-pagination"
                 @change="deviceChange">
          <template slot="index"
                    slot-scope="text, record, index">
            <span>{{ index + 1 }}</span>
          </template>
          <template slot="online"
                    slot-scope="text, record">
            <span :class="{ error: text !== '1' }">{{ getStatus('onlineStatus', text) }}</span>
          </template>
          <template slot="running"
                    slot-scope="text, record">
            <span :class="{ error: text === '-1' }">{{ getStatus('runningStatus', text) }}</span>
          </template>
          <template slot="operation"
                    slot-scope="text, record">
            <span v-if="record.online !== '1'"
                  class="disabled control">控制</span>
            <a v-if="record.online === '1'"
               class="control"
               @click="control(record)">控制</a>
            <a-divider type="vertical" />
            <a @click="detail(record)">详情</a>
          </template>
        </a-table>
      </div>
    </bl-page-wrapper>
    <ControlModal v-if="isControlModal"
                  :is-single="isSingle"
                  @cancel="cancelControlModal" />
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';
  import ControlModal from './../components/controlModal.vue';

  const { deviceManageAsk } = service;
  const { PageTableCreaterMix } = Mix;
  export default {
    name: 'DeviceList',
    components: {
      ControlModal,
    },
    mixins: [PageTableCreaterMix('device')],
    props: {},
    data() {
      return {
        breadcrumbRoutes: [
          {
            name: '设备管理',
            breadcrumbName: '全部设备',
          },
        ],
        onlineStatusList: this.$store.state.app.online,
        online: '-1',
        search: '',
        searchVal: '',
        location: '',
        locationVal: '',
        isControlModal: false,
        timeOut: null,
        isSingle: true,
      };
    },
    computed: {
      ...mapState('deviceManage', ['deviceInfo', 'runningStatus', 'onlineStatus']),
      getStatus() {
        return function(statusArray, val) {
          const status = this[statusArray].filter(v => v.key === val)[0];
          return status ? status.text : '';
        };
      },
    },
    created() {},
    mounted() {},
    beforeDestroy() {
      this.stopTime();
    },
    methods: {
      ...mapMutations('deviceManage', ['updateDevice']),
      // 表头
      deviceColumns() {
        const columns = [
          {
            title: '序号',
            dataIndex: 'index',
            width: '6%',
            align: 'center',
            scopedSlots: { customRender: 'index' },
          },
          {
            title: '设备名称',
            dataIndex: 'displayname',
            width: '10%',
            align: 'center',
          },
          {
            title: 'DID',
            dataIndex: 'did',
            align: 'center',
          },
          {
            title: '站点',
            dataIndex: 'location',
            align: 'center',
          },
          {
            title: '在线状态',
            dataIndex: 'online',
            width: '10%',
            align: 'center',
            scopedSlots: { customRender: 'online' },
          },
          {
            title: '运行状态',
            dataIndex: 'running',
            width: '10%',
            align: 'center',
            scopedSlots: { customRender: 'running' },
          },
          {
            title: '备注',
            dataIndex: 'remark',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'operate',
            width: '15%',
            align: 'left',
            scopedSlots: { customRender: 'operation' },
          },
        ];
        return columns;
      },
      doSearch(val, flag) {
        this[flag] = val;
        this.init();
      },
      // 控制
      control(record) {
        this.updateDevice(record);
        this.isControlModal = true;
      },
      // 取消控制弹窗
      cancelControlModal() {
        this.isControlModal = false;
      },
      // 更多
      detail(record) {
        this.$router.push({ name: 'deviceDetail', params: { did: record.did } });
      },
      stopTime() {
        clearTimeout(this.timeOut);
      },
      // 请求数据
      async deviceFetchList(params) {
        this.stopTime();
        const { online, search, location } = this;
        params.online = online === '-1' ? null : online;
        const { errcode, data = {} } = await deviceManageAsk.getDevice({
          ...params,
          displayname: search,
          location,
        });
        this.timeOut = setTimeout(() => {
          this.deviceFetch();
        }, this.GLOBAL.TIME_INTERVAL);
        const { deviceInfos = [] } = data;
        if (deviceInfos) {
          this.updateCurrent(deviceInfos);
        }
        return { total: data.totalsize, data: deviceInfos };
      },
      // 更新当前操作的设备状态
      updateCurrent(data) {
        const { deviceInfo = {} } = this;
        const current = data.filter(v => v.did === deviceInfo.did)[0];
        if (current) {
          this.updateDevice(current);
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .disabled {
    background: @bl-disabled-color;
    cursor: not-allowed;
  }
</style>
