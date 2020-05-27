/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-05-27 16:16:43
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\routes\account.js
 */
const express = require('express');
const account = require('../controller/account/account');

const router = express.Router();
router.post('/login', account.login);
router.post('/logout', account.logout);
router.get('/get', account.get);
router.post('/add', account.add);
router.post('/mod/:_id', account.mod);
router.post('/del', account.logout);

module.exports = router;
