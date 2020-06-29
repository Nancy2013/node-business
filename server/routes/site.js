/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-06-29 19:57:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\app.js
 */
const express = require('express');
const controller = require('../controller/site');

const router = express.Router();
router.post('/get', controller.get);
router.post('/add', controller.add);
router.post('/detail/:id', controller.detail);
router.post('/mod/:id', controller.mod);
router.post('/del/:id', controller.del);
router.post('/getProvincial', controller.getProvincial);
router.post('/getUrban', controller.getUrban);
router.post('/getArea', controller.getArea);
module.exports = router;
