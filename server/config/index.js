/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-11 16:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const config = {
  URL_DEFAULT_PREFIXER: '/node-business', // 请求路径前缀
  URL: `http://localhost`, // ip
  PORT: 3000, // 端口
  SECRET: 'token_secret', // 加密密钥
  TOKEN_WHITE_PATH:['login'], // token验证白名单
}

module.exports = config;
