/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-23 17:44:20
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
  id: {
    type: Number,
  },
  createtime: {
    type:String,
  },
  did: {
    type:String,
  },
  errcode: {
    type:String,
  },
  errmsg: {
    type:String,
  },
  remark: {
    type:String,
  },
  type: {
    type:String,
  }
});
