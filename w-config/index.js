/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-15 13:37:28
 * @LastEditors: Please set LastEditors
 */
const path = require('path');

const extraPath = ''; // ./ | web
const publicPath = '.';
const distRoot = path.resolve(__dirname, '../dist');
module.exports = {
  build: {
    env: 'production',
    distRoot,
    buildRoot: path.resolve(distRoot, extraPath),
    extraPath,
    browserslist: ['>= 5%', 'last 2 versions', 'ie >=9'],
    vueModule: 'vue/dist/vue.esm.js',
    publicPath: !publicPath && !extraPath ? '' : `${publicPath}${extraPath ? '/' : ''}${extraPath}`,
  },
  dev: {
    env: 'development',
    showEslintErrorsInOverlay: false,
    useEslint: false,
  },
};
