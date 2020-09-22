/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-09-22 15:50:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */


module.exports = function (baseModule) {
  const {
    response
  } = require('../../common/utils');
  const Model = require('../../models')(baseModule);
  const LocationModel = require('../../models')('location');

  // 添加修改数据
  const operateData = async function (req, res, params) {
    const {
      provincial,
      urban,
      areas
    } = req.body;

    const provincialParams = {
      type: baseModule === 'site' ? 1 : 2,
      parentId: '0',
      name: provincial,
    };
    let provincialExist, urbanExist, areasExist;

    // 添加省市区
    provincialExist = await LocationModel.findOne(provincialParams);
    console.log(JSON.stringify(provincialExist));
    if (!provincialExist) {
      provincialExist = await LocationModel.create(provincialParams)
    }
    const urbanParams = {
      parentId: provincialExist._id,
      name: urban,
      type: 3,
    };
    urbanExist = await LocationModel.findOne(urbanParams);
    if (!urbanExist) {
      urbanExist = await LocationModel.create(urbanParams);
    }
    const areasParams = {
      parentId: urbanExist._id,
      name: areas,
      type: 4,
    };
    areasExist = await LocationModel.findOne(areasParams);
    if (!areasExist) {
      areasExist = await LocationModel.create(areasParams);
    }
    params ? res.send(response(params)) : res.send(response());
  };

  // 查询地区
  const getLocation = async function (req, res, next, level) {
    const params = {
      ...req.body,
    };
    switch (level) {
      case 'provincial':
        // 省
        params.type = baseModule === 'site' ? 1 : 2;
        break;
      case 'urban':
        // 市
        params.type = 3;
        break;
      case 'areas':
        // 区
        params.type = 4;
        break;
    }

    const totalsize = await LocationModel.countDocuments(params);
    LocationModel.find(params).then(result => {
      if (result) {
        const data = {
          [`${level}s`]: result,
          totalsize,
        };
        res.send(response(data));
      }
    }).catch(next);
  };

  const controller = {
    get: async (req, res, next) => {
      let params = {};
      const {
        offset,
        limit,
        name,
        provincial,
        urban,
        areas,
        order,
        seq
      } = req.body;

      if (name) {
        const reg = new RegExp(name, 'i'); // 不区分大小写
        params.name = {
          $regex: reg
        };
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

      const totalSize = await Model.countDocuments(params);
      Model.find(params)
        .lean()
        .limit(limit)
        .skip(limit * (offset - 1))
        .sort({
          [order]: seq
        })
        .then(result => {
          if (result) {
            result.forEach(v => v.id = v._id);
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
      const params = {
        ...req.body,
      };
      if (baseModule === 'site') {
        params.devicecnt = 0;
        params.picurl = '';
        params.devicecnt = 0;
        params.checkcycle = 0;
      };
      Model.create(params).then(async result => {
        if (result) {
          operateData(req, res, params)
        }
      }).catch(e => {
        next(e);
      });
    },
    detail: async (req, res, next) => {
      const {
        id
      } = req.body;
      const params = id;
      Model.findById(params).then(result => {
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
      const conditions = {
        _id: req.body._id
      };
      const params = req.body;
      Model.findOneAndUpdate(conditions, params, {
        new: true
      }).then(async result => {
        if (result) {
          operateData(req, res)
        }
      }).catch(e => {
        next(e);
      });
    },
    del: async (req, res, next) => {
      const params = {
        _id: req.body[`${baseModule}ids`][0]
      };
      Model.findOneAndDelete(params).then(result => {
        if (result) {
          res.send(response());
        }
      }).catch(e => {
        next(e);
      });
    },
    getProvincial: async (req, res, next) => {
      getLocation(req, res, next, 'provincial');
    },
    getUrban: async (req, res, next) => {
      getLocation(req, res, next, 'urban');
    },
    getArea: async (req, res, next) => {
      getLocation(req, res, next, 'area');
    },
  };
  return controller;
};
