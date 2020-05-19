/*
 * @Author: your name
 * @Date: 2020-05-18 15:05:58
 * @LastEditTime: 2020-05-19 15:37:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\app.js
 */
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello node');
});

app.listen(3000, () => {
  console.log('server : http://localhost:3000');
});
