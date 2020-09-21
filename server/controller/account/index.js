/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-21 18:01:30
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const moment = require('moment');
const assert = require('http-assert');
const Model = require('../../models')('account');
const {
  PRIVATE_KEY,
  PID,
  FORMAT_TIME
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
          validtime,
          expiretime
        } = result;
        
        if (validtime&&expiretime) { 
          const noBefore = moment(moment(validtime).format(FORMAT_TIME)).isBefore(new Date(),'day');
          const expireIn = moment(moment(expiretime).format(FORMAT_TIME)).isAfter(new Date(),'day');
          console.log("noBefore:  ",noBefore,"expireIn: ",expireIn);
          
        assert(noBefore, errorCode.forbidden, '不在有效登录期限内');
        assert(expireIn, errorCode.forbidden, '不在有效登录期限内');
        }
        
        const {
          uid,
          _id,
          pid
        } = result;
        // 生成token,有效时长24小时
        const token = jwt.sign({
          id: String(_id)
        }, PRIVATE_KEY, {
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
  get: async (req, res, next) => {
    const {
      limit,
      offset,
      seq,
      displayname,
      roleid
    } = req.body;
    const params = {};
    if (displayname) {
      const reg = new RegExp(displayname, 'i'); // 不区分大小写
      params.displayname = {
        $regex: reg
      };
    }

    // 过滤安装工
    if (roleid) {
      params.roleid = roleid.indexOf('-') < 0 ? roleid : {
        $ne: roleid.replace('-', '')
      };
    }

    const totalSize = await Model.countDocuments(params);
    // 关联角色模型，关联字段是roleid,只返回rolename，默认返回_id
    Model.find(params)
      .populate('roleid', 'rolename')
      .lean()
      .limit(limit)
      .skip(limit * (offset - 1))
      .sort({
        _id: seq
      })
      .then(result => {
        if (result) {
          result.map(v => {
            v.id = v._id
            const {
              _id,
              rolename
            } = v.roleid;
            v.roleid = _id;
            v.rolename = rolename;
          });
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
  add: async (req, res, next) => {
    const params = {
      ...req.body,
      pid: PID,
      createtime: new Date().toISOString(),
      validtime: null,
      expiretime: null,
      token: '',
    };
    Model.create(params).then(result => {
      if (result) {
        res.send(response(params));
      }
    }).catch(next);
  },

  // 修改
  mod: async (req, res, next) => {
    const _id = req.body.id
    const conditions = {
      _id,
    };
    const {
      validtime,
      expiretime
    } = req.body;

    // 生成登录有效期
    const validToken = jwt.sign({
      id: String(_id),
      validtime,
      expiretime,
    }, PRIVATE_KEY);
    const params = {
      ...req.body,
      validToken,
    };
    Model.findOneAndUpdate(conditions, params, {
      new: true, // 返回修改后的数据
      upsert: true, // 如果数据不存在，则执行插入
    }).then(result => {
      if (result) {
        res.send(response(result));
      }
    }).catch(next);
  },

  // 删除
  del: async (req, res, next) => {
    const params = {
      _id: req.body.uid,
    };
    Model.findOneAndDelete(params).then(result => {
      if (result) {
        res.send(response());
      }
    }).catch(e => {
      next(e);
    });
  },
};
module.exports = controller;
