/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:43
 * @LastEditTime: 2019-09-18 16:10:10
 * @LastEditors: Please set LastEditors
 */
// Location 列表
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import service from 'servicePath/index';

const { locationManageAsk } = service;

export default which => ({
  data() {
    return {
      data: [],
      spinning: false,
      current: 1,
      total: 0,
    };
  },
  computed: {
    ...mapState('locationManage', ['provincial', 'urban', 'areas', 'search']),
  },
  created() {
    this[`${which}List`]();
  },

  methods: {
    doSearch() {
      this.current = 1;
      this[`${which}List`]();
    },
    detail(record) {
      this.$router.push({ name: `${which}Detail`, params: { id: record.id } });
    },
    change(page, pageSize) {
      this.current = page;
      this[`${which}List`]();
    },
     [`${which}List`]() {
      this.spinning = true;
      const { current, GLOBAL, provincial, urban, areas, search } = this;
      const params = {
        limit: GLOBAL.PAGE_SIZE_S,
        offset: current,
        name: search,
        provincial,
        urban,
        areas,
        order: 'id',
        seq: 1,
      };
      locationManageAsk[`${which}List`](params)
        .then(result => {
          const { errcode, data = {} } = result;
          const tag = which === 'site' ? 'sitelocations' : 'stores';
          if (errcode === 200) {
            const { totalsize = 0, [tag]: datas } = data;
            this.total = totalsize;
            this.data = datas;
          }
          this.spinning = false;
        })
        .catch(e => {
          this.spinning = false;
          console.error(e);
        });
    },
  },
});
