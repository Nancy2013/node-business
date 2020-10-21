/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-10-21 15:30:16
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const Model = require('../../models')('timeLinkage');
const {
  response
} = require('../../common/utils');

const controller = {

  // 查询
  get: async (req, res, next) => {
    const {
      type,
      limit,
      offset,
      seq,
    } = req.body;
    const params = {
      type,
    };
    const totalSize = await Model.countDocuments(params);
    Model.find(params)
      .lean()
      .limit(limit)
      .skip(limit * (offset - 1))
      .sort({
        _id: seq
      })
      .then(result => {
        result.map(v => v.id = v._id);
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
  add: async (req, res, next) => {
    const params = {
      ...req.body,
      enable:1,
      createtime: new Date().toISOString(),
    }
    Model.create(params).then(result => {
      if (result) {
        res.send(response(params));
      }
    }).catch(next)
  },

  // 详情
  detail: async (req, res, next) => {
    const {
      id
    } = req.body;
    const params = id;
    Model.findById(params)
      .populate('sceneids', 'name')
      .lean()
      .then(result => {
        if (result) {
          result.linktasks = result.sceneids;
          res.send(response(result));
      }
    }).catch(next);
  },

  // 修改
  mod: async (req, res, next) => {
    const conditions = {
      _id: req.body._id
    };
    const params = req.body;
    Model.findOneAndUpdate(conditions, params, {new:true,upsert:true}).then(result => {
      if (result) {
        res.send(response(params));
      }
    }).catch(next);
  },

  // 删除
  del: async (req, res, next) => {
    const params = {
      _id: req.body.id,
    };
    Model.findOneAndDelete(params).then(result => {
      if (result) {
        res.send(response());
      }
    }).catch(next);
  },
  
  // 执行
  trigger:async (req, res, next) => {
    const {
      id
    } = req.body;
    const params = id;
    Model.findById(params).then(result => {
      if (result) { 
        const data = {
          result: 1
        }
        res.send(response(data));
      }
    }).catch(next);
  },
};
module.exports = controller;
