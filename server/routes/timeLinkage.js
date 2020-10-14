/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-10-14 15:15:37
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\routes\account.js
 */
const express = require('express');
const controller = require('../controller/timeLinkage');

const router = express.Router();
router.post('/get', controller.get);
router.post('/add', controller.add);
router.post('/detail', controller.detail);
router.post('/mod', controller.mod);
router.post('/del', controller.del);
router.post('/trigger', controller.trigger);

module.exports = router;
