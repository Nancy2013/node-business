/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-05-27 15:48:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  uid: String,
  token: String,
  id: String,
  displayname: String,
  accountname: String,
  accountpwd: String,
  pid: String,
  roleid: String,
  rolename: String,
  name: String,
  sex: String,
  job: String,
  age: Number,
  hobby: String,
  createtime: String
});
