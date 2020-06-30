/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-06-30 19:48:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */
const { response } = require('../../common/utils');
const Model = require('../../models')('site');

const controller = {
  get: async (req, res, next) => {
    const params = {
      ...req.body,
    };
    for (const key in params) {
      if (params[key] == '') { delete params[key]; }
    }
    // const { offset, limit, name, provincial, urban, areas, id, order, seq } = req.body;
    const { limit, offset, seq } = req.body;
    console.log(JSON.stringify(params));

    const totalSize = await Model.count(params);
    Model.find(params)
    .limit(limit)
    .skip(limit * (offset - 1))
    .sort({ id: seq })
    .then(result => {
      if (result) {
        const data = {
          siteInfos: result,
          totalsize: totalSize,
        };
        res.send(response(data));
       }
    })
.catch(e => {
      next(e);
    });
  },
  add: async (req, res, next) => {
    const params = req.body;
    Model.create(params).then(result => {
      if (result) {
        const data = {
          ...params
        };
        res.send(response(data));
      }
     }).catch(e => {
      next(e);
    });
  },
  detail: async (req, res, next) => {
    const { id } = req.params;
    const params = { id };
    Model.find(params).then(result => { }).catch(e => {
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
  getProvincial: async (req, res, next) => { },
  getUrban: async (req, res, next) => { },
  getArea: async (req, res, next) => { },

};
module.exports = controller;

