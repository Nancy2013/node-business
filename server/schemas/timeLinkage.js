/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-10-14 15:32:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {
    type: String,
    require:true,
  },
  type: { // 定时-普通：1，定时-自定义：2，联动：3，场景：6
    type: Number,
  },
  createtime: {
    type:String,
  },
  enable: {
    type:Number,
  },
  delay: {
    type:Number,
  },
  schedule: {
    type:Object,
  },
  effects: {
    type:Array,
  },
  factors: {
    type:Array,
  },
});
