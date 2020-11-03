/*
 * @Author: your name
 * @Date: 2020-10-28 16:39:34
 * @LastEditTime: 2020-11-03 17:59:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-business\server\ecosystem.config.js
 */
module.exports = {
  apps: [{
    name: "node-business", // 应用名称
    script: 'index.js',
    watch: '.',
    "env_production": { // 生产环境变量
      "NODE_ENV": "production"
    }
  }],

  deploy : {
    production: {
      user : 'root',
      host: '10.10.30.70',
      port: "22", // 端口
      ref  : 'origin/master',
      repo : 'git@github.com:Nancy2013/node-business.git',
      path: '/volume/nginx2/html/node/node-business',
      "ssh_options": "StrictHostKeyChecking=no",
      // 'pre-setup': "ssh -t remotehost 'sudo apt-get install git'",
      "post-setup": "ls -la",
      'pre-deploy-local': "echo 'This is a local executed command'",
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
