/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-10-14 16:56:39
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
});
