/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-24 15:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  ip: {
    type: String,
  },
  account: {
    type: String,
  },
  createtime: {
    type:String,
  },
  action: {
    type:String,
  },
  object: {
    type:String,
  },
  remark: {
    type:String,
  },
});
