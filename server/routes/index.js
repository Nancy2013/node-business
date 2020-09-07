/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-07 14:37:05
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const fs = require('fs');
const config = require('./../config');

const files = fs.readdirSync(`${__dirname}`).filter(v => v !== 'index.js').map(v => v.slice(0, v.length - 3));
const modules = files.map(v => require(`./${v}`));

module.exports = (app) => {
  modules.forEach((v, index) => {
    if (files[index] === 'app') {
      // 通用
      app.use(`${config.URL_DEFAULT_PREFIXER}/`, v);
    } else { 
      app.use(`${config.URL_DEFAULT_PREFIXER}/${files[index]}`, v);
    }   
  });

  app.use(async (err, req, res, next) => {
    const { statusCode, message } = err;
    res.status(statusCode).send({
      errcode: statusCode,
      msg: message,
    });
  });
};
