/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 09:59:49
 * @LastEditTime: 2019-09-26 14:23:25
 * @LastEditors: Please set LastEditors
 */
import service from 'servicePath/index';
import global from 'commonPath/global';

const dataDisplay = {
  namespaced: true,
  state: {
    rangeTime: [],
    loginType: { // 登录类型
      web: 1,
      android: 2,
      ios: 3,
      officialAccounts: 4, // 公众号
      wechat: 5, // 小程序
    }
  },
  mutations: {
    setRangeTime(state, payload) {
      state.rangeTime = payload;
    }
  },

  getters: {},
  actions: {},
};

export default dataDisplay;
