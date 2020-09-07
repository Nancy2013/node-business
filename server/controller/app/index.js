/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-09-07 15:17:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */
const {
  response
} = require('../../common/utils');
const {
  URL,
  PORT
} = require('./../../config');

const controller = {
  uploadPic: async (req, res, next) => {
    console.log(req.file);
    const {
      path
    } = req.file;
    const data = {
      url: URL + ':' + PORT + '/' + path.replace(/\\/g, '/')
    }
    res.send(response(data));
  },
};
module.exports = controller;
