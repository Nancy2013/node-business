/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-08-26 15:13:34
 * @LastEditors: Please set LastEditors
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 添加
  addDevice: reqHandle('/device/add', {
    method: HTTP_METHOD.POST,
  }),
  // 删除
  delDevice: reqHandle('/device/del', {
    method: HTTP_METHOD.POST,
  }),
  // 修改
  modDevice: reqHandle('/device/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 查询列表
  getDevice: reqHandle('/device/get', {
    method: HTTP_METHOD.POST,
  }),
  // 设备控制
  devControl: reqHandle('/devcontrol/controls', {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备详情
  getBydid: reqHandle('/device/getbydid', {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备控制日志
  getControlLog: reqHandle('/device/getcontrollog', {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备错误日志
  getErrorLog: reqHandle('/device/geterrorlog', {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备服务
  getDeviceService: reqHandle('/deviceservice/get', {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备维修记录
  getAssignmentDevLog: reqHandle('/assignment/getdev', {
    method: HTTP_METHOD.POST,
  }),
  // 获得产品属性
  getProductAttributes: reqHandle('/product/getattributes', {
    method: HTTP_METHOD.POST,
  }),
};
