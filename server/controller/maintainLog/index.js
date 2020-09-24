/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-24 17:30:53
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const moment = require('moment');
const Model = require('../../models')('maintainLog');
const {
  response
} = require('../../common/utils');

const controller = {

  // 查询
  get: async (req, res, next) => {
    const {
      limit,
      offset,
      seq,
      starttime,
      endtime,
    } = req.body;
    const params = {};
    //  TODO 时间筛选
    if (starttime&&endtime) { 
      params.createtime = { $gte: moment(starttime).toISOString(), $lte: moment(endtime).endOf('day').toISOString() };
    }
    const totalSize = await Model.countDocuments(params);
    Model.find(params)
      .lean()
      .limit(limit)
      .skip(limit * (offset - 1))
      .sort({
        _id: seq
      })
      .then(result => {
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
};
module.exports = controller;
