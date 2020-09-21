/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-21 15:17:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  displayname: {
    type: String,
  },
  accountname: {
    type: String,
    unique: true,
  },
  accountpwd: {
    type: String,
  },
  pid: {
    type: String,
  },
  roleid: {
    type: ObjectId,
    ref: 'Role',
  },
  createtime: {
    type: String,
  },
  validtime: {
    type: String,
  },
  expiretime: {
    type: String,
  },
  validToken: {
    type: String,
  },
});
