/*
 * @Author: your name
 * @Date: 2020-05-28 15:09:03
 * @LastEditTime: 2020-09-08 13:46:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\common\ultis.js
 */
const fs = require('fs');
const path = require('path');

/**
 *请求返回
 *
 * @param {*} data 数据
 * @param {number} [errcode=200] 返回码
 * @param {string} [msg='success'] 返回信息
 * @returns
 */
function response(data, errcode = 200, msg = 'success') {
  let datas = {
    errcode,
    msg
  };
  if (data) {
    datas = {
      ...datas,
      data,
    };
  }
  console.log(datas);

  return datas;
}

/**
 *创建文件夹
 *
 * @param {*} folder 文件夹路径
 * @param {*} cb 回调函数
 */
function createFolder(folder, cb) {
  if (!fs.existsSync(folder)) {
    fs.mkdir(folder, {
      recursive: true
    }, (err) => {
      if (err) throw err;
    });
  } 
  cb && cb();;
};

module.exports = {
  response,
  createFolder,
};
