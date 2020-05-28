/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-05-28 14:56:50
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */

const accountModel = require('../../models/account');

const { isEmpty } = global.$lodash;


const accountController = {
  login: async (req, res) => {
    const { accountname, password } = req.body;
    const result = await accountModel.find({ accountname });
    console.log(result);

    if (isEmpty(result)) {
      res.send({
        errcode: 404,
        msg: '用户不存在'
      });
     }
    if (result.password !== password) {
      res.send({
        errcode: 500,
        msg: '密码错误'
      });
    }
    const { uid, token, pid } = result;
    const user = {
      uid,
      token,
      pid,
      accountinfo: result,
    };
    res.send(user);
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
