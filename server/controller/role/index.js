/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-16 15:35:28
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const assert = require('http-assert');
const Model = require('../../models')('role');
const errorCode = require('../../common/error');

const controller = {
  // 查询
  get: async (req, res, next) => { },
  
  // 添加
  add: async (req, res, next) => { },
  
  // 修改
  mod: async (req, res, next) => {
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
  del: async (req, res, next) => {
    console.log('del');
  },
};
module.exports = controller;
