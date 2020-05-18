<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 11:04:12
 * @LastEditTime: 2019-10-09 14:09:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-spin :spinning="spinning">
    <div>
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
      </bl-header>
      <bl-page-wrapper class="content-padding">
        <div slot="content">
          <a-form :form="form"
                  hide-required-mark
                  style="width:940px;">
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="任务名称">
              <a-input v-decorator="[ `taskname`,{
          initialValue:task.taskname,
          rules: [{ required: true, message: '输入任务名称长度不超过20个字符' ,max:GLOBAL.NAME_MAX_LEN}],} ]" />
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="任务类型">
              <a-select v-decorator="[ `type`,{
          initialValue:task.type,
          rules: [{ required: true, message: '请选择任务类型' }],} ]"
                        :disabled="!!id"
                        @change="handleSelectChange">
                <a-select-option v-for="item in taskType"
                                 :key="item.key"
                                 :value="item.key">
                  {{ item.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="任务人员">
              <a-select v-decorator="[ `worker`,{
          initialValue:task.worker,
          rules: [{ required: true, message: '请选择任务人员' }],} ]"
                        @change="handleSelectChangeWorker">
                <a-select-option v-for="item in installList"
                                 :key="item.accountname"
                                 :value="item.accountname">
                  {{ item.displayname }}
                </a-select-option>
              </a-select>

            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="任务时限">
              <a-range-picker v-decorator="[ `rangeTime`,{
          initialValue:rangeTime,
          rules: [{ required: true, message: '请选择任务时限' }],} ]"
                              :placeholder="['开始时间','结束时间']"
                              :format="GLOBAL.TIME_FOEMAT"
                              style="width:100%;"
                              show-time
                              @change="onChangeTime" />
            </a-form-item>
            <a-form-item v-if="task.type!=='1'||id"
                         :label-col="labelCol"
                         :wrapper-col="{span:22}"
                         :colon="false"
                         label="任务内容">
              <a-button v-if="!id"
                        type="primary"
                        @click="selectDevice">选择需要维修的设备</a-button>
              <a-table :columns="columns"
                       :row-key="record => record.did"
                       :pagination="false"
                       :data-source="task.devices"
                       bordered
                       class="table-border mt10">
                <template slot="index"
                          slot-scope="text, record,index">
                  <span>{{ index+1 }}</span>
                </template>
                <template slot="running"
                          slot-scope="text, record">
                  <span :class="{error:text==='-1'}">{{ getStatus('runningStatus',text) }}</span>
                </template>
                <template slot="operation"
                          slot-scope="text, record,index">
                  <a @click="delDevice(index)">
                    <a-icon type="close-circle"
                            class="error" /></a>
                </template>
              </a-table>
            </a-form-item>
            <a-form-item v-if="task.type==='1'&&!id"
                         :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="设备数量">
              <a-input-number v-decorator="[ `count`,{
          initialValue:task.count,
          rules: [{ required: true, message: '安装数量至少为1且不超过100'}],} ]"
                              :min="1"
                              :max="100" />
            </a-form-item>

            <a-form-item :label-col="{span:0}"
                         :wrapper-col="{span:24}"
                         :colon="false"
                         label="">
              <a-button class="mr10"
                        @click="cancel">取消</a-button>
              <a-button v-if="id"
                        class="mr10"
                        type="danger"
                        @click="showDelModal">删除</a-button>
              <a-button class="mr10"
                        type="primary"
                        @click="ok">确定
              </a-button>
            </a-form-item>
          </a-form>
        </div>

      </bl-page-wrapper>
      <DeviceModal v-if="isModal"
                   :data="dids"
                   flag="task"
                   @cancel="handleCancel"
                   @ok="handleOk" />
    </div>
  </a-spin>

