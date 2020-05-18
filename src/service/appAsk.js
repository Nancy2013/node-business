/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-08-27 10:16:12
 * @LastEditors: Please set LastEditors
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 登录
  loginAccount: reqHandle('/account/login', {
    method: HTTP_METHOD.POST,
  }),
  // 注销
  logoutAccount: reqHandle('/account/logout', {
    method: HTTP_METHOD.POST,
  }),
  // 查询
  getAccount: reqHandle('/account/get', {
    method: HTTP_METHOD.POST,
  }),
  // 修改
  modAccount: reqHandle('/account/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 删除
  delAccount: reqHandle('/account/del', {
    method: HTTP_METHOD.POST,
  }),
  // 添加黑白IP名单
  addIptable: reqHandle('/iptable/add', {
    method: HTTP_METHOD.POST,
  }),
  // 删除黑白IP名单
  delIptable: reqHandle('/iptable/del', {
    method: HTTP_METHOD.POST,
  }),
  // 查询黑白IP名单
  getIptable: reqHandle('/iptable/get', {
    method: HTTP_METHOD.POST,
  }),
  // 修改黑白IP名单
  modIptable: reqHandle('/iptable/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 上传文件
  uploadFiles: reqHandle('/fileupload/h5zip', {
    method: HTTP_METHOD.POST,
  }),
  // 删除文件
  delFiles: reqHandle('/iptable/del', {
    method: HTTP_METHOD.POST,
  }),
  // 上传图片
  uploadPic: reqHandle('/fileupload/pic', {
    method: HTTP_METHOD.POST,
  }),
  // 查询url
  getUrlsite: reqHandle('/urlsite/get', {
    method: HTTP_METHOD.POST,
  }),
   // 查询项目详情
   getInfoProject: reqHandle('/project/getinfo', {
    method: HTTP_METHOD.POST,
   }),
  //  查询项目apk
  getapk: reqHandle('/project/getapk', {
    method: HTTP_METHOD.POST,
   }),
};
