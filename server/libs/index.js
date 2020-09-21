/*
 * @Author: your name
 * @Date: 2020-05-28 14:36:14
 * @LastEditTime: 2020-09-21 17:34:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\libs\index.js
 */
const lodash = require('lodash');


module.exports = () => {
  global.$lodash = lodash;
};
