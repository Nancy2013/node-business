/*
 * @Author: your name
 * @Date: 2020-09-22 14:04:18
 * @LastEditTime: 2020-09-22 14:07:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\schemas\maintain.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {
    type: String,
    require:true,
  },
  provincial: {
    type: String,
  },
  urban: {
    type: String,
  },
  areas: {
    type: String,
  },
  location: {
    type: String,
  },
  devicecnt: {
    type:Number,
  },
  checkcycle: {
    type:Number,
  },
  status: {
    type: String,
  },
});