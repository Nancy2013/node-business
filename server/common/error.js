/*
 * @Author: your name
 * @Date: 2020-05-28 15:12:47
 * @LastEditTime: 2020-06-23 19:19:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\common\error.js
 */
// 错误码应该包括http状态错误码、业务错误码
module.exports = {
  ok: 200, // 请求成功
  redirect: 300, // 重定向
  notModified: 304, // 资源未修改
  badRequest: 400, // 语义有误
  forbidden: 403, // 禁止请求
  notFound: 404, // 请求失败
  methodNotAllowed: 405, // 方法不被允许
  requestTimeout: 408, // 请求超时
  internalServerError: 500, // 服务器错误
  serviceUnavailable: 503, // 服务器停机
  gatewayTimeout: 504, // 网关请求超时
};
