'use strict';

const Controller = require('egg').Controller;

// 定义发布请求参数规则
const publishRule = {
  desc: 'string',
  name: 'string',
  press: 'string',
  author: 'string',
  imageArr: 'array',
  price: 'string',
  type: 'string',
  userId: 'string',
};
// 定义创建书籍分类请求参数规则
const createClassifyRule = {
  name: 'string'
}
// 定义查询书籍分类列表请求参数规则
const getClassifyRule = {
  page: {
    type: 'string',
    required: false,
  },
  pageSize: {
    type: 'string',
    required: false,
  },
  name: {
    type: 'string',
    required: false,
  },
}
// 定义查询书籍列表请求参数规则
const findBookRule = {
  page: {
    type: 'string',
    required: false,
  },
  pageSize: {
    type: 'string',
    required: false,
  },
  desc: {
    type: 'string',
    required: false,
  },
  type: {
    type: 'string',
    required: false,
  },
  status: {
    type: 'string',
    required: false,
  },
  userId: {
    type: 'string',
    required: false,
  },
};
// 定义获取书籍信息请求参数规则
const getBookInfoRule = {
  id: 'string',
};
// 定义浏览书籍请求参数规则
const lookBookRule = {
  id: 'string',
};
// 定义删除发布书籍请求参数规则
const deletePublishRule = {
  id: 'string'
}
class BookController extends Controller {
  async publish() {
    const { ctx } = this;
    ctx.validate(publishRule, ctx.request.body);
    const result = await this.ctx.service.book.publishBook(ctx.request.body);
    ctx.body = result;
  }
  async upload() {
    const { ctx } = this;
    const result = await this.ctx.service.book.uploadBooKImage(ctx);
    ctx.body = result;
  }
  async createClassify() {
    const { ctx } = this;
    ctx.validate(createClassifyRule, ctx.request.body);
    const result = await this.ctx.service.book.createBookClassify(ctx.request.body);
    ctx.body = result;
  }
  async getClassify() {
    const { ctx } = this;
    ctx.validate(getClassifyRule, ctx.query);
    const result = await this.ctx.service.book.getBookClassify(ctx.query);
    ctx.body = result;
  }
  async findbookList() {
    const { ctx } = this;
    ctx.validate(findBookRule, ctx.query);
    const result = await this.ctx.service.book.findbookList(ctx.query);
    ctx.body = result;
  }
  async getBookInfo() {
    const { ctx } = this;
    ctx.validate(getBookInfoRule, ctx.query);
    const result = await this.ctx.service.book.getBookInfo(ctx.query);
    ctx.body = result;
  }
  async lookBook() {
    const { ctx } = this;
    ctx.validate(lookBookRule, ctx.query);
    const result = await this.ctx.service.book.lookBook(ctx.query);
    ctx.body = result;
  }
  async deletePublish() {
    const { ctx } = this;
    ctx.validate(deletePublishRule, ctx.request.body);
    const result = await this.ctx.service.book.deletePublish(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = BookController;
