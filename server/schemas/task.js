/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-25 14:55:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  
  count: {
    type: Number,
  },
  inscount: {
    type: Number,
  },
  type: {
    type:String,
  },
  status: {
    type:String,
  },
  worker: {
    type: String,
  },
  taskname: {
    type: String,
    require:true,
  },
  createtime: {
    type:String,
  },
  starttime: {
    type:String,
  },
  endtime: {
    type:String,
  },
});
