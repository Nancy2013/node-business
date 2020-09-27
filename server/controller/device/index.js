/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-27 17:56:29
 * @LastEditors: Please set LastEditors
 * @Description: In project Settings Edit
 * @FilePath: \node-business\server\controller\project\index.js
 */
const {
  response
} = require('../../common/utils');
const Model = require('../../models')('device');

const controller = {
  // TODO 查询任务故障设备过滤
  get: async (req, res,next) => {
    const {
      offset,
      limit,
      displayname,
      location,
      online,
      did,
      seq
    } = req.body;

    const params = {};
    // 条件查询
    if (displayname) {
      const reg = new RegExp(displayname, 'i'); // 不区分大小写
      params.displayname = {
        $regex: reg
      };
    }
    if (location) {
      const reg = new RegExp(location, 'i'); // 不区分大小写
      params.location = {
        $regex: reg
      };
    }
    if (online) {
      params.online = online;
    }
    if (did) {
      params.did = did;
    }
    const totalSize = await Model.countDocuments(params);
    Model.find(params)
      .limit(limit)
      .skip(limit * (offset - 1))
      .sort({
        _id: seq
      })
      .then(result => {
        console.log(result);
        if (result) {
          const data = {
            deviceInfos: result,
            totalsize: totalSize,
          };
          res.send(response(data));
        }
      })
      .catch(next);
  },
  add: async (req, res,next) => {
    const params = {
      ...req.body,
      createtime: new Date().toISOString(),
    };
    Model.create(params).then(result => {
      if (result) { 
        res.send(response(result));
      }
    }).catch(next);
  },
  detail: async (req, res,next) => {
    const {
      did
    } = req.params;
    const params = {
      did
    };
    Model.findOne(params)
      .then(result => {
        if (result) {
          const data = {
            deviceInfos: result,
          };
          req.send(response(data));
        }
      
    }).catch(next);
  },
  mod: async (req, res,next) => {
    const {
      did
    } = req.params;
    const conditions = {
      did
    };
    const params = req.body;
    Model.findOneAndUpdate(conditions, params).then(result => {}).catch(next);
  },
  del: async (req, res,next) => {
    const {
      did
    } = req.params;
    const params = {
      did
    };
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },
  controls: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },
  getControlLogs: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },
  getErrorLogs: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },
  getDevServices: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },
  getRepairLogs: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },
  getAttributes: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },
  getStatistics: async (req, res, next) => { 
    const { running } = req.body
    const params = {
      running,
    }
    const totalSize = await Model.countDocuments();
    Model.find(params).then(result => { 
      if (result) { 
        const data = {
          count:result.length,
          totalsize:totalSize,
        }

        res.send(response(data))
      }
    }).catch(next)
  }
};
module.exports = controller;
