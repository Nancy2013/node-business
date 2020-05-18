/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 15:49:56
 * @LastEditTime: 2019-09-29 16:17:20
 * @LastEditors: Please set LastEditors
 */
// 用于具有表格分页功能的组件使用
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import service from 'servicePath/index';
import DeviceModal from 'viewsPath/taskManage/detail/deviceModal.vue';
import StatusModal from 'viewsPath/timeLinkage/components/statusModal.vue';
import Actions from 'viewsPath/timeLinkage/components/actions.vue';

const { timeLinkageAsk } = service;

export default which => ({
  components: {
    DeviceModal,
    StatusModal,
    Actions,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
      id: parseInt(this.$route.params.id),
      data: {
        enable: 1,
        schedule: {
          'isrepeat': 0,
        },
        effects: [],
        factors: [],
      },
      isDeviceModal: false,
      isAction: true, // true：执行动作 false: 触发条件
      isStatusModal: false,
      status: {},
      current: {},
      empty: '暂无设置',
      dids: [],
    };
  },
  computed: {
    ...mapState('timeLinkage', ['repeat', 'typeMap', 'setRadio', 'repeatRadio']),
    ...mapState('deviceManage', ['valueType']),
    // 选中按钮
    setStatus() {
      return function(item) {
        const { weekday } = this.data.schedule;
        if (weekday) {
          return weekday.includes(item.key) ? 'primary' : null;
        }
        return null;
      };
    },
  },
  created() { },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      const { id } = this;
      if (id) {
        // 编辑
        this.getDetail();
      } else {
        // 详情，初始化任务类型
        this.$set(this.data, 'type', this.typeMap[which]);
      }
    },
    // 切换是否设置
    onChangeRadioSet(e, flag) {
      const { value } = e.target;
      if (flag === 'time') {
        const { time } = this.data.schedule;

        this.starttime = value === 1 ? this.$moment() : null;
        this.endtime = null;
        // 初始化时间
        const schedule = {
          ...this.data.schedule,
          isrepeat: value === 1 ? 0 : null,
          starttime: value === 1 ? time || this.$moment().format(this.GLOBAL.TIME_FORMAT_TIMING) : null, // 开始时间初始化为当前时间，为了区分不设置与设置
          endtime: null,
        };
        this.data = Object.assign({}, this.data, { schedule });
      }
      if (flag === 'delay') {
        // 初始化延时
        const delay = value === 1 ? this.data.delay || 1 : null;
        this.data = Object.assign({}, this.data, { delay });
      }
    },
    // 设置重复时间
    onChangeRadio(e) {
      // 设置重复时，初始化选中周一至周五
      console.log(e);
      const { value } = e.target;
      let weekday;
      if (value === 1) {
        // 重复设置
        weekday = '1,2,3,4,5';
      } else {
        // 不重复
        weekday = '';
      }
      const schedule = {
        ...this.data.schedule,
        weekday
      };
      this.data = Object.assign({}, this.data, { schedule });
    },
    // 设置重复
    setRepeat(item) {
      const { weekday = '' } = this.data.schedule;
      const weekdayArray = weekday.split(',');
      if (weekday.includes(item.key)) {
        // 取消选择
        if (weekdayArray.length > 1) {
          const pos = weekdayArray.findIndex(v => v === item.key);
          weekdayArray.splice(pos, 1);
        } else {
          this.$message.warning('至少选择一天');
          return;
        }
      } else {
        weekdayArray.push(item.key);
      }
      const pos = weekdayArray.findIndex(v => v === '0');
        if (pos > -1) {
          // 包含0
          weekdayArray.splice(pos, 1);
          weekdayArray.sort();
          weekdayArray.push('0');
        } else {
          // 不包含0
          weekdayArray.sort();
        }
      const schedule = {
        ...this.data.schedule,
        weekday: weekdayArray.join(',')
      };
      this.data = Object.assign({}, this.data, { schedule });
     },
    // 添加设备
    addDevice(operate) {
      this.isAction = operate;
      const flag = operate ? 'effects' : 'factors';
      this.isDeviceModal = true;
      this.data[flag] = this.data[flag] ? this.data[flag] : [];
      if (operate) {
        // 添加联动-执行操作，设备存在唯一性
        this.dids = this.data[flag].map(v => v.deviceid);
      } else {
        // 添加联动-触发条件，设备可添加多次
        this.dids = [];
      }
    },
    // 取消添加设备
    handleCancelDevice() {
      this.isDeviceModal = false;
    },
    // 确定添加设备
    handleOkDevice(params) {
      console.log(params);
      const flag = this.isAction ? 'effects' : 'factors';
      this.data[flag] = this.data[flag] ? this.data[flag] : [];
      params.forEach(v => {
        v.deviceid = v.did;
        v.devicename = v.displayname;
        v.actions = [];
      });
      this.data = Object.assign({}, this.data, { [flag]: this.data[flag].concat(params) });
      this.handleCancelDevice();
    },
    // 删除设备
    delDevices(index, flag) {
      this.data[flag].splice(index, 1);
    },
    // 获得设置后的执行操作
    updateAcion(params, index, flag) {
      const newData = this.data;
      const edit = newData[flag][index];
      if (edit) {
        const { actions } = params;
        edit.actions = actions;
        this.data = newData;
      }
    },
    // 取消
    cancel() {
      this.$router.back();
    },
    // 删除确认弹窗
    showDelModal() {
      const that = this;
      this.$confirm({
        title: '确定要删除？',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          that.del();
        },
        onCancel() {},
      });
    },
    // 确定
    ok() {
      this.form.validateFields((err, fieldsValue) => {
        const { id, data, typeMap, GLOBAL, starttime, endtime } = this;
        const { name, operatetime } = fieldsValue;
        const { type, schedule, effects = [], factors = [], linktasks = [] } = this.data;
        const { isrepeat, } = schedule;
        if (err) {
          return;
        }
        console.log(effects);

        if (type === typeMap.linkage) {
          // 联动
          if (!this.isValidLinkage()) {
            return;
          }
        } else {
          // 定时||场景
          if (effects.length <= 0) {
            this.$message.warning('请设置执行设备!');
            return;
          }
          // 定时
          if (type === typeMap.normal) {
            // 普通定时格式化设备执行操作
            this.formatDevice();
          }
        }
        for (let i = 0; i < effects.length; i += 1) {
          const { actions = [] } = effects[i];
          if (actions.length <= 0) {
            this.$message.warning('请设置设备执行操作!');
            return;
          }
        }
        // 区分定时的执行时间与联动的有效时间
        const finalTime = which === 'timing' ? operatetime : starttime;
        this.data = {
          ...data,
          schedule: {
            ...schedule,
            starttime: finalTime ? this.$moment(finalTime).format(GLOBAL.TIME_FORMAT_TIMING) : '',
            endtime: endtime ? this.$moment(endtime).format(GLOBAL.TIME_FORMAT_TIMING) : '',
          },
          name,
        };
        if (id) {
          // 编辑
          this.mod();
        } else {
          // 添加
          this.add();
        }
      });
    },
    // 定时格式化设备
    formatDevice() {
      const { effects = [] } = this.data;
      const { actions = [] } = this.current;
      effects.forEach(v => {
        v.productid = this.productid;
        v.actions = actions;
      });
    },
    // 联动判断有效性
    isValidLinkage() {
      const { starttime, endtime } = this;
      const { factors = [], effects = [], linktasks = [] } = this.data;
      // 判断联动有效条件
      if (factors.length <= 0) {
        this.$message.warning('请设置触发条件!');
        return false;
      }
      if (effects.length <= 0 && linktasks.length <= 0) {
        this.$message.warning('请设置场景或添加设备!');
        return false;
      }
      for (let i = 0; i < factors.length; i += 1) {
        const { actions = [] } = factors[i];
        const { attrmethod, attrvalue, } = actions[0] || {};
        if (attrmethod == null || attrvalue == null) {
          this.$message.warning('请设置有效触发条件!');
          return false;
        }
      }
      if (starttime) {
        if (!endtime || endtime.isBefore(starttime)) {
          this.$message.warning('请选择有效时间范围!');
          return false;
        }
      }
      return true;
    },
    // 添加
    add() {
      this.$emit('updateSpinning', true);
      const params = {
        ...this.data,
      };
      timeLinkageAsk
        .addTimeLinkage(params)
        .then(result => {
          const { errcode, data } = result;
          if (errcode === 200) {
            this.$message.success('操作成功！');
            this.$router.push({ name: `${which}List` });
            this.$emit('updateSpinning', false);
          }
        })
        .catch(e => {
          this.$emit('updateSpinning', false);
          console.error(e);
        });
    },
    // 修改
    mod() {
      this.$emit('updateSpinning', true);
      const params = {
        ...this.data,
      };
      timeLinkageAsk
        .modTimeLinkage(params)
        .then(result => {
          const { errcode, data } = result;
          if (errcode === 200) {
            this.$message.success('操作成功！');
            this.$router.push({ name: `${which}List` });
            this.$emit('updateSpinning', false);
          }
        })
        .catch(e => {
          this.$emit('updateSpinning', false);
          console.error(e);
        });
    },
    // 删除
    del() {
      this.$emit('updateSpinning', true);
      const { id } = this;
      const params = {
        ids: [id],
      };
      timeLinkageAsk
        .delTimeLinkage(params)
        .then(result => {
          const { errcode, data } = result;
          if (errcode === 200) {
            this.$message.success('操作成功！');
            this.$router.push({ name: `${which}List` });
          }
          this.$emit('updateSpinning', false);
        })
        .catch(e => {
          this.$emit('updateSpinning', false);
          console.error(e);
        });
    },
  },
});
