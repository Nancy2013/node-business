const webpack = require('webpack');
const merge = require('webpack-merge');
const rimraf = require('rimraf');
const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const baseConfigFn = require('./webpack.base.config');

const dllConfig = require('./dll.config');
const {
  build: {
    distRoot, buildRoot, env, publicPath
  },
} = require('../w-config');
const { readVendorManifest } = require('./utils');

module.exports = () => {
  // remove
  rimraf.sync(distRoot);

  const promise = new Promise((resolve, reject) => {
    webpack(dllConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        reject(err);
        return;
      }
      resolve();
      console.log('dll compile done!');
    });
  });
  return promise.then(() => {
    const vendorManifestPath = path.resolve(buildRoot, 'dll/vendor-manifest.json');
    const vendorManifest = readVendorManifest(vendorManifestPath);
    return baseConfigFn().then(config =>
      merge(config, {
        plugins: [
          new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: vendorManifest,
          }),
          new webpack.EnvironmentPlugin({
            NODE_ENV: env,
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              drop_console: true
            },
          }),
          new AddAssetHtmlPlugin([
            {
              filepath: path.resolve(buildRoot, 'dll/*.js'),
              includeSourcemap: false,
              publicPath: `${publicPath}/dll`,
              outputPath: 'dll',
            },
          ]),
        ],
    }));
  });
};
