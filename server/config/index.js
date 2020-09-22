/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-22 17:19:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const config = {
  URL_DEFAULT_PREFIXER: '/node-business', // 请求路径前缀
  URL: `http://localhost`, // ip
  PORT: 3000, // 端口
  PRIVATE_KEY: 'token', // 加密密钥
  TOKEN_WHITE_PATH: ['login'], // token验证白名单
  PID: 1,
  FORMAT_TIME: 'YYYY-MM-DD', // 格式化时间
  FORMAT_SITE_TIME:'YYYY-MM', // 查询站点
}

module.exports = config;
