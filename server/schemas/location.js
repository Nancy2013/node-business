/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-08 14:20:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  type: {
    type: Number, // 1:site, 2:sotre，3:urban，4:areas
    required: true,
  },
  parentId: {
    type: String,
  },
  name: {
    type: String,
  },
});
