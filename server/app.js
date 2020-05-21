/*
 * @Author: your name
 * @Date: 2020-05-18 15:05:58
 * @LastEditTime: 2020-05-21 15:45:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\app.js
 */
const express = require('express');

const app = express();
// 加载mongoose模块，这个中间件是nodejs与mongoDB数据库的桥梁
const mongoose = require('mongoose');
// 加载bodyparser模块，用来解析前端post方式提交过来的数据
const bodyparser = require('body-parser');
const router = require('./routes/index');

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use('/public', express.static(`${__dirname}/public`));

app.all('*', (req, res, next) => {
  res.send('Hello node');
  next();
});

router(app);

app.listen(3000, () => {
  console.log('server : http://localhost:3000');
});

mongoose.connect('mongodb://localhost:27017/business', {
  useCreateIndex: true,
  useNewUrlParser: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Mongo Connected');
  app.listen(8888);
});
db.on('error', console.error.bind(console, 'Mongoose Connection Error'));
