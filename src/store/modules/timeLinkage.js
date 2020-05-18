/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 15:42:20
 * @LastEditTime: 2019-09-04 10:39:11
 * @LastEditors: Please set LastEditors
 */
import service from 'servicePath/index';
import global from 'commonPath/global';

const { timeLinkageAsk } = service;
const timeLinkage = {
  namespaced: true,
  state: {
    typeMap: {
      'normal': 1,
      'define': 2,
      'timing': 1,
      'linkage': 3,
      'monitor': 4,
      'alarm': 5,
      'scene': 6,
    },
    setRadio: [
      { label: '不设置', value: 0 },
      { label: '设置', value: 1 }
    ],
    repeatRadio: [
      { label: '不重复', value: 0 },
      { label: '重复', value: 1 }
    ],
    trendArray: [
      {
        value: -1,
        text: '下降到',
      },
      {
        value: 1,
        text: '上升到',
      },
    ],
    repeat: [
      {
        key: '1',
        text: '周一',
      },
      {
        key: '2',
        text: '周二',
      },
      {
        key: '3',
        text: '周三',
      },
      {
        key: '4',
        text: '周四',
      },
      {
        key: '5',
        text: '周五',
      },
      {
        key: '6',
        text: '周六',
      },
      {
        key: '0',
        text: '周日',
      },
    ],
    repeatText: [
      {
        value: '1,2,3,4,5,6,0',
        text: '每天',
      },
      {
        value: '1,2,3,4,5',
        text: '工作日',
      },
      {
        value: '6,0',
        text: '周末',
      },
    ],
  },
  mutations: {

  },

  getters: {
    formatRepeat: state => (payload) => {
      // 显示重复设置
      const { repeatText, repeat } = state;
      let text = '';
      if (payload) {
      const pos = repeatText.findIndex(v => v.value === payload);
        if (pos > -1) {
          text = repeatText[pos].text;
        } else {
          const repeatArr = payload.split(',');
          repeatArr.forEach(item => {
          const index = repeat.findIndex(v => v.key === item);
          if (index > -1) {
            text += `${repeat[index].text}、`;
          }
          });
          text = text.slice(0, -1);
        }
      }
      return text || '不重复';
    }
  },
  actions: {},
};

export default timeLinkage;
