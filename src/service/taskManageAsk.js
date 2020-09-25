/*
 * @Author: your name
 * @Date: 2020-05-18 10:57:46
 * @LastEditTime: 2020-09-25 14:25:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \node-business\src\service\taskManageAsk.js
 */
import { HTTP_METHOD } from 'configPath/index';

import { reqHandle } from 'commonPath/ajax';

export default {
/* 任务 */
  // 添加
addAssignment: reqHandle('/task/add', {
  method: HTTP_METHOD.POST,
}),
  // 删除
delAssignment: reqHandle('/task/del', {
  method: HTTP_METHOD.POST,
}),
// 修改
modAssignment: reqHandle('/task/mod', {
  method: HTTP_METHOD.POST,
}),
// 查询
getAssignment: reqHandle('/task/get', {
  method: HTTP_METHOD.POST,
}),
// 查询详情
getAssignmentDetail: reqHandle('/task/detail', {
  method: HTTP_METHOD.POST,
}),


};
