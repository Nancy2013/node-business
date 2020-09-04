/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-09-04 15:37:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */
const {
  response
} = require('../../common/utils');

const controller = {
  uploadPic: async (req, res, next) => {
    console.log(req.file);
    const { path } = req.file;
    const data = {
      url: path.replace(/\\/g,'/')
    }
    res.send(response(data));
  },
};
module.exports = controller;

