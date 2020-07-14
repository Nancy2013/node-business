/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-07-14 19:53:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  type: {
    type: Number, // 1:site, 2:sotre
    required: true,
  },
  parentId: {
    type: String,
  },
  name: {
    type: String,
  },
});
