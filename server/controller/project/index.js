/*
 * @Author: your name
 * @Date: 2020-05-19 16:32:59
 * @LastEditTime: 2020-05-29 14:46:35
 * @LastEditors: Please set LastEditors
 * @Description: In project Settings Edit
 * @FilePath: \node-business\server\controller\project\index.js
 */

const Model = require('../../models')('project');

const controller = {
  get: async (req, res) => {
    console.log('getinfo');
   },
  getapk: async (req, res) => {
    console.log('getapk');
   },
};
module.exports = controller;
