import { HTTP_METHOD } from 'configPath/index';

import { reqHandle } from 'commonPath/ajax';

export default {
/* 任务 */
  // 添加
addAssignment: reqHandle('/assignment/add', {
  method: HTTP_METHOD.POST,
}),
  // 删除
delAssignment: reqHandle('/assignment/del', {
  method: HTTP_METHOD.POST,
}),
// 修改
modAssignment: reqHandle('/assignment/mod', {
  method: HTTP_METHOD.POST,
}),
// 查询
getAssignment: reqHandle('/assignment/get', {
  method: HTTP_METHOD.POST,
}),
// 查询详情
getAssignmentDetail: reqHandle('/assignment/getdetail', {
  method: HTTP_METHOD.POST,
}),


};
