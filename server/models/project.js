/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-05-27 14:49:15
 * @LastEditors: Please set LastEditors
 * @Description: In project Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

const projectSchema = require('../schemas/project');

module.exports = mongoose.model('project', projectSchema);
