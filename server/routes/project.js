/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-05-27 15:09:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\User.js
 */
const express = require('express');
const project = require('../controller/project');

const router = express.Router();
router.post('/getinfo', project.getinfo);
router.post('/getapk', project.getapk);

module.exports = router;
