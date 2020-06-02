/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2020-06-02 10:05:19
 * @LastEditors: Please set LastEditors
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

const BASE_URL = '/device';
export default {
  // 添加
  addDevice: reqHandle(`${BASE_URL}/add`, {
    method: HTTP_METHOD.POST,
  }),
  // 删除
  delDevice: reqHandle(`${BASE_URL}/del`, {
    method: HTTP_METHOD.POST,
  }),
  // 修改
  modDevice: reqHandle(`${BASE_URL}/mod`, {
    method: HTTP_METHOD.POST,
  }),
  // 查询列表
  getDevice: reqHandle(`${BASE_URL}/get`, {
    method: HTTP_METHOD.POST,
  }),
  // 设备控制
  devControl: reqHandle(`${BASE_URL}/controls`, {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备详情
  getBydid: reqHandle(`${BASE_URL}/detail`, {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备控制日志
  getControlLog: reqHandle(`${BASE_URL}/getControlLogs`, {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备错误日志
  getErrorLog: reqHandle(`${BASE_URL}/getErrorLogs`, {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备服务
  getDeviceService: reqHandle(`${BASE_URL}/getDevServices`, {
    method: HTTP_METHOD.POST,
  }),
  // 查询设备维修记录
  getAssignmentDevLog: reqHandle(`${BASE_URL}/getRepairLogs`, {
    method: HTTP_METHOD.POST,
  }),
  // 获得产品属性
  getProductAttributes: reqHandle(`${BASE_URL}/getAttributes`, {
    method: HTTP_METHOD.POST,
  }),
};
