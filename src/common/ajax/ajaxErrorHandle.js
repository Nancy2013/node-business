/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:43
 * @LastEditTime: 2020-09-11 17:24:21
 * @LastEditors: Please set LastEditors
 */
/**
 * ajax 错误处理
 * @see 具体参数文档 - https://github.com/mzabriskie/axios#response-schema
 */
import {
  DEFAULT_ERR_MSG
} from 'configPath/index';
import Message from 'ant-design-vue/lib/message';
import Vue from 'vue';

// TODO 错误码拦截
export function ajaxFulFilledHandle(data = {}, config) {
  return new Promise((resolve, reject) => {
    console.log(data);
    const {
      errcode,
      msg
    } = data;
    let errMsg = JSON.stringify(msg || DEFAULT_ERR_MSG);
    if (errcode === 200) {
      // 返回成功
      resolve(data);
    } else {
      if (errcode === 401) {
        // token过期
        Message.info('token过期，请重新登录');
        localStorage.removeItem(`authB_${PROJECT.id}`);
        localStorage.removeItem(`userInfoB_${PROJECT.id}`);
        Vue.router.push({name:'/login'});
      } else {
        if (errMsg.length > 100) {
          errMsg = `${errMsg.slice(0, 100)}...`;
        }
        Message.error(errMsg);
      }
      reject(data);
    }
  });
}

export function ajaxRejectedHandle(err) {
  const {
    response = {}
  } = err;
  const { data, statusText } = response;
  const { msg } = data;
  Message.error(msg || statusText);
  return Promise.reject(err);
}
