/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-09-10 15:04:31
 * @LastEditors: Please set LastEditors
 * @Description: In project Settings Edit
 * @FilePath: \node-business\server\controller\project\index.js
 */
const {
  response
} = require('../../common/utils');
const Model = require('../../models')('device');

const controller = {
  get: async (req, res) => {
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
  add: async (req, res) => {
    const params = req.body;
    Model.create(params).then(result => {
      console.log(JSON.stringify(result));
    }).catch(e => {
      console.error(e);
    });
  },
  detail: async (req, res) => {
    const {
      did
    } = req.params;
    const params = {
      did
    };
    Model.findOne(params).then(result => {
      const data = {
        deviceInfos: result,
      };
      req.send(response(data));
    }).catch(e => {
      console.error(e);
    });
  },
  mod: async (req, res) => {
    const {
      did
    } = req.params;
    const conditions = {
      did
    };
    const params = req.body;
    Model.findOneAndUpdate(conditions, params).then(result => {}).catch(e => {
      console.error(e);
    });
  },
  del: async (req, res) => {
    const {
      did
    } = req.params;
    const params = {
      did
    };
    Model.findOneAndDelete(params).then(result => {}).catch(e => {
      console.error(e);
    });
  },
  controls: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(e => {
      console.error(e);
    });
  },
  getControlLogs: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(e => {
      console.error(e);
    });
  },
  getErrorLogs: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(e => {
      console.error(e);
    });
  },
  getDevServices: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(e => {
      console.error(e);
    });
  },
  getRepairLogs: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(e => {
      console.error(e);
    });
  },
  getAttributes: async (req, res) => {
    const params = req.body;
    Model.findOneAndDelete(params).then(result => {}).catch(e => {
      console.error(e);
    });
  },
};
module.exports = controller;
