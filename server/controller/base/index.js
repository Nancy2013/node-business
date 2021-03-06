/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-10-14 16:59:07
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const Model = require('../../models')('base');
const {
  response
} = require('../../common/utils');

const controller = {

  // 查询
  get: async (req, res, next) => {
    const {
      limit,
      offset,
    } = req.body;
    const params = {};
    const totalSize = await Model.countDocuments(params);
    Model.find(params)
      .lean()
      .limit(limit)
      .skip(limit * (offset - 1))
      .sort({
        _id: 1
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
    Model.findById(params).then(result => {
      if (result) {
        const data = {
          data: result,
        };
        res.send(response(data));
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
};
module.exports = controller;
