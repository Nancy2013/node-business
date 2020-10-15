/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-10-15 14:45:27
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const Model = require('../../models')('product');
const {
  response
} = require('../../common/utils');

const controller = {

  // 查询
  get: async (req, res, next) => {
    const params = {};
    const totalSize = await Model.countDocuments(params);
    Model.find(params)
      .lean()
      .sort({
        _id: 1
      })
      .then(result => {
        result.map(v => v.id = v._id);
        if (result) {
          const data = {
            productsinfo: result,
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
};
module.exports = controller;
