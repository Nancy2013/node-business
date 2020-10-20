/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-10-20 16:24:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\app.js
 */
const express = require('express');
const controller = require('../controller/device');

const router = express.Router();
router.post('/get', controller.get);
router.post('/add', controller.add);
router.post('/detail', controller.detail);
router.post('/mod', controller.mod);
router.post('/del', controller.del);
router.post('/controls', controller.controls);
router.post('/getControlLogs', controller.getControlLogs);
router.post('/getErrorLogs', controller.getErrorLogs);
router.post('/getDevServices', controller.getDevServices);
router.post('/getRepairLogs', controller.getRepairLogs);
router.post('/getAttributes', controller.getAttributes);
router.post('/getStatistics', controller.getStatistics);

module.exports = router;
