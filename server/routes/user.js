/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-05-21 15:30:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\User.js
 */
const express = require('express');
const User = require('../controller/user');

const router = express.Router();
router.get('/login', User.login);
router.post('/signout', User.signOut);

export default router;
