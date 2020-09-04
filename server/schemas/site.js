/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-04 15:40:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  devicecnt: {
    type: Number,
  },
  location: {
    type: String,
  },
  name: {
    type: String,
    required: true,
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
  status: {
    type: String,
  },
  picurl: {
    type: String,
  }
});
