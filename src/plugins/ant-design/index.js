/*
 * @Description: 将ant-design-vue组件定义为全局插件
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-08 14:50:58
 * @LastEditTime: 2019-06-05 14:21:06
 */
import message from 'ant-design-vue/lib/message';
import alert from 'ant-design-vue/lib/alert';
import modal from 'ant-design-vue/lib/modal';

export default {
  install(Vue) {
    Vue.prototype.$message = message;
    Vue.prototype.$alert = alert;
    Vue.prototype.$confirm = modal.confirm;
  },
};
