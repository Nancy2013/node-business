/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-09-09 10:19:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\User.js
 */
const express = require('express');
const { uploadPic } = require('../middleware')
const controller = require('../controller/app');

const router = express.Router();
router.post('/fileupload/pic', uploadPic.single('upfile'), controller.uploadPic );
module.exports = router;
