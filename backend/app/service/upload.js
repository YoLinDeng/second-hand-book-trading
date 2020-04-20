'use strict';

/**
 * @description: 上传图片相关Service
 */

const Service = require('egg').Service;
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const mkdir = require('../utils/mkdirs');
const sendToWormhole = require('stream-wormhole');

module.exports = app => {
  class UploadService extends Service {
    /**
     * 上传图片
     * @param  {Object} ctx 上下文对象
     */
    async saveByPipe(ctx) {
      const stream = await ctx.getFileStream();
      const { phone } = stream.fields;
      const filePath = `book-file/${dayjs().format('YYYY/MM/DD')}`;
      const filename = `${dayjs().unix()}${path.extname(stream.filename)}`;
      const basePath = path.join(__dirname, '../public', filePath);
      await mkdir(basePath);
      const local_url = path.join(filePath, filename);
      const target = path.join(basePath, filename);
      const writeStream = fs.createWriteStream(target);
      try {
        /* 写入文件 */
        await stream.pipe(writeStream);
      } catch (err) {
        /* 必须将上传的文件流消费掉 */
        sendToWormhole(stream);
        throw err;
      }
      return {
        path: local_url.replace(/\\/g,"/"),
        phone,
      }
    }
  }
  return UploadService;
};