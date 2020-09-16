/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-16 16:19:27
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const assert = require('http-assert');
const Model = require('../../models')('account');
const {
  SECRET,
  PID
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
          expiresIn: 60 * 60 * 24
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
  logout: async (req, res, next) => {
    res.send(response(null));
  },
 
  // 查询
  get: async (req, res) => {
    const { limit, offset, seq, displayname, roleid } = req.body;
    const params = {};
    if (displayname) {
      const reg = new RegExp(displayname, 'i'); // 不区分大小写
      params.displayname = {
        $regex: reg
      };
    }
    if (roleid) { 
      params.roleid = roleid;
    }
    const totalSize = await Model.countDocuments(params);
    Model.find(params)
      .limit(limit)
      .skip(limit * (offset - 1))
      .sort({
        _id: seq
      })
      .then(result => {
        console.log(result);
        if (result) {
          const data = {
            alist: result,
            totalsize: totalSize,
          };
          res.send(response(data));
        }
      })
      .catch(next);
  },
  
  // 添加
  add: async (req, res,next) => {
    const params = {
      ...req.body,
      token: '',
      pid: PID,
      rolename: '',
      createtime: new Date().toISOString(),
      validtime: null,
      expiretime:null,
    };
    Model.create(params).then(result => { 
      if (result) { 
        res.send(response(params));
      }
    }).catch(next);
  },

  // 修改
  mod: async (req, res,next) => {
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

  // 删除
  del: async (req, res,next) => {
    console.log('del');
  },
};
module.exports = controller;
