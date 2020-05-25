/*
 * @Author: your name
 * @Date: 2020-05-18 15:05:58
 * @LastEditTime: 2020-05-25 17:03:10
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

const router = require('./routes/index');

app.use(bodyparser.urlencoded({
    extended: true,
  }));

app.use(cors());
// 请求体解析中间件，传递的参数为json格式，存放在body中
app.use(express.json());
app.use('/public', express.static(`${__dirname}/public`));
app.all('*', (req, res, next) => {
  next();
});

router(app);
mongoose(app);

app.listen(3000, () => {
  console.log('server : http://localhost:3000');
});
