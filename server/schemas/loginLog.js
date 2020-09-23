/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-23 17:36:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  account: {
    type: String,
    require:true,
  },
  type: { //  web: 1, android: 2,ios: 3,officialAccounts: 4, // 公众号 wechat: 5, // 小程序
    type: Number,
  },
  createtime: {
    type: String,
  },
  ip: {
    type: String,
  },
});
