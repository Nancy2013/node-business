/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:43
 * @LastEditTime: 2019-10-15 16:42:08
 * @LastEditors: Please set LastEditors
 */
/**
 * ajax 错误处理
 * @see 具体参数文档 - https://github.com/mzabriskie/axios#response-schema
 */
import { DEFAULT_ERR_MSG } from 'configPath/index';
import Message from 'ant-design-vue/lib/message';


export function ajaxFulFilledHandle(data = {}, config) {
  return new Promise((resolve, reject) => {
    console.log(data);
    const { errcode } = data;
    let errMsg = JSON.stringify(data.errmsg || DEFAULT_ERR_MSG);
    if (errcode === 200) {
      // 返回成功
      resolve(data);
    } else {
      if (errcode === 403001) {
        // token过期
        const { href, hash } = window.location;
        Message.info('token过期，请重新登录');
        localStorage.removeItem(`authB_${PROJECT.id}`);
        localStorage.removeItem(`userInfoB_${PROJECT.id}`);
        window.location = href.replace(hash, '#/login');
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
  console.error('ajax err', err);
  const { response } = err;
  Message.error(response.statusText);
  return Promise.reject(err);
}
