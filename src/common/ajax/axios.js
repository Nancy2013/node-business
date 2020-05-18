/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:43
 * @LastEditTime: 2019-09-19 18:54:28
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios';
import Message from 'ant-design-vue/lib/message';
import { REQ_TIME_OUT } from 'configPath/index';
import { paramsSerializer } from 'commonPath/utils';

import {
  ajaxFulFilledHandle,
  ajaxRejectedHandle
} from './ajaxErrorHandle';

let axiosInstance;

// 创建axiso实例
export function createAxiosInstance(config) {
  axiosInstance = axios.create(config);
  const reqInterceptors = [];

const rspInterceptors = [{
  // 错误处理
  fulfilled: rsp => ajaxFulFilledHandle(rsp.data, { type: 'ajax', options: { rsp } }),
  rejected: ajaxRejectedHandle
}];


  function addInterceports(interceptors = [], type = 'request') {
    interceptors.forEach(interceptor => axiosInstance.interceptors[type]
      .use(interceptor.fulfilled, interceptor.rejected));
}

addInterceports(reqInterceptors, 'request');
addInterceports(rspInterceptors, 'response');
  return axiosInstance;
}


export default createAxiosInstance;
