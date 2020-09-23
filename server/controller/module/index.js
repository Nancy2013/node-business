/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-23 14:43:19
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const Model = require('../../models')('module');
const {
  response
} = require('../../common/utils');

const controller = {
  
  // 查询
  get: async (req, res, next) => { 
    Model.find().lean()
      .then(result => {
        if (result) {
          result.map(v=>v.id=v._id);
          const data = {
            alist: result,
            totalsize: result.length,
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
        res.send(params);
      }
     }).catch(next);
   },
  
  // 修改
  mod: async (req, res, next) => {},

  // 删除
  del: async (req, res, next) => { },
};
module.exports = controller;
