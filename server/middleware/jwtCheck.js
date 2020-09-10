/*
 * @Author: your name
 * @Date: 2020-09-09 15:15:41
 * @LastEditTime: 2020-09-10 15:25:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\middleware\jwtCheck.js
 */
const jwt = require('jsonwebtoken');
const {
  SECRET,
  TOKEN_WHITE_PATH
} = require('../config');
const errorCode = require('../common/error');


const jwtCheck = (req, res, next) => {
  const {
    token
  } = req.headers;
  
  const path = (req.path).split('/').pop();
  if (TOKEN_WHITE_PATH.includes(path)) {
    // 跳过token验证
    next();
  } else { 
    jwt.verify(token, SECRET, (err, decoded) => {
      // 错误处理 
      if (err) {
      const { name, message } = err;
        res.status(errorCode.forbidden).send({
          errcode: errorCode.forbidden,
          msg: `${name} ${message}`,
        });
      } else { 
        next();
      }
    });
  }
}

module.exports = jwtCheck;
