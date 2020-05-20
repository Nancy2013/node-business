/*
 * @Author: your name
 * @Date: 2020-05-19 16:30:30
 * @LastEditTime: 2020-05-20 15:10:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\routes\User.js
 */
import express from 'express';
import User from '../controller/user';

const router = express.Router();
router.post('/login', User.login);
router.post('/signout', User.signout);

export default router;
