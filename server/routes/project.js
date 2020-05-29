/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-05-29 14:25:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\User.js
 */
const express = require('express');
const controller = require('../controller/project');

const router = express.Router();
router.post('/get', controller.get);
router.post('/getapk', controller.getapk);

module.exports = router;
