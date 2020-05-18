const path = require('path');
const childProcess = require('child_process');

const pathAlais = process.platform === 'win32' ? 'Path' : 'PATH';

exports.getRunCmdEnv = function getRunCmdEnv() {
  const env = {};
  Object.keys(process.env).forEach((key) => {
    if (/^path$/i.test(key)) {
      env[pathAlais] = process.env[key];
    } else {
      env[key] = process.env[key];
    }
  });
  // make sure `antd-tools/node_modules/.bin` in the PATH env
  const nodeModulesBinDir = path.join(__dirname, '../node_modules/.bin');
  env[pathAlais] = env[pathAlais] ? `${nodeModulesBinDir}${path.delimiter}${env[pathAlais]}` : nodeModulesBinDir;
  return env;
};

exports.runCmd = function runCmd(cmd, _args, fn) {
  const args = _args || [];
  const runner = childProcess.spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
    env: exports.getRunCmdEnv()
  });

  return new Promise((resolve) => {
    runner.on('close', (code) => {
      if (fn) {
        fn(code);
      }
      resolve();
    });
  });
};

exports.getNPM = function getNPM() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
};
