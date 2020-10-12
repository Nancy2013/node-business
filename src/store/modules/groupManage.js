/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2020-10-12 17:28:27
 * @LastEditors: Please set LastEditors
 */
import service from 'servicePath/index';
import global from 'commonPath/global';

const { groupManageAsk } = service;
const groupManage = {
  namespaced: true,
  state: {
    node: {
      dataRef: {},
    },
    isEmpty: true,
  },

  mutations: {
    updateNode(state, payload) {
      state.node = payload || { dataRef: {} };
    },
    updateIsEmpty(state, payload) {
      state.isEmpty = payload;
    },
  },

  getters: {
    formatGroup: (state) => (payload) => {
      if (payload) {
        if (state.node && state.node.dataRef) {
          const { name, id, path } = state.node.dataRef;
          return {
            parentgid: id,
            parentname: name,
            name: '',
            parentpath: path,
          };
        }
      }
      
      return state.node.dataRef || {};
    },
  },
  actions: {},
};

export default groupManage;
