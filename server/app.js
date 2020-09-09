/*
 * @Author: your name
 * @Date: 2020-05-18 15:05:58
 * @LastEditTime: 2020-09-09 16:14:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\app.js
 */
const express = require('express');
const app = express();

// 加载bodyparser模块，用来解析前端post方式提交过来的数据
const bodyparser = require('body-parser');
// 支持跨域
const cors = require('cors');
// 加载mongoose模块，这个中间件是nodejs与mongoDB数据库的桥梁
const mongoose = require('./mongodb/db');
const libs = require('./libs');
const jwtCheck = require('./middleware');

// 全局引用第三方依赖包
libs();
const router = require('./routes/index');
const {
  PORT
} = require('./config');

app.use(bodyparser.urlencoded({
  extended: true,
}));

app.use(cors());
// 请求体解析中间件，传递的参数为json格式，存放在body中
app.use(express.json());
app.use('/public', express.static(`${__dirname}/public`));
app.use('/uploads', express.static(`${__dirname}/uploads`));
app.all('*', (req, res, next) => {
  console.log(JSON.stringify(req.body));
  next();
});

mongoose(app);
router(app);
app.listen(PORT, () => {
  console.log(`server : http://localhost:${PORT}`);
});
