/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-28 16:12:16
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const Model = require('../../models')('task');
const DeviceModel = require('../../models')('device');
const {
  response
} = require('../../common/utils');

const controller = {

  // 查询
  get: async (req, res, next) => {
    const {
      limit,
      offset,
      seq,
      taskname,
      worker,
      status,
    } = req.body;
    const params = {};
    // 条件查询
    if (taskname) {
      const reg = new RegExp(taskname, 'i'); // 不区分大小写
      params.taskname = {
        $regex: reg
      };
    }
    if (worker) {
      params.worker = worker;
    }
    if (status) {
      params.status = status;
    }

    const totalSize = await Model.countDocuments(params);
    Model.aggregate([ // 聚合查询
        {
          $match: {
            ...params
          }
        },
        {
          $lookup: {
            from: "accounts", // 数据库中集合名称
            localField: 'worker', // 内部查找字段
            foreignField: 'accountname', // 外部关联字段
            as: 'workerInfo', // 查询结果存储字段
          },
        },
      ])
      .skip(limit * (offset - 1)) // aggregate方法中，skip需要早于limit，否则后面查询不到数据
      .limit(limit)
      .sort({
        _id: seq
      })
      .then(result => {
        result.map(v => {
          v.id = v._id;
          v.worker = v.workerInfo[0] ? v.workerInfo[0].worker : ''
          v.workname = v.workerInfo[0] ? v.workerInfo[0].displayname : '';
        });
        if (result) {
          const data = {
            tasks: result,
            totalsize: totalSize,
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
      count: 0,
      status: '0',
      createtime: new Date().toISOString(),
    }

    Model.create(params).then( result => {
      if (result) {
        const { _id, devices } = result;
        // 绑定故障设备
        if (devices && devices.length > 0) {
          const deviceParams = {
            taskid:_id,
          }

          devices.map(async v => {
            const conditions = {
              _id:v._id,
            }
            await DeviceModel.findByIdAndUpdate(conditions, deviceParams).then(deviceResult => {})
          })
        } 

        res.send(response(result));
      }
    }).catch(next)
  },

  // 详情
  detail: async (req, res, next) => {
    const {
      id
    } = req.body;
    const params = id;
    Model.findById(params)
      .populate('devices')
      .then(result => {
        if (result) {
          console.log(JSON.stringify(result));
          const data = {
            taskInfos: result,
          };
          res.send(response(data));
        }
      }).catch(next);
  },

  // 修改
  mod: async (req, res, next) => {
    const conditions = {
      _id: req.body._id
    };
    const params = req.body;
    Model.findOneAndUpdate(conditions, params, {
      new: true,
      upsert: true
    }).then(result => {
      if (result) {
        res.send(response(params));
      }
    }).catch(next);
  },

  // 删除
  del: async (req, res, next) => {
    const {id,devices } = req.body;
    const params = {
      _id:id,
    };
    Model.findOneAndDelete(params).then(result => {
      if (result) {
        // 释放故障设备
        if (devices && devices.length > 0) {
          const deviceParams = {
            taskid:null,
          }
          devices.map(async v => {
            const conditions = {
              _id:v._id,
            }
            await DeviceModel.findByIdAndUpdate(conditions, deviceParams).then(deviceResult => {})
          })
        }
        res.send(response());
      }
    }).catch(next);
  },
};
module.exports = controller;
