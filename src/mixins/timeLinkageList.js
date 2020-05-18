/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 15:49:56
 * @LastEditTime: 2019-09-26 09:59:39
 * @LastEditors: Please set LastEditors
 */
// 用于具有表格分页功能的组件使用
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import service from 'servicePath/index';

const { timeLinkageAsk } = service;

export default which => ({
  data() {
    return {
      params: {},
      data: [],
      pagination: {
        defaultCurrent: 1,
        current: 1,
        pageSize: this.GLOBAL.PAGE_SIZE_XS,
        total: 0,
      },
      disabled: true,
    };
  },
  computed: {
    ...mapState('timeLinkage', ['typeMap']),
    ...mapGetters('timeLinkage', ['formatRepeat']),
  },
  created() {
    this[`${which}Fetch`]();
  },

  methods: {
    // 添加
    add() {
      this.$router.push({ name: `${which}Add` });
    },
    // 编辑
    edit(item) {
      this.$router.push({ name: `${which}Detail`, params: { id: item.id } });
    },
    // 切换开关
    onChange(val, item) {
      const newData = [...this.data];
      const edit = newData.filter(v => v.id === item.id)[0];
      if (edit) {
        edit.enable = val;
        this.data = newData;
      }
      const params = {
        ...item,
        enable: val ? 1 : 0,
      };
      this.mod(params);
    },
    // 修改
    mod(params) {
      this.$emit('updateSpinning', true);
      timeLinkageAsk
        .modTimeLinkage(params)
        .then(result => {
          const { errcode, data } = result;
          if (errcode === 200) {
            this.$message.success('操作成功！');
            this.$emit('updateSpinning', false);
          } else {
            this.reset(params);
          }
        })
        .catch(e => {
          this.$emit('updateSpinning', false);
          this.reset(params);
          console.error(e);
        });
    },
    // 恢复操作
    reset(params) {
      const newData = [...this.data];
      const { id, enable } = params;
      const edit = newData.filter(v => v.id === id)[0];
      if (edit) {
        edit.enable = enable !== 1;
      }
      this.data = newData;
     },
    // 换页
    change(page, pageSize) {
      const { pagination } = this;
      pagination.current = page;
      pagination.pageSize = pageSize;
      this[`${which}Fetch`]();
    },
    // 查询数据
    async [`${which}Fetch`]() {
      const $which = this;
      this.$emit('updateSpinning', true);
      const { pagination } = $which;
      const params = {
        offset: pagination.current,
        limit: pagination.pageSize,
        ...($which.params || {}),
      };
      const result = await this[`${which}FetchList`](params);
      if (result) {
        const { data = [], total } = result;
        $which.data = data || [];
        pagination.total = total || 0;
        this.$emit('updateSpinning', false);
      }
    },
    // 查询数据
    async [`${which}FetchList`]() {
      const { typeMap } = this;
      const { current, pageSize } = this.pagination;
      const params = {
        limit: pageSize,
        offset: current,
        order: 'createtime',
        seq: 1,
        type: typeMap[`${which}`],
      };
      const { errcode, data = {} } = await timeLinkageAsk.getTimeLinkageList(params);
      this.formatData(data);
      return { total: data.totalsize, data: data.taskinfo };
    },
    // 格式化定时数据格式
    formatData(data) {
      const { taskinfo = [] } = data;
      switch (which) {
        case 'timing':
          if (taskinfo) {
            taskinfo.forEach(v => {
              const { weekday } = v;
              v.enable = v.enable === 1;
              v.weekday = this.formatRepeat(weekday);
            });
           }

          break;
        case 'scene':
          if (taskinfo) {
            taskinfo.forEach(v => { v.execute = false; });
          }
          break;
        default: break;
       }
    },
  },
});
