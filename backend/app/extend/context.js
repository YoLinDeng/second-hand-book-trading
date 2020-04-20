'use strict';

/**
 * @description: Context对象扩展
 */

const CustomLogger = require('./CustomLogger');
module.exports = {
  /* 用户操作日志 */
  get swLog() {
    return CustomLogger(this);
  },
};
