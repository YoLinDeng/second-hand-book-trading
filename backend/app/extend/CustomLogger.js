'use strict';

/**
 * @description: 用户日志操作函数
 */

const Logger = require('egg-logger').Logger;
const CoustomTransport = require('./CoustomTransport.js');
const dayjs = require('dayjs');

module.exports = function(ctx) {
  const logger = new Logger();
  logger.set('file', new CoustomTransport({
    level: 'INFO',
    file: `userlogs/app.log.${dayjs().format('YYYY-MM-DD')}`,
  }, ctx));
  return logger;
};
