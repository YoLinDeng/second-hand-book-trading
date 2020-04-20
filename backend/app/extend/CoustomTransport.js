'use strict';

/**
 * @description: 用户日志操作函数
 */

const FileTransport = require('egg-logger').FileTransport;
const dayjs = require('dayjs');

class CoustomTransport extends FileTransport {
  constructor(options, ctx) {
    super(options);
    this.ctx = ctx;
  }

  log(level, args, meta) {
    const prefixStr = this.buildFormat(level);
    for (const i in args) {
      if (args.hasOwnProperty(i)) {
        if (parseInt(i, 10) === 0) {
          args[i] = `${prefixStr}${args[i]}`;
        }
        if (parseInt(i, 10) === args.length - 1) {
          args[i] += '\n';
        }
      }
    }

    super.log(level, args, meta);
  }

  buildFormat(level) {
    const timeStr = `[${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}]`;
    const urlStr = `[${this.ctx.request.url}]`;
    const reqBody = `[${JSON.stringify(this.ctx.request.body)}]`;
    return `${timeStr}${urlStr}${reqBody}`;
  }
}

module.exports = CoustomTransport;
