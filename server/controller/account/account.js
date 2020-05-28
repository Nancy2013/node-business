/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-05-28 17:58:56
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */

const accountModel = require('../../models/account');
const { response } = require('../../common/utils');
const errorCode = require('../../common/error');

const {
  isEmpty
} = global.$lodash;


const accountController = {
  login: async (req, res) => {
    let sendDatas;
    const { accountname, password } = req.body;
    accountModel.find({ accountname }).then(result => {
      if (isEmpty(result)) {
        sendDatas = response(null, errorCode.forbidden, '用户不存在');
      } else if (result[0].accountpwd !== password) {
        sendDatas = response(null, errorCode.forbidden, '密码错误');
      } else {
        const { uid, token, pid } = result[0];
        const data = {
          uid,
          token,
          pid,
          accountinfo: result,
        };
        sendDatas = response(data);
      }
      res.send(sendDatas);
    }).catch(e => {
      console.error(e);
    });
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
    const {
      _id
    } = req.params;
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
