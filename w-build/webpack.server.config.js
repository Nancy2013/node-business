/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-09-17 15:57:25
 * @LastEditors: Please set LastEditors
 */
const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfigFn = require('./webpack.dev.config');
const { build } = require('../w-config');

const { buildRoot } = build;

module.exports = () =>
  devConfigFn({ server: true }).then(config =>
    merge(config, {
      plugins: [new webpack.HotModuleReplacementPlugin()],
      devServer: {
        contentBase: resolve(buildRoot, '..'),
        hot: true,
        noInfo: true,
        stats: 'errors-only',
        open: true,
        openPage: `${build.extraPath}/index.html`,
        proxy: [
          {
            context: ['/v1'], // 路径前缀
            target: 'http://10.10.30.70:9989', // 服务器ip osim: http://10.10.30.70:8282 || 9889  定时联动：http://10.10.30.70:9989   aliyun: https://osimdev.ibroadlink.com
            changeOrigin: true,
            logLevel: 'debug',
          },
        ],
      },
    }));
