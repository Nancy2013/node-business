/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-05-19 16:37:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\app.js
 */
import express from 'express';
import App from '../controller/app';

const router = express.Router();
router.post('/login', App.login);
router.post('/signout', App.signout);

export default router;
