/*
 * @Description: 通用第三方组件
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-08 14:50:58
 * @LastEditTime: 2019-10-10 15:19:03
 */
import global from 'commonPath/global';
import moment from 'moment';
import _ from 'lodash';
import md5 from 'md5';

export default {
  install(Vue) {
    Vue.prototype.GLOBAL = global; // 挂载到全局变量到Vue实例上面
    Vue.prototype.$moment = moment;
    Vue.prototype.$md5 = md5;
    Vue.prototype.$_ = _;
  },
};
