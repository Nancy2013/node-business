/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-06-02 10:50:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */
const Model = require('../../models')('group');

const controller = {
  get: async (req, res) => {
    Model.find().then(result => { }).catch(e => {
      console.error(e);
    });
  },
  add: async (req, res) => {
    const params = req.body;
    Model.create(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  detail: async (req, res) => {
    const { id } = req.params;
    const params = { id };
    Model.find(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  mod: async (req, res) => {
    const { id } = req.params;
    const params = req.body;
    Model.findOneAndUpdate(id, params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  del: async (req, res) => {
    const { id } = req.params;
    const params = { id };
    Model.findOneAndDelete(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
};
module.exports = controller;

