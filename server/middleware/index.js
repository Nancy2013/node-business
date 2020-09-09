/*
 * @Author: your name
 * @Date: 2020-05-20 15:10:23
 * @LastEditTime: 2020-09-09 10:17:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\controller\app\index.js
 */
const fs = require('fs');
const files = fs.readdirSync(`${__dirname}`).filter(v => v !== 'index.js').map(v => v.slice(0, v.length - 3));
const middleware = {};
files.map(v => {
  middleware[v]=require(`./${v}`)
})
module.exports = middleware;

