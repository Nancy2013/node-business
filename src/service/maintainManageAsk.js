/*
 * @Author: your name
 * @Date: 2020-05-18 10:57:46
 * @LastEditTime: 2020-09-22 14:33:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\src\service\maintainManageAsk.js
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 查询
  modSiteDetails: reqHandle('/site/mod', {
    method: HTTP_METHOD.POST,
  }),
};
