import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import modules from './modules';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules,
  // state: {
  // },
  // getters,
  // actions,
  // mutations
});

export default store;
