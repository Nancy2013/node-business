import service from 'servicePath/index';
import global from 'commonPath/global';

const { locationManageAsk } = service;
const locationManage = {
  namespaced: true,
  state: {
    provincial: '',
    urban: '',
    areas: '',
    search: '',
  },
  mutations: {
    // 更新地址
    updateLocation(state, payload) {
      const [provincial, urban, areas] = payload;
      state.provincial = provincial === '-1' ? '' : provincial;
      state.urban = urban === '-1' ? '' : urban;
      state.areas = areas === '-1' ? '' : areas;
    },
    // 搜索
    updateSearch(state, payload) {
      state.search = payload;
    },
  },

  getters: {

  },
  actions: {},
};

export default locationManage;
