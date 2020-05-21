/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-05-21 15:19:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\user\index.js
 */

import UserModel from '../../models/user';

const User = {
  login: async () => {
    console.log('login');
  },
  signOut: async () => {
    console.log('signOut');
   },
};
module.exports = User;
