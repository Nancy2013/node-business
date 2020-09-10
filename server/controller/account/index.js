/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-10 14:50:10
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const assert = require('http-assert');
const Model = require('../../models')('account');
const {
  SECRET
} = require('../../config');
const jwt = require('jsonwebtoken');
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
        assert(!isEmpty(result), errorCode.forbidden, '用户不存在');
        assert(result.accountpwd === password, errorCode.forbidden, '密码错误');
        const {
          uid,
          _id,
          pid
        } = result;
        // 生成token,有效时长24小时
        const token = jwt.sign({
          id: String(_id)
        }, SECRET, {
          expiresIn: 60 * 60
        })
        const data = {
          uid,
          token,
          pid,
          accountinfo: result,
        };
        sendDatas = response(data);
        res.send(sendDatas);
      }).catch(next);
  },
  logout: async (req, res) => {
    console.log('logout');
  },
  mod: async (req, res) => {
    const conditions = {
      _id: req.params.id
    }
    const params = req.body;
    const result = await Model.findOneAndUpdate(conditions, params);
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
