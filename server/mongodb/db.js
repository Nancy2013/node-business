/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-05-20 13:54:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
import mongoose from 'mongoose';

module.exports = app => {
  mongoose.Promise = global.Promise;
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
};
