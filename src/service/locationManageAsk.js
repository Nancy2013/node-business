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
  /* 站点 */
  // 查询站点
  siteList: reqHandle('/site/get', {
    method: HTTP_METHOD.POST,
  }),
  // 查询站点详情
  getSiteDetail: reqHandle('/site/getdetail', {
    method: HTTP_METHOD.POST,
  }),
  // 删除站点
  delSite: reqHandle('/site/del', {
    method: HTTP_METHOD.POST,
  }),
  // 增加站点
  addSite: reqHandle('/site/add', {
    method: HTTP_METHOD.POST,
  }),
  // 修改站点
  modSite: reqHandle('/site/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 查询省
  siteGetProvincial: reqHandle('/site/getprovincial', {
    method: HTTP_METHOD.POST,
  }),
  // 查询市
  siteGetUrban: reqHandle('/site/geturban', {
    method: HTTP_METHOD.POST,
  }),
  // 查询区
  siteGetArea: reqHandle('/site/getarea', {
    method: HTTP_METHOD.POST,
  }),


  /* 门店 */
  // 查询门店
  storeList: reqHandle('/store/get', {
    method: HTTP_METHOD.POST,
  }),
  // 删除门店
  delStore: reqHandle('/store/del', {
    method: HTTP_METHOD.POST,
  }),
  // 增加门店
  addStore: reqHandle('/store/add', {
    method: HTTP_METHOD.POST,
  }),
  // 修改门店
  modStore: reqHandle('/store/mod', {
    method: HTTP_METHOD.POST,
  }),
  // 查询省
  storeGetProvincial: reqHandle('/store/getprovincial', {
    method: HTTP_METHOD.POST,
  }),
  // 查询市
  storeGetUrban: reqHandle('/store/geturban', {
    method: HTTP_METHOD.POST,
  }),
  // 查询区
  storeGetArea: reqHandle('/store/getarea', {
    method: HTTP_METHOD.POST,
  }),

};
