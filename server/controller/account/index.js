/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-06-22 19:30:39
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const assert = require('http-assert');
const Model = require('../../models')('account');
const {
  response
} = require('../../common/utils');
const errorCode = require('../../common/error');

const {
  isEmpty
} = global.$lodash;

const controller = {
  login: async (req, res, next) => {
    let sendDatas;
    const {
      accountname,
      password
    } = req.body;
    Model.findOne({
        accountname
      })
      .then(result => {
        // assert(!isEmpty(result), errorCode.forbidden, '用户不存在');
        // assert(result.accountpwd === password, errorCode.forbidden, '密码错误');
        // if (isEmpty(result)) {
        //   sendDatas = response(null, errorCode.forbidden, '用户不存在');
        // } else if (result.accountpwd !== password) {
        //   sendDatas = response(null, errorCode.forbidden, '密码错误');
        // } else {
        //   const { uid, token, pid } = result;
        //   const data = {
        //     uid,
        //     token,
        //     pid,
        //     accountinfo: result,
        //   };
        //   sendDatas = response(data);
        // }

        const {
          uid,
          token,
          pid
        } = result;
        const data = {
          uid,
          token,
          pid,
          accountinfo: result,
        };
        sendDatas = response(data);
        res.send(sendDatas);
      });
  },
  logout: async (req, res) => {
    console.log('logout');
  },
  mod: async (req, res) => {
    const {
      id
    } = req.params;
    const params = req.body;
    const result = await Model.findOneAndUpdate(id, params);
    res.send({
      errcode: 200,
      msg: 'success',
    });
  },
  get: async (req, res) => {
    const result = await Model.find();
    res.send(result);
  },
  add: async (req, res) => {
    const params = req.body;
    const result = await Model.create(params);
    res.send(result);
  },
  del: async (req, res) => {
    console.log('del');
  },
};
module.exports = controller;
