/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-05-27 15:10:21
 * @LastEditors: Please set LastEditors
 * @Description: In project Settings Edit
 * @FilePath: \node-business\server\controller\project\index.js
 */

const projectModel = require('../../models/project');

const project = {
  getinfo: async (req, res) => {
    console.log('getinfo');
   },
  getapk: async (req, res) => {
    console.log('getapk');
   },
};
module.exports = project;
