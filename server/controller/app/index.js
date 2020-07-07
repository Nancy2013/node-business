/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-07-07 19:29:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */
const Model = require('../../models')('model');

const controller = {
  get: async (req, res, next) => {
    Model.find().then(result => { }).catch(e => {
      next(e);
    });
  },
  add: async (req, res, next) => {
    const params = req.body;
    Model.create(params).then(result => { }).catch(e => {
      next(e);
    });
  },
  detail: async (req, res, next) => {
    const { id } = req.params;
    const params = { id };
    Model.findOneAndRemove(params).then(result => { }).catch(e => {
      next(e);
    });
  },
  mod: async (req, res, next) => {
    const { id } = req.params;
    const params = req.body;
    Model.findOneAndUpdate(id, params).then(result => { }).catch(e => {
      next(e);
    });
  },
  del: async (req, res, next) => {
    const { id } = req.params;
    const params = { id };
    Model.findOneAndDelete(params).then(result => { }).catch(e => {
      next(e);
    });
  },
};
module.exports = controller;

