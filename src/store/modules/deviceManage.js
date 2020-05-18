/*
 * @Description: In User Settings Edit
 * @Author: your key
 * @Date: 2019-07-04 14:59:10
 * @LastEditTime: 2019-09-18 10:08:59
 * @LastEditors: Please set LastEditors
 */
import service from 'servicePath/index';
import global from 'commonPath/global';

const { deviceManageAsk } = service;
const deviceManage = {
  namespaced: true,
  state: {
    deviceStatusArray: [
      {
        key: '0',
        text: '未安装',
      },
      {
        key: '1',
        text: '已安装',
      },
      {
        key: '2',
        text: '已验证',
      },
      {
        key: '3',
        text: '故障中',
      },
      {
        key: '4',
        text: '已维护',
      },
    ],
    onlineStatus: [
      {
        key: '0',
        text: '离线',
      },
      {
        key: '1',
        text: '在线',
      },
    ],
    runningStatus: [
      {
        key: '-1',
        text: '故障中',
      },
      {
        key: '0',
        text: '空闲',
      },
      {
        key: '1',
        text: '使用',
      },
    ],
    valueType: {
      string:'1',// 字符串
      enum: '2', // 枚举
      range: '3', // 连续型
    },
    deviceInfo: {},
    attributes: [],
  },
  mutations: {
    // 更新设备状态
    updateDevice(state, payload) {
      state.deviceInfo = Object.assign({}, state.deviceInfo, payload);
    },
    // 更新设备属性
    updateAttributes(state, payload) {
      state.attributes = payload;
     },
  },

  getters: {
    // 格式化产品属性
    formatAttributes: state => {
      const { attributes = [], } = state;
      if (attributes) {
        const operateAttr = attributes.filter(v => v.operationtype !== '2') || []; // 过滤只读属性
        // console.log(attributes);
        const newAttributes = operateAttr.map(v => {
          const { valuetype } = v;
          const item = {
            text: v.displayname,
            key: v.openproxy,
            valuetype,
            status: [],
          };
          // 枚举 | 字符串
          if (valuetype === state.valueType.enum || valuetype === state.valueType.string ) {
            v.openvalue = v.openvalue.replace(/，/g, ',');
            v.openname = v.openname.replace(/，/g, ',');
            const values = v.openvalue && v.openvalue.split(',') || [];
            const texts = v.openname && v.openname.split(',') || [];
            item.status = values.map((k, index) => ({ text: texts[index] || k, value: k }));
          }
          // 连续型
          if (valuetype === state.valueType.range) {
            const range = v.openvalue && v.openvalue.split('-') || [];
            if (range) {
              item.min = parseInt(range[0]);
              item.max = parseInt(range[1]);
              item.step = 1;
            }
          }
          return item;
        });
        console.log(newAttributes);
        return newAttributes;
      }
     },
  },
  actions: {
    getProductAttributes({ commit }, payload) {
      deviceManageAsk
          .getProductAttributes(payload)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { attributes = [] } = data;
              commit('updateAttributes', attributes);
            }
          })
          .catch(e => {
            console.error(e);
          });
     },
  },
};

export default deviceManage;
