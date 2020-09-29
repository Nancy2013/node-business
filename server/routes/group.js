/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-09-29 15:10:57
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\routes\account.js
 */
const express = require('express');
const controller = require('../controller/group');

const router = express.Router();
router.post('/get', controller.get);  // 查询子分组
// router.post('/getAll', controller.getAll);  // 查询所有分组
router.post('/add', controller.add);
router.post('/mod', controller.mod);
router.post('/del', controller.del);
router.post('/getDevice', controller.getDevice);  // 查询组设备
router.post('/modDevice', controller.modDevice);  // 修改组设备
module.exports = router;
