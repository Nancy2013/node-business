/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-06-09 19:54:28
 * @LastEditors: Please set LastEditors
 * @Description: In project Settings Edit
 * @FilePath: \node-business\server\controller\project\index.js
 */
const { response } = require('../../common/utils');
const Model = require('../../models')('device');

const controller = {
  get: async (req, res) => {
    const { offset, limit, displayname, location, online, seq } = req.body;
    const params = {};
    Model.find(params).limit(limit).skip(limit * (offset - 1)).then(result => {
      console.log(result);
      if (result) {
        const data = {
          deviceInfos: result,
          totalsize: 100
        };
        res.send(response(data));
      }
    })
.catch(e => {
      console.error(e);
    });
  },
  add: async (req, res) => {
    const params = req.body;
    Model.create(params).then(result => {
        console.log(JSON.stringify(result));
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
