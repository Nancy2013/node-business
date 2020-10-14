/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 15:15:19
 * @LastEditTime: 2020-10-14 15:15:57
 * @LastEditors: Please set LastEditors
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 获取任务列表
  getTimeLinkageList: reqHandle('/timeLinkage/get', {
    method: HTTP_METHOD.POST,
  }),
  // 添加任务
  addTimeLinkage: reqHandle('/timeLinkage/add', {
    method: HTTP_METHOD.POST,
  }),
  // 修改任务
  modTimeLinkage: reqHandle('/timeLinkage/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 获取任务详情
  getTimeLinkageInfo: reqHandle('/timeLinkage/detail', {
    method: HTTP_METHOD.POST,
  }),
  // 删除任务
  delTimeLinkage: reqHandle('/timeLinkage/del', {
    method: HTTP_METHOD.POST,
  }),
  // 执行场景
  execute: reqHandle('/timeLinkage/trigger', {
    method: HTTP_METHOD.POST,
  }),
  // 查询产品列表
  getProduct: reqHandle('/product/get', {
    method: HTTP_METHOD.POST,
  }),
};
