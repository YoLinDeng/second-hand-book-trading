'use strict';

/**
 * @description: 异步自动创建路径
 */

const fs = require('fs');
const path = require('path');

class Mkdir {
  constructor() {}

  /**
     * 获取路径Stat
     * 参考NodeJS官方文档 或者 linux Stat 相关资料
     * https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_class_fs_stats
     * @param {string} loadpath 读取路径
     */
  getStat(loadpath) {
    return new Promise((resolve, reject) => {
      fs.stat(loadpath, (err, stats) => {
        if (err) {
          resolve(false);
        } else {
          resolve(stats);
        }
      });
    });
  }

  /**
     * 创建文件夹
     * @param {string} dir 要创建的文件夹
     */
  mkdir(dir) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
     * 开始处理一个路径
     * 如果发现路径不存在，判断上一级是否存在
     * 如果上一级不存在继续往上一级判断，直到路径存在，开始一层层的反向创建路径
     * 创建成功return true
     * 创建失败return false
     * 如果路径是一个非文件夹的内容，返回 false
     *
     * @return {Boolean}
     */
  async start(dir) {
    const tplPathStat = await this.getStat(dir);
    if (tplPathStat && tplPathStat.isDirectory()) {
      return true;
    } else if (tplPathStat) {
      return false;
    }

    const pathinfo = path.parse(dir);
    const status = await this.start(pathinfo.dir);
    let mkdirStatus;
    if (status) {
      mkdirStatus = await this.mkdir(dir);
    }
    return mkdirStatus && status;
  }
}

const mkdir = new Mkdir();

exports = module.exports = dir => mkdir.start(dir);
