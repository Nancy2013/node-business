/*
 * @Author: your name
 * @Date: 2020-09-16 14:08:08
 * @LastEditTime: 2020-09-16 14:12:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\schemas\modules.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  urlname: {
    type: String,
    required:true,
  },
  urlpath: {
    type: String,
  },
  remark: {
    type: String,
  },
  permission: {
    type:Array,
  },
});
