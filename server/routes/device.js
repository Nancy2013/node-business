/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-09-23 15:48:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\app.js
 */
const express = require('express');
const controller = require('../controller/device');

const router = express.Router();
router.post('/get', controller.get);
router.post('/add', controller.add);
router.post('/detail/:did', controller.detail);
router.post('/mod/:did', controller.mod);
router.post('/del/:did', controller.del);
router.post('/controls', controller.controls);
router.post('/getControlLogs', controller.getControlLogs);
router.post('/getErrorLogs', controller.getErrorLogs);
router.post('/getDevServices', controller.getDevServices);
router.post('/getRepairLogs', controller.getRepairLogs);
router.post('/getAttributes', controller.getAttributes);
router.post('/getStatistics', controller.getStatistics);

module.exports = router;
