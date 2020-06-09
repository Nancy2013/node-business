/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-06-09 11:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In project Settings Edit
 * @FilePath: \node-business\server\controller\project\index.js
 */

const Model = require('../../models')('device');

const controller = {
  get: async (req, res) => {
    const { offset, limit } = req.body;
    const params = {
      limit,
    };
    Model.find(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  add: async (req, res) => {
    const params = req.body;
    Model.create(params).then(result => {

    }).catch(e => {
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
  controls: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  getControlLogs: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  getErrorLogs: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  getDevServices: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  getRepairLogs: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
  getAttributes: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => { }).catch(e => {
      console.error(e);
    });
  },
};
module.exports = controller;
