'use strict';

const Controller = require('egg').Controller;
// 定义管理员登录请求参数规则
const loginRule = {
  name: 'string',
  password: 'string'
}
// 定义管理员创建请求参数规则
const createRule = {
  name: 'string',
  password: 'string'
}
// 定义获取用户列表请求参数规则
const userListRule = {
  phone: {
    type: 'string',
    required: false
  },
  pageSize: 'string',
  pageNum: 'string'
}
// 定义修改用户信息请求参数规则
const updateUserInfoRule = {
  phone: 'string',
  name: {
    type: 'string',
    required: false
  },
  sex: {
    type: 'string',
    required: false
  },
  school: {
    type: 'string',
    required: false
  },
  address: {
    type: 'string',
    required: false
  },
  sign: {
    type: 'string',
    required: false
  },
}
// 定义删除用户请求参数规则
const deleteUserRule = {
  id: 'string'
}
// 定义获取管理员列表请求参数规则 
const adminListRule = {
  name: {
    type: 'string',
    required: false
  },
  pageSize: 'string',
  pageNum: 'string'
}
// 定义修改用户信息请求参数规则
const updateAdminInfoRule = {
  _id: 'string',
  name: {
    type: 'string',
    required: false
  },
  password: {
    type: 'string',
    required: false
  },
};
// 定义删除管理员请求参数规则
const deleteAdminRule = {
  _id: 'string'
}
// 定义获取订单列表请求参数规则 
const orderListRule = {
  id: {
    type: 'string',
    required: false
  },
  status: {
    type: 'string',
    required: false
  },
  pageSize: 'string',
  page: 'string'
}
// 定义获取评论列表请求参数规则 
const commentListRule = {
  name: {
    type: 'string',
    required: false
  },
  pageSize: 'string',
  page: 'string'
}
// 定义添加快讯请求参数规则
const addNewsRule = {
  image: 'string',
  link: 'string',
}
// 定义获取快讯列表请求参数规则
const newsListRule = {
  page: {
    type: 'string',
    required: false
  },
  pageSize: {
    type: 'string',
    required: false
  },
  name: {
    type: 'string',
    required: false
  },
}
// 定义删除书籍分类请求参数规则
const deleteBookClassifyRule = {
  id: 'string'
}
// 定义修改书籍分类名称请求参数规则
const editBookClassifyRule = {
  id: 'string',
  name: 'string'
}
// 定义删除留言请求参数规则
const deleteCommentRule = {
  id: 'string'
}
// 定义删除快讯请求参数规则
const deleteNewsRule = {
  id: 'string'
}
// 定义编辑快讯请求参数规则 
const editNewsRule = {
  id: 'string',
  image: {
    type: 'string',
    required: false
  },
  link: {
    type: 'string',
    required: false
  },
}
class AdminController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate(loginRule, ctx.request.body);
    const result = await this.ctx.service.admin.login(ctx.request.body);
    ctx.body = result;
  }
  async create() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    const result = await this.ctx.service.admin.create(ctx.request.body);
    ctx.body = result;
  }
  async userList() {
    const { ctx } = this;
    ctx.validate(userListRule, ctx.query);
    const result = await this.ctx.service.admin.userList(ctx.query);
    ctx.body = result;
  }
  async updateUser() {
    const { ctx } = this;
    ctx.validate(updateUserInfoRule, ctx.request.body);
    const result = await this.ctx.service.admin.updateUserInfo(ctx.request.body);
    ctx.body = result;
  }
  async deleteUser() {
    const { ctx } = this;
    ctx.validate(deleteUserRule, ctx.request.body);
    const result = await this.ctx.service.admin.deleteUser(ctx.request.body);
    ctx.body = result;
  }
  async adminList() {
    const { ctx } = this;
    ctx.validate(adminListRule, ctx.query);
    const result = await this.ctx.service.admin.adminList(ctx.query);
    ctx.body = result;
  }
  async updateAdminInfo() {
    const { ctx } = this;
    ctx.validate(updateAdminInfoRule, ctx.request.body);
    const result = await this.ctx.service.admin.updateAdminInfo(ctx.request.body);
    ctx.body = result;
  }
  async deleteAdmin() {
    const { ctx } = this;
    ctx.validate(deleteAdminRule, ctx.request.body);
    const result = await this.ctx.service.admin.deleteAdmin(ctx.request.body);
    ctx.body = result;
  }
  async orderList() {
    const { ctx } = this;
    ctx.validate(orderListRule, ctx.query);
    const result = await this.ctx.service.admin.orderList(ctx.query);
    ctx.body = result;
  }
  async commentList() {
    const { ctx } = this;
    ctx.validate(commentListRule, ctx.query);
    const result = await this.ctx.service.admin.commentList(ctx.query);
    ctx.body = result;
  }
  async addNews() {
    const { ctx } = this;
    ctx.validate(addNewsRule, ctx.request.body);
    const result = await this.ctx.service.admin.addNews(ctx.request.body);
    ctx.body = result;
  }
  async newsList() {
    const { ctx } = this;
    ctx.validate(newsListRule, ctx.query);
    const result = await this.ctx.service.admin.newsList(ctx.query);
    ctx.body = result;
  }
  async deleteBookClassify() {
    const { ctx } = this;
    ctx.validate(deleteBookClassifyRule, ctx.request.body);
    const result = await this.ctx.service.admin.deleteBookClassify(ctx.request.body);
    ctx.body = result;
  }
  async editBookClassify() {
    const { ctx } = this;
    ctx.validate(editBookClassifyRule, ctx.request.body);
    const result = await this.ctx.service.admin.editBookClassify(ctx.request.body);
    ctx.body = result;
  }
  async deleteComment() {
    const { ctx } = this;
    ctx.validate(deleteCommentRule, ctx.request.body);
    const result = await this.ctx.service.admin.deleteComment(ctx.request.body);
    ctx.body = result;
  }
  async deleteNews() {
    const { ctx } = this;
    ctx.validate(deleteNewsRule, ctx.request.body);
    const result = await this.ctx.service.admin.deleteNews(ctx.request.body);
    ctx.body = result;
  }
  async editNews() {
    const { ctx } = this;
    ctx.validate(editNewsRule, ctx.request.body);
    const result = await this.ctx.service.admin.editNews(ctx.request.body);
    ctx.body = result;
  }
}


module.exports = AdminController;
