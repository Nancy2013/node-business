/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-09-04 14:10:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */

const multer = require('multer');

const upload = multer({
  dest: '../uploads/',
  limits: {
    //限制文件大小2M
    fileSize: 2*1024 * 1000,
    //限制文件数量
    files: 1
  },
  fileFilter: function (req, file, cb) {
    // 类型限制
    console.log(req.file);
    
    if (file.mimetype == 'image/png') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
});

module.exports = upload;

