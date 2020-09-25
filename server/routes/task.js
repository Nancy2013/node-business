/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-09-25 14:23:26
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\routes\account.js
 */
const express = require('express');
const controller = require('../controller/task');

const router = express.Router();
router.post('/get', controller.get);
router.post('/add', controller.add);
router.post('/detail', controller.detail);
router.post('/mod', controller.mod);
router.post('/del', controller.del);

module.exports = router;
