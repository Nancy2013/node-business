/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-10-14 17:19:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  productname: {
    type: String,
    require:true,
  },
  devicetype: {
    type: String,
  },
  productversion: {
    type: String,
  },
  pid: {
    type: String,
  },
  categoryid: {
    type:ObjectId,
    ref:'Category'
  },
  attributes: {
    type:Array,
  },
});
