/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-05-20 14:43:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

const userschama = require('../schemas/user');

module.exports = mongoose.model('User', userschama);
