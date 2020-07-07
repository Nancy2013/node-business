/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-07-07 20:01:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */
const baseModule = 'site';
const { response } = require('../../common/utils');
const Model = require('../../models')(baseModule);

const controller = {
  get: async (req, res, next) => {
    let params;
    const { offset, limit, name, provincial, urban, areas, id, order, seq } = req.body;
    if (id) {
      params.id = id;
     }

    if (name) {
      const reg = new RegExp(name, 'i'); // 不区分大小写
      params.name = { $regex: reg };
    }
    if (provincial) {
      params.provincial = provincial;
    }
    if (urban) {
      params.urban = urban;
    }
    if (areas) {
      params.areas = areas;
    }

    const totalSize = await Model.count(params);
    Model.find(params)
    .limit(limit)
    .skip(limit * (offset - 1))
    .sort({ [order]: seq })
    .then(result => {
      if (result) {
        const data = {
          [`${baseModule}Infos`]: result,
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
    const { id } = req.body;
    const params = { id };
    Model.findOne(params).then(result => {
      if (result) {
        const data = {
          [`${baseModule}s`]: result,
        };

        res.send(response(data));
      }
      console.log(JSON.stringify(result));
     }).catch(e => {
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
    const { id } = req.body;
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

