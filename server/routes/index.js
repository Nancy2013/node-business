/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-06-16 19:46:29
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const fs = require('fs');
const global = require('./../common/global');

const files = fs.readdirSync(`${__dirname}`).filter(v => v !== 'index.js').map(v => v.slice(0, v.length - 3));
const modules = files.map(v => require(`./${v}`));

module.exports = (app) => {
  modules.forEach((v, index) => {
    app.use(`${global.URL_DEFAULT_PREFIXER}/${files[index]}`, v);
  });
  // 错误统一处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode).send({});
  }
}
