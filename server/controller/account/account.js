/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-05-27 16:27:02
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */

const accountModel = require('../../models/account');

const accountController = {
  login: async (req, res) => {
    const params = req.body;
    res.send(JSON.stringify(params));
  },
  logout: async (req, res) => {
    console.log('logout');
  },
  get: async (req, res) => {
    const result = await accountModel.find();
    res.send(result);
  },
  add: async (req, res) => {
    const params = req.body;
    const result = await accountModel.create(params);
    res.send(result);
  },
  mod: async (req, res) => {
    const { _id } = req.params;
    const params = req.body;
    const result = await accountModel.findByIdAndUpdate(_id, params);
    res.send({
      errcode: 200,
      msg: 'success'
    });
  },
  del: async (req, res) => {
    console.log('del');
   },
};
module.exports = accountController;
