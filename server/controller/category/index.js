/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-10-14 17:03:36
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const Model = require('../../models')('category');
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
    const params = req.body;

    Model.create(params).then(result => {
      if (result) {
        res.send(response(params));
      }
    }).catch(next)
  },
};
module.exports = controller;