</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import DeviceModal from './deviceModal.vue';

  const { taskManageAsk } = service;
  export default {
    name: 'TaskDetail',
    components: {
      DeviceModal,
    },
    mixins: [],
    props: {},
    data() {
      return {
        spinning: false,
        breadcrumbRoutes: [],
        form: this.$form.createForm(this),
        labelCol: { span: 2 },
        wrapperCol: { span: 8 },
        columns: [],
        id: this.$route.params.id,
        task: {
          devices: [],
          type: '1',
        },
        dids: [],
        selected: [],
        rangeTime: [],
        isModal: false,
      };
    },
    computed: {
      ...mapState('taskManage', ['taskType']),
      ...mapGetters('taskManage', ['installList']),
      ...mapState('deviceManage', ['runningStatus', 'deviceStatusArray']),
      getStatus() {
        return function(statusArray, val) {
          const status = this[statusArray].filter(v => v.key === val)[0];
          return status ? status.text : '';
        };
      },
    },
    watch: {},
    async created() {
      this.setBreadcrumb();
      this.columns = this.getColumns();
      await this.getRoleList();
      this.init();
    },
    mounted() {},
    destroyed() {},
    methods: {
      ...mapActions('taskManage', ['getRoleList']),
      init() {
        const { id } = this;
        if (id) {
          // 编辑
          this.getAssignment();
        }
      },
      // 设置面包屑
      setBreadcrumb() {
        const breadcrumbRoutes = [
          {
            name: '任务管理',
            breadcrumbName: '全部任务',
          },
        ];
        if (this.id) {
          // 详情
          this.breadcrumbRoutes = [
            ...breadcrumbRoutes,
            {
              name: '',
              breadcrumbName: '任务详情',
            },
          ];
        } else {
          // 创建任务
          this.breadcrumbRoutes = [
            ...breadcrumbRoutes,
            {
              name: '',
              breadcrumbName: '创建任务',
            },
          ];
        }
      },
      // 表头
      getColumns() {
        const columns = [
          {
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            width: '10%',
            scopedSlots: { customRender: 'index' },
          },
          {
            title: '设备名称',
            dataIndex: 'displayname',
            align: 'center',
          },
          {
            title: 'DID',
            dataIndex: 'did',
            align: 'center',
          },
          {
            title: '备注',
            dataIndex: 'remark',
            align: 'center',
          },
          {
            title: '状态',
            dataIndex: 'running',
            align: 'center',
            width: '20%',
            scopedSlots: { customRender: 'running' },
          },
        ];
        const operate = {
          title: '',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' },
        };
        const { id } = this;

        return id ? columns : [...columns, operate];
      },
      // 选择任务类型
      handleSelectChange(value) {
        this.task = Object.assign({}, this.task, { type: value });
      },
      handleSelectChangeWorker(value) {
        const { installList } = this;
        const worker = installList.filter(v => v.accountname === value)[0];
        const workname = worker ? worker.displayname : '';
        this.task = Object.assign({}, this.task, { worker: value, workname });
      },
      disabledDate(current) {
        return current && current < this.$moment();
      },
      // 选择时间
      onChangeTime(rangeTime) {
        this.rangeTime = rangeTime;
      },
      // 选择设备
      selectDevice() {
        const { devices = [] } = this.task;
        this.dids = devices.map(v => v.did);
        this.isModal = true;
      },
      // 取消设备弹窗
      handleCancel() {
        this.isModal = false;
      },
      handleOk(params) {
        const { devices = [] } = this.task;
        this.task = Object.assign({}, this.task, { devices: devices.concat(params) });
        this.handleCancel();
      },
      // 删除设备
      delDevice(index) {
        const { devices } = this.task;
        devices.splice(index, 1);
        this.task = Object.assign({}, this.task, { devices });
      },
      // 取消
      cancel() {
        this.$router.back();
      },
      // 删除确认弹窗
      showDelModal() {
        const that = this;
        this.$confirm({
          title: '确定要删除任务？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del();
          },
          onCancel() {},
        });
      },
      // 删除任务
      del() {
        this.spinning = true;
        const { id } = this;
        const params = {
          assignmentids: [id],
        };
        taskManageAsk
          .delAssignment(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'taskList' });
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 确定按钮
      ok() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          this.spinning = true;
          const { id, rangeTime, task } = this;
          const { taskname, worker, count } = fieldsValue;
          this.task = {
            ...this.task,
            taskname,
            worker,
            count,
          };

          // 时限
          if (rangeTime) {
            const [starttime, endtime] = rangeTime;
            this.task.starttime = starttime ? starttime.format(this.GLOBAL.TIME_FOEMAT) : '';
            this.task.endtime = endtime ? endtime.format(this.GLOBAL.TIME_FOEMAT) : '';
          }

          // 维修任务
          if (task.type === '0') {
            const { devices = [] } = task;
            if (devices.length <= 0) {
              this.$message.warning('请先添加设备！');
              this.spinning = false;
              return;
            }
          }
          // 安装设备
          if (task.devices) {
            const dids = task.devices.map(v => v.did);
            this.task = {
              ...this.task,
              dids,
            };
          }
          if (id) {
            // 修改
            this.modAssignment();
          } else {
            // 添加
            this.addAssignment();
          }
        });
      },
      // 添加
      addAssignment() {
        const params = {
          ...this.task,
        };
        taskManageAsk
          .addAssignment(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'taskList' });
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 修改
      modAssignment() {
        const params = {
          ...this.task,
        };
        taskManageAsk
          .modAssignment(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'taskList' });
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 任务详情
      getAssignment() {
        this.spinning = true;
        const { id, installList = [] } = this;
        const params = {
          id,
        };
        taskManageAsk
          .getAssignmentDetail(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              this.task = data;
              const { starttime, endtime, worker } = this.task;
              if (starttime) {
                this.rangeTime = [this.$moment(starttime), this.$moment(endtime)];
              }
              const pos = installList.findIndex(v => v.accountname === worker);
              if (pos < 0) {
                this.task.worker = '';
              }
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.log(e);
          });
      },
    },
  };
</script>

<style lang="less">
  .table-border .ant-table-thead > tr > th {
    border: none;
  }
  .ant-table-placeholder,
  .table-border .ant-table-tbody > tr > td {
    border-bottom: 1px solid #e8e8e8;
  }
</style>
<style lang="less" scoped>
</style>
