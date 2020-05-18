/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-06-22 11:51:44
 * @LastEditors: your name
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 添加
  addRole: reqHandle('/role/add', {
    method: HTTP_METHOD.POST,
  }),
  // 删除
  delRole: reqHandle('/role/del', {
    method: HTTP_METHOD.POST,
  }),
  // 修改
  modRole: reqHandle('/role/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 查询
  getRole: reqHandle('/role/get', {
    method: HTTP_METHOD.POST,
  }),
 // 查询人员名单
  getAccounttable: reqHandle('/account/get', {
    method: HTTP_METHOD.POST,
 }),
  // 添加人员名单
  addAccounttable: reqHandle('/account/add', {
    method: HTTP_METHOD.POST,
 }),
  // 删除人员名单
  delAccounttable: reqHandle('/account/del', {
    method: HTTP_METHOD.POST,
 }),
  // 修改人员名单
  modAccounttable: reqHandle('/account/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 查询
  getUrlsite: reqHandle('/urlsite/get', {
    method: HTTP_METHOD.POST,
  }),
  // 查询角色url
  getRU: reqHandle('/roleurl/getroleurl', {
    method: HTTP_METHOD.POST,
  }),
  // 绑定角色权限
  bindRU: reqHandle('/roleurl/bindrurl', {
    method: HTTP_METHOD.POST,
  }),
  // 解绑角色权限
  unbindRU: reqHandle('/roleurl/unbindrurl', {
    method: HTTP_METHOD.POST,
  }),
  // 获取登录令牌
  getToken: reqHandle('/account/rqtoken', {
    method: HTTP_METHOD.POST,
  }),
};
