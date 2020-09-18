/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/*
 * @Author: your name
 * @Date: 2020-05-18 15:37:39
 * @LastEditTime: 2020-09-18 15:37:29
 * @LastEditors: Please set LastEditors
 * @Description: In account Settings Edit
 * @FilePath: \node-business\server\views\index.js
 */
const mongoose = require('mongoose');
const inflection = require('inflection');

module.exports = (resource) => {
  const modelName = inflection.classify(resource); // 将下划线转变为大写字母风格
  const model = mongoose.model(`${modelName}`, require(`../schemas/${resource}`));
  return model;
};
