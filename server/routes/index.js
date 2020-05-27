/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-05-27 15:11:27
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const global = require('./../common/global');
const account = require('./account');
const project = require('./project');

module.exports = (app) => {
  app.use(`${global.URL_DEFAULT_PREFIXER}/account`, account);
  app.use(`${global.URL_DEFAULT_PREFIXER}/project`, project);
};
