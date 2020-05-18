/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 15:15:19
 * @LastEditTime: 2019-09-03 10:42:50
 * @LastEditors: Please set LastEditors
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 获取任务列表
  getTimeLinkageList: reqHandle('/task/getlist', {
    method: HTTP_METHOD.POST,
  }),
  // 添加任务
  addTimeLinkage: reqHandle('/task/add', {
    method: HTTP_METHOD.POST,
  }),
  // 修改任务
  modTimeLinkage: reqHandle('/task/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 获取任务详情
  getTimeLinkageInfo: reqHandle('/task/getinfo', {
    method: HTTP_METHOD.POST,
  }),
  // 删除任务
  delTimeLinkage: reqHandle('/task/del', {
    method: HTTP_METHOD.POST,
  }),
  // 查询产品列表
  getProduct: reqHandle('/product/get', {
    method: HTTP_METHOD.POST,
  }),
  // 执行场景
  execute: reqHandle('/task/trigger', {
    method: HTTP_METHOD.POST,
  }),
};
