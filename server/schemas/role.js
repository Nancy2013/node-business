/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-18 16:22:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  rolename: {
    type: String,
    unique:true,
  },
  urlIds: {
    type:Array,
  },
  status: {
    type:Number,
  },
  createtime: {
    type: String,
  },
 
});
