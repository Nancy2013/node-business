/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-10-12 17:53:52
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\controller\account\index.js
 */
const Model = require('../../models')('group');
const DeviceModel = require('../../models')('device');
const {
  response
} = require('../../common/utils');

// TODO
const sumDevice = function (allGroup,group) {
  allGroup.map(v => {
    if (v.parentgid === group.id) {
      group.devicenum = group.devicenum + sumDevice(allGroup, v).devicenum;
      }
  })
  
  return group;
};

const controller = {

  
  
  get: async (req, res, next) => {
    const {
      id
    } = req.body;
    let params = {};
    if (id != null) {
      params.parentgid = id;
    }
    let group;
    let allGroup = await Model.find();

    // 查询子分组
    Model.find(params)
      .lean()
      .then(result => {
        if (result) {
          const promises =
            result.map(v => {
              v.id = v._id
              const groupParams = {
                parentgid: v._id,
              }
              return Model.countDocuments(groupParams);
            })
          group = result
          return Promise.all(promises);
        }
      })
      .then(groupResult => {
        // 查询子节点
        if (groupResult) {
          group.map((v, index) => {
            v.isnode = groupResult[index] === 0 ? 0 : 1;
            v.devicenum=sumDevice(allGroup, v).devicenum;
          })
          const data = group;
          res.send(response(data));
        }
      })
      .catch(next);
  },

  // 查询
  // getAll: async (req, res, next) => {
  //   const {
  //     id,
  //   } = req.body;
  //   const params = {
  //     parentgid: id ? id : 0,
  //   };
  //   Model.find(params)
  //     .sort({
  //       _id: -1
  //     })
  //     .then(result => {
  //       result.map(v => v.id = v._id);
  //       if (result) {
  //         const data = result;
  //         res.send(response(data));
  //       }
  //     })
  //     .catch(next);
  // },

  // 添加
  add: async (req, res, next) => {
    const params = {
      ...req.body,
      createtime: new Date().toISOString(),
      devicenum: 0,
    }

    Model.create(params).then(result => {
      if (result) {
        params.id = result._id;
        res.send(response(params));
      }
    }).catch(next)
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
        res.send(response(result));
      }
    }).catch(next);
  },

  // 删除
  del: async (req, res, next) => {
    const params = {
      _id: req.body.id,
    };
    Model.findOneAndDelete(params).then(result => {
      if (result) {
        res.send(response());
      }
    }).catch(next);
  },

  // 查询组设备
  getDevice: async (req, res, next) => {
    const {
      offset,
      limit,
      id
    } = req.body;
    let params = {
      groupid: id,
    };
    const totalSize = await DeviceModel.countDocuments(params);
    DeviceModel.find(params)
      .lean()
      .limit(limit)
      .skip(limit * (offset - 1))
      .sort({
        _id: -1
      })
      .then(result => {
        if (result) {
          result.map(v => v.id = v._id);
          const data = {
            deviceInfos: result,
            totalsize: totalSize,
          };
          res.send(response(data));
        }
      }).catch(next);
  },

  // 修改组设备
  modDevice: async (req, res, next) => {
    const {
      flag,
      id,
      deviceids
    } = req.body;

    // 更新设备状态
    deviceids.map(async v => {
      const conditions = {
        did: v
      }
      const params = {
        groupid: flag === 'add' ? id : null, // 绑定或解绑设备
      };
      await DeviceModel.findOneAndUpdate(conditions, params, {
        new: true,
        upsert: true
      }).then(result => {

      }).catch(next)
    });

    // 更新分组设备数量
    const groupCnditions = {
      _id: id,
    }
    const {
      devicenum,
      parentgid,
    } = await Model.findById(id);
    const groupParams = {
      devicenum: flag === 'add' ? devicenum + deviceids.length : devicenum - deviceids.length,
    }
    Model.findOneAndUpdate(groupCnditions, groupParams, {
      new: true,
      upsert: true
    }).then(result => {
      if (result) {
        res.send(response());
      }
    }).catch(next);

  },
};
module.exports = controller;
