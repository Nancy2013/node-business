/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-28 14:53:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  did: {
    type: String,
  },
  productid: {
    type: String,
  },
  projectid: {
    type: String,
  },
  mac: {
    type: String,
  },
  typename: {
    type: String,
  },
  cookie: {
    type: String,
  },
  displayname: {
    type: String,
  },
  online: {
    type: String,
  },
  remark: {
    type: String,
  },
  running: {
    type: String,
  },
  location: {
    type: String,
  },
  siteid: {
    type: ObjectId,
    ref: 'Site',
  },
  worker: {
    type: String,
  },
  workername: {
    type: String,
  },
  installdate: {
    type: String,
  },
  isbroken: {
    type: Number,
  },
  groupid: {
    type: ObjectId,
    ref: 'Group',
  },
  taskid: {
    type: ObjectId,
    ref:'Task',
  },
  status: {
    Apricon: String,
    ChangePowerState: String,
    Errcode: Number,
    Position: String,
    Set3DLumbar: Number,
    Set3DShoulder: Number,
    SetAirBag: String,
    SetBackChange: Number,
    SetLegChange: Number,
    SetLegMassage: String,
    SetLegVibration: String,
    SetModeChange: String,
    SetShoulderHeight: Number,
    SetWarmAir: String,
    Timedig: Number,
    Traposition: String,
    Wiﬁcon: String,
    Wiﬁstatusre: String,
    Worktisec: Number,
  },
  assstatus: {
    type: String,
  },
  createtime: {
    type: String,
  },
});
