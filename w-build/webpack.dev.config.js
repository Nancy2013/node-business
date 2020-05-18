const webpack = require('webpack');
const merge = require('webpack-merge');
const rimraf = require('rimraf');
const baseConfigFn = require('./webpack.base.config');
const {
  dev,
  build: { distRoot },
} = require('../w-config');

module.exports = (env = {}) => {
  if (!env.server) {
    // remove
    rimraf.sync(distRoot);
  }

  return baseConfigFn().then(config =>
    merge(config, {
      output: {
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].bundle.js',
      },
      plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.EnvironmentPlugin({
          NODE_ENV: dev.env,
        }),
      ],
      devtool: '#cheap-module-eval-source-map',
  }));
};
