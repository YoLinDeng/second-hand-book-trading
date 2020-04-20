'use strict';

const Controller = require('egg').Controller;
// 定义新增评论请求参数规则
const createCommentRule = {
  from: 'string',
  to: {
    type: 'string',
    required: false,
  },
  content: 'string',
  book: 'string',
  parentId: {
    type: 'string',
    required: false,
  },
}
// 定义查询评论请求参数规则
const findCommentRule = {
  book: 'string',
  page: 'string',
  pageSize: 'string'
}
class CommentController extends Controller {
  async create() {
    const { ctx } = this;
    ctx.validate(createCommentRule, ctx.request.body);
    const result = await this.ctx.service.comment.createComment(ctx.request.body);
    ctx.body = result;
  }
  async find() {
    const { ctx } = this;
    ctx.validate(findCommentRule, ctx.query);
    const result = await this.ctx.service.comment.findComment(ctx.query);
    ctx.body = result;
  }
}

module.exports = CommentController;
