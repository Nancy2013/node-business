/*
 * @Author: your name
 * @Date: 2020-09-09 15:15:41
 * @LastEditTime: 2020-09-09 16:14:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\middleware\jwtCheck.js
 */
const {
  response
} = require('../common/utils');
const jwt = require('jsonwebtoken');
const {
  SECRET
} = require('../config');
const errorCode = require('../common/error');

const jwtCheck = function (req, res, next) {
  const {
    token
  } = req.header;
  jwt.verify(token, SECRET, (err,decoded) => { 
    if (err) {
      const { name, message } = err;
      next(new Error({
        errcode: errorCode.forbidden,
        msg:`${name} ${message}`,
      }));
    } else { 
      next();
    }
  } );
}

module.exports = jwtCheck;
