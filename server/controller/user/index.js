/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-05-25 17:02:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\user\index.js
 */

const UserModel = require('../../models/user');

const User = {
  login: async (req, res, next) => {
    const params = req.body;
    // const user = await UserModel.create(params);
    res.send(JSON.stringify(params));
  },
  signOut: async () => {
    console.log('signOut');
   },
};
module.exports = User;
