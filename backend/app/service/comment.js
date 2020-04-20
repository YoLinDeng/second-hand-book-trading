'use strict';

/**
 * @description: 评论相关Service
 */
const Service = require('egg').Service;
const mongoose = require('mongoose');
const dayjs = require('dayjs');
module.exports = app => {
  class CommentService extends Service {
    /**
     * 新增评论
     * @param  {Object} data 包括评论人id，被评论人id，书籍id， 评论父级id，评论内容
     */
    async createComment(data) {
      const { from, to, content, book, parentId } = data;
      const result = await this.ctx.model.Comment.create({
        from,
        to,
        content,
        book,
        parent_id: parentId ? mongoose.Types.ObjectId(parentId) : 0,
        create_time: dayjs().unix(),
      });
      return result ? app.config.msg.CREARE_SUCCESS : app.config.msg.CREARE_ERR;
    }
    /**
     * 查询评论
     * @param  {Object} data 包括书籍id，页码，页数
     */
    async findComment(data) {
      const { book, page, pageSize } = data
      const totalNum = await this.ctx.model.Comment.find({ book: mongoose.Types.ObjectId(book), parent_id: 0 }).countDocuments();
      const oneList = await this.ctx.model.Comment.find({ book: mongoose.Types.ObjectId(book), parent_id: 0 })
        .populate({
          path: 'from',
          select: { name: 1, image: 1, _id: 1 }
        })
        .populate({
          path: 'to',
          select: { name: 1, image: 1, _id: 1 }
        })
        .sort({ create_time: 1})
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize)).lean();
        const Comment = this.ctx.model.Comment
        var promises = oneList.map(item => {
          return Comment.find({
              book: mongoose.Types.ObjectId(book),
              parent_id: item._id
          })
          .populate({
            path: 'from',
            select: { name: 1, image: 1, _id: 1 }
          })
          .populate({
            path: 'to',
            select: { name: 1, image: 1, _id: 1 }
          })
          .sort({ create_time: 1})
          .select('-__v').lean()
      });
      var list = await Promise.all(promises)
      oneList.forEach(item => {
        item.items = []
        list.forEach(code => {
          if (code.length > 0 && item._id == code[0].parent_id) {
              item.items = code
          }
        })
      })
      return oneList ? { bean: {
        records: oneList,
        current: page,
        size: oneList.length,
        total: totalNum,
      }, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
  }
  return CommentService;
};