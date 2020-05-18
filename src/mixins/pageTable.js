/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:43
 * @LastEditTime: 2019-09-29 14:55:52
 * @LastEditors: Please set LastEditors
 */
// 用于具有表格分页功能的组件使用
export default which => ({
  data() {
    return {
      loading: false,
      params: {},
      columns: [],
      data: [],
      tableFilter: {},
      pagination: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 15,
        total: 0,
      },
    };
  },

  created() {
    if (typeof this[`${which}Columns`] === 'function') {
      this.columns = this[`${which}Columns`]();
    }
    const filterPage = ['group'];
    if (filterPage.includes(which)) {
      const { id } = this.group;
      if (id) {
        this[`${which}Fetch`]();
      }
    } else {
      this[`${which}Fetch`]();
    }
  },

  methods: {
     // 初始化
     init() {
      this.pagination.current = 1;
      this[`${which}Fetch`]();
    },
    async [`${which}Fetch`]() {
      const $which = this;
      $which.loading = true;

      const { pagination, tableFilter } = $which;

      const params = {
        offset: pagination.current,
        limit: pagination.pageSize,
        seq: 1,
        ...($which.params || {}),
      };
      Object.keys(tableFilter).map(v => {
        params[v] = JSON.stringify(tableFilter[v]);
      });
      const result = await this[`${which}FetchList`](params);
      if (result) {
        const { data = [], total } = result;
        $which.data = data || [];
        pagination.total = total || 0;
        $which.loading = false;
      }
    },

    [`${which}ShowBeforeTotal`](total, pageSize, totalPage, page, range) {
      return `共${total}条，每页显示${pageSize}条`;
    },

    [`${which}Change`](p, filter, sorter) {
      // 结束循环
      const filterPage = ['device', 'group'];
      if (filterPage.includes(which)) {
        this.stopTime();
      }
      const { pagination } = this;
      pagination.current = Math.abs(parseInt(p.current));
      pagination.pageSize = p.pageSize;
      this.tableFilter = filter;
      this[`${which}Fetch`]();
    },

    [`${which}FormatPagination`](operate) {
      const { data, pagination } = this;
      console.log(this.data);
      if (operate === 'add') {
        if (data.length === pagination.pageSize) {
          this.pagination.current = pagination.current + 1;
        }
      } else if (data.length === 1) {
        if (pagination.current > 1) {
          this.pagination.current = pagination.current - 1;
        }
      }
    },

    // 删除数据最后一页时，请求前一页数据
    formatPagination() {
      const { data, pagination } = this;
      if (data.length === 1) {
        if (pagination.current > 1) {
          this.pagination.current = pagination.current - 1;
        }
      }
    },
  },
});
