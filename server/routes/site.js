/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-09-22 17:05:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\app.js
 */
const express = require('express');
const controller = require('../controller/location')('site');

const router = express.Router();
router.post('/get', controller.get);
router.post('/add', controller.add);
router.post('/detail', controller.detail);
router.post('/mod', controller.mod);
router.post('/del', controller.del);
router.post('/getProvincial', controller.getProvincial);
router.post('/getUrban', controller.getUrban);
router.post('/getArea', controller.getArea);
router.post('/showsite', controller.showSite);
module.exports = router;
