const path = require('path');
const {
  build
} = require('../w-config');

const srcRoot = path.resolve(__dirname, '../src');

module.exports = () => ({
  vue$: build.vueModule,
  '@': srcRoot,
  configPath: '@/config',
  commonPath: '@/common',
  componentsPath: '@/components',
  filterPath: '@/filter',
  routerPath: '@/router',
  stylesPath: '@/styles',
  storePath: '@/store',
  viewsPath: '@/views',
  servicePath: '@/service'
});
