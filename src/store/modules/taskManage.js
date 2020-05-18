/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 13:45:34
 * @LastEditTime: 2019-07-05 13:45:34
 * @LastEditors: your name
 */
import service from 'servicePath/index';
import global from 'commonPath/global';

const { appAsk, taskManageAsk } = service;
const taskManage = {
  namespaced: true,
  state: {
    roleList: [],
    taskType: [
      {
        key: '0',
        text: '维修任务',
      },
      {
        key: '1',
        text: '安装任务',
      },
    ],
    taskStatus: [
      {
        key: '0',
        text: '未开始',
      },
      {
        key: '1',
        text: '未完成',
      },
      {
        key: '2',
        text: '已完成',
      },
      {
        key: '3',
        text: '超时',
      },
    ],
  },

  mutations: {
    updateRoleList(state, payload) {
      state.roleList = payload;
     },
  },

  getters: {
    installList: (state) => state.roleList.filter(v => v.rolename === '安装工') || [],
  },
  actions: {
    async getRoleList({ commit }, payload) {
      const params = {
        limit: global.MAX_LEN,
        offset: 1,
      };
      await appAsk.getAccount(params).then(result => {
        const { errcode, data = {} } = result;
        if (errcode === 200) {
          const { alist = [] } = data;
          commit('updateRoleList', alist);
        }
      }).catch(e => console.error(e));
    },
  },
};

export default taskManage;
