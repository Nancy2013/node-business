/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2020-10-15 14:22:28
 * @LastEditors: Please set LastEditors
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
/* 分组 */
  // 获取子分组和设备
  getGroup: reqHandle('/group/get', {
    method: HTTP_METHOD.POST,
  }),
  // 添加
  addGroup: reqHandle('/group/add', {
    method: HTTP_METHOD.POST,
  }),
  // 修改
  modGroup: reqHandle('/group/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 删除
  delGroup: reqHandle('/group/del', {
    method: HTTP_METHOD.POST,
  }),
  // 删除组设备
  modDevice: reqHandle('/group/moddevice', {
    method: HTTP_METHOD.POST,
  }),
  // 查询组设备
  getDevice: reqHandle('/group/getdevice', {
    method: HTTP_METHOD.POST,
  }),
};
