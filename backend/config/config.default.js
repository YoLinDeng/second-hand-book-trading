/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
// 环境变量
const prod = process.env.npm_config_server_prod;

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
  };
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573788543380_1877';

  // add your middleware config here
  config.middleware = ['errorHandler']

  config.static = {
    prefix: '/static', 
    dir: path.join(appInfo.baseDir, 'app/public'), 
    maxAge: 31536000,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      csrf: {
        enable: false,
      },
    },
    mongoose: {
      client: {
        url: prod ? '' : 'mongodb://127.0.0.1:27017/book',
        options: {
          useUnifiedTopology: true
        },
      },
    },
    msg: require('./config.msg.js'),
    errorHandler: {
      match: '/api',
    },
    jwt: {
      secret: config.keys,
    },
    // redis: {
    //   client: {
    //     port: 6379,
    //     host: '127.0.0.1',
    //     password: prod ? 'aresdads&1232&sfddsfsf&fds3235' : 'sdfsdfefr34&&FDhg23&sdffsdadsd233',
    //     // password: '',
    //     db: 0,
    //   },
    // },
  };

  return {
    ...config,
    ...userConfig,
  };
};
