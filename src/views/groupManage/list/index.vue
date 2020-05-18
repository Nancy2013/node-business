<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-31 17:25:38
 * @LastEditTime: 2019-10-29 14:52:32
 * @LastEditors: Please set LastEditors
 -->
<!-- 分组管理 -->
<template>
  <div>
    <div class="header-panel">
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
      </bl-header>
    </div>
    <bl-page-wrapper>
      <div slot="content">
        <TreeBar ref="treeBar"
                 class="treeBar" />
        <div :style="{'max-height':minHeight+'px'}"
             class="content">
          <Empty v-if="isEmpty"
                 @add="addGroup" />
          <div v-if="!isEmpty">
            <div class="header-panel">
              <bl-header>
                <div slot="left">
                  {{ group.name }}
                  <a-icon type="form"
                          class="ml10"
                          @click="edit" />
                </div>
                <div slot="right">
                  <a-button type="primary"
                            class="ml10"
                            @click="centralControl">集中控制</a-button>
                </div>
              </bl-header>
            </div>
            <div class="content-body">
              <div class="panel">
                <div class="left">
                  下级分组
                </div>
                <div class="right">
                  <div class="actived-text">
                    <span class="cursor"
                          @click="addGroup">
                      <a-icon type="plus"
                              class="mr8" />
                      添加子分组</span>
                  </div>
                </div>
              </div>
              <div class="table">
                <a-table :columns="groupsColumns"
                         :row-key="record => record.id"
                         :data-source="groupData"
                         :pagination="groupPagination"
                         :loading="groupLoading"
                         class="reset-table-th reset-table-border hidden-pagination">
                  <template slot="devicenum"
                            slot-scope="text, record">
                    <span>{{ `${text||0}台` }}</span>
                  </template>
                  <template slot="operation"
                            slot-scope="text, record">
                    <a @click="goGroup(record)">
                      <a-icon type="right" /></a>
                  </template>
                </a-table>
              </div>
              <div class="panel">
                <div class="left">
                  组内设备
                </div>
                <div class="right">
                  <div>
                    <span class="mr20 cursor"
                          @click="addDevice">
                      <a-icon type="plus"
                              class="mr8" />
                      添加设备
                    </span>
                    <span class="cursor"
                          @click="showDelModal">

                      <a-icon type="delete"
                              class="mr8" />批量移除
                    </span>
                  </div>
                </div>
              </div>
              <div class="reset-table-th reset-table-border mb20">
                <a-table :columns="columns"
                         :row-key="record => `${record.did}`"
                         :data-source="data"
                         :loading="loading"
                         :pagination="pagination"
                         :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                         class="reset-pagination"
                         @change="groupChange">
                  <template slot="online"
                            slot-scope="text, record">
                    <span :class="{error:record.online!=='1'}">{{ record.online==='1'?"在线" : '离线' }}</span>
                  </template>
                  <template slot="running"
                            slot-scope="text, record">
                    <span>{{ record.running==='1'?"使用" : '空闲' }}</span>
                  </template>
                  <template slot="operation"
                            slot-scope="text, record">
                    <span v-if="record.online!=='1'"
                          class="disabled control">控制</span>
                    <a v-if="record.online==='1'"
                       class="control"
                       @click="control(record)">控制</a>
                  </template>
                </a-table>
              </div>
            </div>
          </div>

        </div>
      </div>

    </bl-page-wrapper>
    <!-- 控制弹窗 -->
    <ControlModal v-if="isControlModal"
                  :is-single="isSingle"
                  @cancel="cancelControlModal" />
    <!-- 添加分组 -->
    <add-modal v-if="isGroupModal"
               :is-add="isAdd"
               @ok="handleOKGroup"
               @cancel="handleCancelGroup"
               @del="handleDelGroup" />
    <!-- 添加设备-->
    <DeviceModal v-if="isDeviceModal"
                 :data="selectedDevices"
                 flag="groupid"
                 @cancel="handleCancelDevice"
                 @ok="handleOkDevice" />
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';
  import DeviceModal from 'viewsPath/taskManage/detail/deviceModal.vue';
  import ControlModal from 'viewsPath/deviceManage/components/controlModal.vue';
  import TreeBar from './treeBar.vue';
  import AddModal from './addModal.vue';
  import Empty from './empty.vue';

  const { PageTableCreaterMix } = Mix;

  const { groupManageAsk } = service;

  export default {
    name: 'GroupList',
    components: {
      TreeBar,
      ControlModal,
      AddModal,
      DeviceModal,
      Empty,
    },
    mixins: [PageTableCreaterMix('group')],
    props: {},
    data() {
      return {
        breadcrumbRoutes: [
          {
            name: '分组管理',
            breadcrumbName: '全部分组',
          },
        ],
        isControlModal: false,
        isGroupModal: false,
        isDeviceModal: false,
        isAdd: true,
        groupsColumns: [],
        groupData: [],
        groupLoading: false,
        groupPagination: {
          current: 1,
          pageSize: 1000,
        },
        selectedRowKeys: [],
        selectedRows: [],
        timeOut: null,
        selectedDevices: [],
      };
    },
    computed: {
      ...mapGetters('groupManage', ['formatGroup']),
      ...mapState('groupManage', ['node', 'isEmpty']),
      ...mapState('deviceManage', ['deviceInfo']),
      group() {
        return this.formatGroup(false);
      },
      minHeight() {
        return this.$store.state.app.window.height - 140;
      },
    },
    watch: {
      group: {
        async handler(newVal, oldVal) {
          if (newVal && newVal.id && newVal.id !== oldVal.id) {
            await this.getGroup();
            this.init();
            this.groupFetch();
          }
        },
        deep: true,
      },
    },
    created() {
      this.groupsColumns = this.getGroupColumns();
    },
    mounted() {},
    beforeDestroy() {
      this.stopTime();
      this.updateNode({});
    },
    methods: {
      ...mapMutations('groupManage', ['updateNode', 'updateIsEmpty']),
      ...mapMutations('deviceManage', ['updateDevice']),
      init() {
        this.pagination.current = 1;
      },
      // 分组表头
      getGroupColumns() {
        const columns = [
          {
            title: '分组名称',
            dataIndex: 'name',
            align: 'center',
            width: '30%',
          },
          {
            title: '组内设备',
            dataIndex: 'devicenum',
            align: 'center',
            width: '20%',
            scopedSlots: { customRender: 'devicenum' },
          },
          {
            title: '',
            dataIndex: 'operation',
            align: 'right',
            scopedSlots: { customRender: 'operation' },
          },
        ];
        return columns;
      },
      // 设备表头
      groupColumns() {
        const columns = [
          {
            title: '设备名称',
            dataIndex: 'displayname',
            align: 'center',
            width: '20%',
          },
          {
            title: 'MAC',
            dataIndex: 'mac',
            align: 'center',
            width: '20%',
          },
          {
            title: '在线状态',
            dataIndex: 'online',
            align: 'center',
            width: '15%',
            scopedSlots: { customRender: 'online' },
          },
          {
            title: '运行状态',
            dataIndex: 'running',
            align: 'center',
            width: '15%',
            scopedSlots: { customRender: 'running' },
          },
          {
            title: '备注',
            dataIndex: 'remark',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
            width: '15%',
            scopedSlots: { customRender: 'operation' },
          },
        ];
        return columns;
      },
      edit() {
        this.isGroupModal = true;
        this.isAdd = false;
        console.log(this.node);
      },
      // 集中控制
      centralControl() {
        const { selectedRowKeys = [], selectedRows = [] } = this;
        if (selectedRowKeys.length < 1) {
          this.$message.warning('请先选择设备！');
          return;
        }
        // 判断是否为同类型设备
        for (let i = 0; i < selectedRows.length; i += 1) {
          if (selectedRows[i].productid !== selectedRows[0].productid) {
            this.$message.warning('请先选择同类型设备！');
            return;
          }
        }
        const device = {
          did: selectedRowKeys,
          productid: selectedRows.map(v => v.productid),
          online: '1',
          status: {},
        };
        this.updateDevice(device);
        this.isSingle = false;
        this.isControlModal = true;
      },
      // 控制
      control(record) {
        this.updateDevice(record);
        this.isSingle = true;
        this.cancelControlModal();
      },
      // 取消控制弹窗
      cancelControlModal() {
        this.isControlModal = false;
      },
      // 添加分组
      addGroup() {
        const { dataRef } = this.node;
        if (dataRef) {
          const { path } = dataRef;
          if (path) {
            const nodeLevel = (path.match(new RegExp('-', 'g')) || []).length;
            if (nodeLevel >= this.GLOBAL.MAX_TREE_LEVEL - 1) {
              this.$message.warning('最多为四级分组！');
              return;
            }
          }
        }
        this.isAdd = true;
        this.isGroupModal = true;
      },
      // 取消分组弹窗
      handleCancelGroup() {
        this.isGroupModal = false;
      },
      async handleDelGroup() {
        const {
          $refs: { treeBar },
          node,
        } = this;
        const { dataRef, $parent } = node;
        if (dataRef && dataRef.parentgid) {
          // 选中父分组
          await treeBar.onLoadData(node.$parent);
          treeBar.onSelect([dataRef.parentgid], { selected: true, node: $parent });

          // 判断是否为空tree
          const { parentgid, children } = node.$parent.dataRef;
          if (parentgid === 0) {
            this.updateIsEmpty(children.length === 0);
          }
        } else {
          // 根分组，初始化tree，默认不可以删除
          treeBar.getGroup();
        }
        this.handleCancelGroup();
      },
      // 确定分组弹窗
      async handleOKGroup(data) {
        this.handleCancelGroup();
        const {
          $refs: { treeBar },
          isAdd,
          node,
        } = this;
        if (isAdd) {
          // 添加分组
          const rootParentgid = data.parentgid;
          // 根分组
          if (!rootParentgid) {
            treeBar.getGroup();
          } else {
            await this.getGroup();
            await treeBar.onLoadData(node);

            // root节点 判断是否为空
            const { parentgid, children } = node.dataRef;
            if (parentgid === 0) {
              this.updateIsEmpty(children.length === 0);
            }
          }
        } else {
          // 编辑分组
          this.updateNode(data); // 更新store node
          this.getNode(data.dataRef, treeBar.treeData); // 更新tree node
          treeBar.updateTreeData(treeBar.treeData);
        }
      },
      // 跳转到下级分组
      goGroup(record) {
        const { dataRef } = this.node;
        const { id, name, devicenum } = record;
        const node = {
          isJump: true, // 是否显示删除按钮标志位
          eventKey: id,
          title: `${name}(${devicenum || 0}台)`,
          dataRef: { ...record, parentname: dataRef.name, key: id },
          $parent: this.node,
        };
        const {
          $refs: { treeBar },
        } = this;
        treeBar.onSelect([id], { selected: true, node });
      },
      // 添加设备
      addDevice() {
        this.isDeviceModal = true;
      },
      // 取消添加设备
      handleCancelDevice() {
        this.isDeviceModal = false;
      },
      // 确定添加设备
      handleOkDevice(devices) {
        this.selectedDevices = devices;
        const deviceids = devices.map(v => v.did);
        const { id, path } = this.group;
        const params = {
          deviceids,
          id,
          path,
        };
        groupManageAsk
          .addDevice(params)
          .then(result => {
            const { errcode, data = [] } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.handleCancelDevice();
              this.updateData();
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 选择设备
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      },
      // 删除确认弹窗
      showDelModal() {
        const { selectedRowKeys } = this;
        if (selectedRowKeys.length < 1) {
          this.$message.warning('请先选择设备！');
          return;
        }
        const that = this;
        this.$confirm({
          title: '确定要删除该数据？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del();
          },
          onCancel() {},
        });
      },
      // 批量移除
      del() {
        this.spinning = true;
        const { selectedRowKeys } = this;
        const { id, path } = this.group;
        const params = {
          deviceids: selectedRowKeys,
          id,
          path,
        };
        groupManageAsk
          .delDevice(params)
          .then(reuslt => {
            const { errcode, data = [] } = reuslt;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.updateData();
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 更新 tree | group | device
      updateData() {
        this.updateTree();
        this.groupFetch();
      },
      // 更新当前node及tree数据
      updateTree() {
        const {
          selectedRowKeys,
          selectedDevices,
          $refs: { treeBar },
        } = this;
        const num = selectedDevices.length || -selectedRowKeys.length;
        this.updateTreeDevice(this.node, num, 'init'); // 更新tree device
        treeBar.updateTreeData(treeBar.treeData);
        this.selectedDevices = [];
        this.selectedRowKeys = [];
      },
      // 更新tree 设备数量
      updateTreeDevice(node, num, flag) {
        const {
          $refs: { treeBar },
        } = this;
        const { dataRef } = node;
        let { devicenum = 0 } = dataRef;
        devicenum += num;
        const newParentNode = {
          ...node,
          dataRef: {
            ...dataRef,
            devicenum,
            title: `${dataRef.name}(${devicenum || 0}台)`,
          },
        };

        if (node.$parent) {
          const { $refs } = node.$parent;
          if (!this.$_.isEmpty($refs)) {
            this.updateTreeDevice(node.$parent, num);
          }
        }
        if (flag) {
          this.updateNode(newParentNode); // 更新store
        }
        this.getNode(newParentNode.dataRef, treeBar.treeData);
      },
      getNode(group, treeData = []) {
        for (let [index, value] of treeData.entries()) {
          if (value.id === group.id) {
            treeData[index] = group;
            break;
          }
          if (value.children && value.children.length > 0) {
            this.getNode(group, value.children);
          }
        }
      },

      // 查询分组
      getGroup() {
        const { id } = this.group;
        const params = {
          id,
        };
        groupManageAsk
          .getGroup(params)
          .then(reuslt => {
            const { errcode, data = [] } = reuslt;
            if (errcode === 200) {
              this.groupData = data;
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 清理设备查询轮询
      stopTime() {
        clearTimeout(this.timeOut);
      },
      // 请求设备数据
      async groupFetchList(params) {
        this.stopTime();
        const { id } = this.group;
        const { errcode, data = {} } = await groupManageAsk.getDevice({
          ...params,
          id,
        });
        this.timeOut = setTimeout(() => {
          this.groupFetch();
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
  .treeBar {
    width: 260px;
    position: absolute;
    top: 120px;
    bottom: 20px;
    box-sizing: border-box;
    border-right: @bl-border-width-base @bl-border-style-base @bl-border-color-base;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .content {
    margin-left: 260px;
    overflow: auto;
    box-sizing: border-box;
    .header-panel {
      .content-header {
        background: @bl-white;
      }
    }
    .content-body {
      padding: 20px;
      padding-top: 0;
    }
  }
  .table {
    margin-bottom: 40px;
  }
  .panel {
    background: @bl-gray-2;
    padding: 10px 20px;
    display: flex;
    .left,
    .right {
      flex: 1;
    }
    .right {
      text-align: right;
    }
  }
  .disabled {
    background: @bl-disabled-color;
    cursor: not-allowed;
  }
</style>
