/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-09-11 15:54:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */
const { createFolder }= require('../common/utils');
const path = require('path');
const multer = require('multer');

const uploadFolder = 'uploads/pic/sitelocation';
const folder=path.join(uploadFolder);
createFolder(folder);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    console.log(file);
    const {
      originalname
    } = file;
    const name = originalname.slice(0, originalname.indexOf('.'))
    const ext = originalname.slice(originalname.indexOf('.'), originalname.length);
    const filename = name + Date.now() + ext;
    cb(null, filename)
  },
  // TODO上传图片错误处理
  onError: function (err, next) {
    console.log('error', err);
    next(err);
  }
});
const uploadPic = multer({
  storage,
  limits: {
    //限制文件大小2M
    fileSize: 2 * 1024 * 1000,
    //限制文件数量
    files: 1
  },
  fileFilter: function (req, file, cb) {
    // 类型限制
    const types = ['image/png', 'image/jpeg'];
    const isType = types.includes(file.mimetype);

    if (isType) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
});


module.exports = uploadPic;
