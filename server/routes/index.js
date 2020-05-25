/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-05-25 17:13:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const user = require('./user');
const global = require('./../common/global');

module.exports = (app) => {
  app.use(`${global.URL_DEFAULT_PREFIXER}/user`, user);
};
