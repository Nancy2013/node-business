const shell = require('shelljs');

shell.cd('./server');
shell.exec('npm run nodemon');

shell.cd('../');
shell.exec('webpack-dev-server --config ./w-build/webpack.server.config.js');
