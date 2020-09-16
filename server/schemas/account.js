/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-16 15:26:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  // uid: {
  //   type: String,
  // },
  token: {
    type: String,
  },
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
    type: String,
  },
  rolename: {
    type: String,
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
});
