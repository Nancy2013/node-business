/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-30 15:09:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  name: {
    type: String,
    unique:true,
  },
  parentgid: {
    type: String,
  },
  devicenum: {
    type:Number,
  },
  createtime: {
    type:String,
  },
});
