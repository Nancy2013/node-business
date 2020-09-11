/*
 * @Author: your name
 * @Date: 2020-05-28 15:12:47
 * @LastEditTime: 2020-09-11 16:13:53
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
  unAuthorized:401, //未授权
  forbidden: 403, // 禁止请求
  notFound: 404, // 请求失败
  methodNotAllowed: 405, // 方法不被允许
  notAcceptable: 406,  // 不接受的
  proxyAuthenticationRequired:407,  // 反代理未授权
  requestTimeout: 408, // 请求超时
  unSupportedMediaType:415, // 不支持的媒体格式
  locked: 423, // 被锁定
  
  internalServerError: 500, // 服务器错误
  badGateway:502, // 网关错误
  serviceUnavailable: 503, // 服务器停机
  gatewayTimeout: 504, // 网关请求超时
  insufficientStorage: 507,  // Storage不充分
  networkAuthenticationRequired: 511,  // 需要网络授权
};
