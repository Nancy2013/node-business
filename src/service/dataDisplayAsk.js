/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-09-29 16:27:57
 * @LastEditors: Please set LastEditors
 */
import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  getLogList: reqHandle('/loginlog/get', {
    method: HTTP_METHOD.POST,
  }),
  getAppLogList: reqHandle('/loginlog/getapp', {
    method: HTTP_METHOD.POST,
  }),
  getControlLog: reqHandle('/device/getcontrollog', {
    method: HTTP_METHOD.POST,
  }),
  getAlarmLog: reqHandle('/device/geterrorlog', {
    method: HTTP_METHOD.POST,
  }),
  getSystemLog: reqHandle('/systemlog/get', {
    method: HTTP_METHOD.POST,
  }),
  getAssignmentLog: reqHandle('/assignment/getassignmentlog', {
    method: HTTP_METHOD.POST,
  }),
  getFeedback: reqHandle('/feedback/get', {
    method: HTTP_METHOD.POST,
  }),
  getRepair: reqHandle('/repair/get', {
    method: HTTP_METHOD.POST,
  }),
  getLoginNum: reqHandle('/loginlog/getstatistics', {
    method: HTTP_METHOD.POST,
  }),
  getStatistics: reqHandle('/device/getdevcnt', {
    method: HTTP_METHOD.POST,
  }),
  getExperienceNum: reqHandle('/deviceservice/showservice', {
    method: HTTP_METHOD.POST,
  }),
  getSiteNum: reqHandle('/site/showsite', {
    method: HTTP_METHOD.POST,
  }),
  getUsingRate: reqHandle('/device/showdeviceusing', {
    method: HTTP_METHOD.POST,
  }),
  getBrokenRate: reqHandle('/device/showdevicebroken', {
    method: HTTP_METHOD.POST,
  }),
};
