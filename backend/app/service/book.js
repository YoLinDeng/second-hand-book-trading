'use strict';

/**
 * @description: 用户相关Service
 */
const Service = require('egg').Service;
const dayjs = require('dayjs');
const mongoose = require('mongoose');
var http = require('http');

module.exports = app => {
  class BookService extends Service {
    /**
     * 发布书籍
     * @param  {Object} data 请求拿到的数据包括描述、书籍图片数组、价格、书籍分类id、发布者id
     */
    async publishBook(data) {
      const { desc, imageArr, price, type, userId, name, press, author, id } = data;
      if (!id) {
        const result = await this.ctx.model.Book.create({
          desc,
          name,
          press,
          author,
          image: imageArr,
          price,
          book_type: mongoose.Types.ObjectId(type),
          user: mongoose.Types.ObjectId(userId),
          create_time: dayjs().unix(),
          status: 1,
        });
        return result ? app.config.msg.PUBLISH_SUCCESS : app.config.msg.PUBLISH_FAIL;
      } else {
        const result = await this.ctx.model.Book.updateMany({ _id: id }, {
          desc,
          name,
          press,
          author,
          image: imageArr,
          price,
          book_type: mongoose.Types.ObjectId(type),
          user: mongoose.Types.ObjectId(userId),
          create_time: dayjs().unix(),
          status: 1,
        });
        return result ? app.config.msg.PUBLISH_SUCCESS : app.config.msg.PUBLISH_FAIL;
      } 
    }
    /**
     * 上传书籍图片
     * @param  {Object} ctx 上下文对象
     */
    async uploadBooKImage(ctx) {
      const uploadData = await ctx.service.upload.saveByPipe(ctx);
      const { path } = uploadData;
      const loacl_url = `http://127.0.0.1:7001/static/${path}`;
      return path ? { path: loacl_url, ...app.config.msg.EDIT_SUCCESS } : app.config.msg.EDIT_ERR;
    }
    /**
     * 新建书籍分类
     * @param  {Object} data 请求传过来的数据包括书籍分类名
     */
    async createBookClassify(data) {
      const { name } = data;
      const result = this.ctx.model.BookClassify.create({
        name,
        create_time: dayjs().unix(),
      });
      return result ? app.config.msg.CREARE_SUCCESS : app.config.msg.CREARE_ERR;
    }
    /**
     * 查询书籍分类
     * @param  {Object} data 请求传过来的数据包括书籍分类名、页数、页码
     */
    async getBookClassify(data) {
      const { page, pageSize, name } = data
      if (page&&pageSize) {
        const totalNum = await this.ctx.model.BookClassify.find().and({ name : { $regex: name ? name : '', $options: '$i' } }).countDocuments();
        const result = await this.ctx.model.BookClassify.find()
          .and({ name : { $regex: name ? name : '', $options: '$i' } })
          .skip((parseInt(page) - 1) * parseInt(pageSize))
          .limit(parseInt(pageSize));
          return result ? { bean: {
            records: result,
            current: page,
            size: result.length,
            total: totalNum,
          }, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
      } else {
        const result = await this.ctx.model.BookClassify.find();
        return result ? { records: result, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
      }
    }
    /**
     * 查询书籍列表
     * @param  {Object} data 请求传过来的数据包括书籍分类id、页数、页码、书籍描述、状态、发布者id
     */
    async findbookList(data) {
      const { type, page, pageSize, desc, status, userId } = data;
      const searchVal = {}
      if (type) {
        searchVal.book_type = mongoose.Types.ObjectId(type)
      }
      if (status) {
        searchVal.status = status
      }
      if (userId) {
        searchVal.user = mongoose.Types.ObjectId(userId)
      }
      const search_term = {
        $or: [
          { desc: { $regex: desc ? desc : '', $options: '$i' } },
          { name: { $regex: desc ? desc : '', $options: '$i' } },
          { author: { $regex: desc ? desc : '', $options: '$i' } },
          { press: { $regex: desc ? desc : '', $options: '$i' } },
        ],
      };
      const totalNum = await this.ctx.model.Book.find(searchVal).and(search_term).countDocuments();
      const result = await this.ctx.model.Book.find(searchVal)
        .populate({
          path: 'user',
          select: { name: 1, image: 1 }
        })
        .populate({
          path: 'book_type'
        })
        .and(search_term)
        .sort({ create_time: -1 })
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize));
        return result ? { bean: {
          records: result,
          current: page,
          size: result.length,
          total: totalNum,
        }, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    /**
     * 查询书籍信息
     * @param  {Object} data 请求传过来的数据包括书籍id
     */
    async getBookInfo(data) {
      const { id } = data;
      const result = await this.ctx.model.Book.find({ _id: mongoose.Types.ObjectId(id) })
        .populate({
          path: 'user',
          select: { password: 0 }
        }).populate({
          path: 'book_type',
          select: 'name'
        });
      const base64Arr = []
      for (const item of result[0].image) {
        const base64 = await this.ctx.service.book.urlToBase64(item)
        base64Arr.push(base64)
      }  
      return result ? { records: result, base64Arr, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    async urlToBase64(url) {
      return new Promise((resolve, reject) => {
        http.get(url, function (res) {
          let chunks = [];
          let size = 0;
          res.on('data', function (chunk) {
            chunks.push(chunk);
            size += chunk.length;　　//累加缓冲数据的长度
          });
          res.on('end', function (err) {
              const data = Buffer.concat(chunks, size);
              const base64Img = data.toString('base64');
              resolve(`data:image/png;base64,${base64Img}`)
          });
        });
      })
    }
    /**
     * 浏览书籍
     * @param  {Object} data 请求传过来的数据包括书籍id
     */
    async lookBook(data) {
      const { id } = data;
      const book = await this.ctx.model.Book.findOne({ _id: mongoose.Types.ObjectId(id) });
      const lookNum = book.look ? book.look : 0
      await this.ctx.model.Book.updateOne({ _id: mongoose.Types.ObjectId(id) }, { look: lookNum + 1 })
      return {
        sucess: true,
        code: '0000'
      }
    }
    /**
     * 删除发布的书籍
     * @param  {Object} data 请求传过来的数据包括书籍id
     */
    async deletePublish(data) {
      const { id } = data;
      const result = await this.ctx.model.Book.deleteOne({ _id: mongoose.Types.ObjectId(id) });
      await this.ctx.model.Order.remove({ book: mongoose.Types.ObjectId(id) });
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL;
    }
  }
  return BookService;
};