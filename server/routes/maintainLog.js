/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-09-24 17:30:38
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\routes\account.js
 */
const express = require('express');
const controller = require('../controller/maintainLog');

const router = express.Router();
router.post('/get', controller.get);
router.post('/add', controller.add);

module.exports = router;
