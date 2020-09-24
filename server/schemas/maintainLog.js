/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-24 16:33:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  worker: {
    type: String,
    require:true,
  },
  createtime: {
    type: String,
  },
  taskid: {
    type: ObjectId,
    ref:'Task',
  },
  did: {
    type: String,
  },
  action: {
    type: String,
  },
  remark: {
    type: String,
  },
  status: {
    type: String,
  },
  asstype: {
    type:String,
  },
  location: {
    type:String,
  },
  ip: {
    type:String,
  }
});
