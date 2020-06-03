/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-06-03 09:29:54
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');
const inflection = require('inflection');

module.exports = (resource) => {
  const modelName = inflection.classify(resource);
  const model = mongoose.model(`${resource}`, require(`../schemas/${resource}`));
  return model;
};
