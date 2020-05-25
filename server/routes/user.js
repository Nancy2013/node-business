/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-05-25 15:51:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\User.js
 */
const express = require('express');
const User = require('../controller/user');

const router = express.Router();
router.post('/login', User.login);
router.post('/signout', User.signOut);

module.exports = router;
