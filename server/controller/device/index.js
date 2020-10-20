/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-10-20 16:39:27
 * @LastEditors: Please set LastEditors
 * @Description: In project Settings Edit
 * @FilePath: \node-business\server\controller\project\index.js
 */
const {
  response
} = require('../../common/utils');
const Model = require('../../models')('device');
const ProductModel=require('../../models')('product');

const controller = {
  // 查询
  get: async (req, res, next) => {
    const {
      offset,
      limit,
      displayname,
      location,
      online,
      did,
      siteid,
      groupid,
      taskid,
      running,
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
    // 查询空闲设备
    if (siteid===-1) {
      params.siteid = null;
    }
    if (groupid) {
      params.groupid =groupid===-1?null:groupid;
    }
    if (taskid === -1) {
      params.taskid = null;
    }
    if (running) {
      params.running = running;
    }
    
    const totalSize = await Model.countDocuments(params);
    Model.find(params)
      .limit(limit)
      .skip(limit * (offset - 1))
      .sort({
        _id: 1
      })
      .then(result => {
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

  // 添加
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

  // 详情
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

  // 修改
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

  // 删除
  del: async (req, res,next) => {
    const {
      did
    } = req.params;
    const params = {
      did
    };
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },

  // 控制
  controls: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },

  // 查询控制日志
  getControlLogs: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },

  // 查询错误日志
  getErrorLogs: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },

  // 查询服务
  getDevServices: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },

  // 查询保修日志
  getRepairLogs: async (req, res,next) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(next);
  },
  
  // 查询产品属性
  getAttributes: async (req, res, next) => {
    const {productid}= req.body;
    const params = {
      pid:productid
    } 
    ProductModel.find(params)
      .lean()
      .then(result => {
      if (result) {
        const data = {
          attributes:result[0]?result[0].attributes:[],
        }

        res.send(response(data));
      }
    }).catch(next);
  },

  // 查询统计
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
