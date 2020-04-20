'use strict';

const Controller = require('egg').Controller;
/* 定义用户登录接口请求参数规则 */
const loginRule = {
  phone: 'string',
  password: 'string',
}
/* 定义注册请求参数规则 */
const registerRule = {
  name: 'string',
  phone: 'string',
  sex: 'string',
  birthday: 'string',
  password: 'string',
  school: 'string',
};
/* 定义获取用户信息接口请求规则 */
const getUserInfoRule = {
  token: 'string',
}
const updateUserInfoRule = {
  phone: 'string',
  name: {
    type: 'string',
    required: false,
  },
  sex: {
    type: 'string',
    required: false,
  },
  birthday: {
    type: 'string',
    required: false,
  },
  address: {
    type: 'string',
    required: false,
  },
  school: {
    type: 'string',
    required: false,
  },
  sign: {
    type: 'string',
    required: false,
  },
}
// 定义用户点赞书籍请求参数规则
const starBookRule = {
  user: 'string',
  book: 'string',
  seller: 'string'
}
// 定义用户取消点赞书籍请求参数规则
const cancelStarRule = {
  user: 'string',
  book: 'string'
}
// 定义查询用户是否点赞书籍请求参数规则
const findUserStarBookRule = {
  user: 'string',
  book: 'string'
}
// 定义查询用户超赞列表请求参数规则
const findUserStarListRule = {
  page: 'string',
  pageSize: 'string',
  user: 'string'
}
// 定义用户收藏书籍请求参数规则
const collectBookRule = {
  user: 'string',
  book: 'string',
  seller: 'string'
}
// 定义用户取消收藏书籍请求参数规则
const cancelCollectRule = {
  user: 'string',
  book: 'string'
}
// 定义通过id获取用户信息请求参数规则
const getUserInfoByIdRule = {
  id: 'string',
}
// 定义关注用户请求参数规则
const followUserRule = {
  user: 'string',
  fUser: 'string',
}
// 取消关注用户请求参数规则
const cancelFollowUserRule = {
  user: 'string',
  fUser: 'string',
}
// 查询用户是否已关注请求参数规则
const findUserIsFollowRule = {
  user: 'string',
  fUser: 'string',
}
// 查询用户关注列表
const findFollowListRule = {
  userId: 'string',
  page: 'string',
  pageSize: 'string',
}
// 定义创建浏览书籍历史记录
const fcreateHistoryRule = {
  user: 'string',
  book: 'string',
}
// 定义查询浏览书籍历史记录列表请求参数规则
const findHistoryListRule = {
  id: 'string',
}
class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate(loginRule, ctx.request.body);
    const result = await this.ctx.service.user.login(ctx.request.body);
    ctx.body = result;
  }
  async register() {
    const { ctx } = this;
    ctx.validate(registerRule, ctx.request.body);
    const result = await this.ctx.service.user.register(ctx.request.body);
    ctx.body = result;
  }
  async getUserInfo() {
    const { ctx } = this;
    ctx.validate(getUserInfoRule, ctx.request.body);
    const result = await this.ctx.service.user.getUserInfoByToken(ctx.request.body);
    ctx.body = result;
  }
  async updateUserImage() {
    const { ctx } = this;
    const result = await this.ctx.service.user.updateUserImage(ctx);
    ctx.body = result;
  }
  async updateUserInfo() {
    const { ctx } = this;
    ctx.validate(updateUserInfoRule, ctx.request.body);
    const result = await this.ctx.service.user.updateUserInfo(ctx.request.body);
    ctx.body = result;
  }
  async starBook() {
    const { ctx } = this;
    ctx.validate(starBookRule, ctx.query);
    const result = await this.ctx.service.user.starBook(ctx.query);
    ctx.body = result;
  }
  async cancelStar() {
    const { ctx } = this;
    ctx.validate(cancelStarRule, ctx.query);
    const result = await this.ctx.service.user.cancelStar(ctx.query);
    ctx.body = result;
  }
  async findUserStarBook() {
    const { ctx } = this;
    ctx.validate(findUserStarBookRule, ctx.query);
    const result = await this.ctx.service.user.findUserStarBook(ctx.query);
    ctx.body = result;
  }
  async findUserStarList() {
    const { ctx } = this;
    ctx.validate(findUserStarListRule, ctx.query);
    const result = await this.ctx.service.user.findUserStarList(ctx.query);
    ctx.body = result;
  }
  async collectBook() {
    const { ctx } = this;
    ctx.validate(collectBookRule, ctx.query);
    const result = await this.ctx.service.user.collectBook(ctx.query);
    ctx.body = result;
  }
  async cancelCollect() {
    const { ctx } = this;
    ctx.validate(cancelCollectRule, ctx.query);
    const result = await this.ctx.service.user.cancelCollect(ctx.query);
    ctx.body = result;
  }
  async findUserCollectBook() {
    const { ctx } = this;
    ctx.validate(findUserStarBookRule, ctx.query);
    const result = await this.ctx.service.user.findUserCollectBook(ctx.query);
    ctx.body = result;
  }
  async findUserCollectList() {
    const { ctx } = this;
    ctx.validate(findUserStarListRule, ctx.query);
    const result = await this.ctx.service.user.findUserCollectList(ctx.query);
    ctx.body = result;
  }
  async getUserInfoById() {
    const { ctx } = this;
    ctx.validate(getUserInfoByIdRule, ctx.query);
    const result = await this.ctx.service.user.getUserInfoById(ctx.query);
    ctx.body = result;
  }
  async followUser() {
    const { ctx } = this;
    ctx.validate(followUserRule, ctx.query);
    const result = await this.ctx.service.user.followUser(ctx.query);
    ctx.body = result;
  }
  async cancelFollowUser() {
    const { ctx } = this;
    ctx.validate(cancelFollowUserRule, ctx.query);
    const result = await this.ctx.service.user.cancelFollowUser(ctx.query);
    ctx.body = result;
  }
  async findUserIsFollow() {
    const { ctx } = this;
    ctx.validate(findUserIsFollowRule, ctx.query);
    const result = await this.ctx.service.user.findUserIsFollow(ctx.query);
    ctx.body = result;
  }
  async findFollowList() {
    const { ctx } = this;
    ctx.validate(findFollowListRule, ctx.query);
    const result = await this.ctx.service.user.findFollowList(ctx.query);
    ctx.body = result;
  }
  async findFansList() {
    const { ctx } = this;
    ctx.validate(findFollowListRule, ctx.query);
    const result = await this.ctx.service.user.findFansList(ctx.query);
    ctx.body = result;
  }
  async createHistory() {
    const { ctx } = this;
    ctx.validate(fcreateHistoryRule, ctx.request.body);
    const result = await this.ctx.service.user.createHistory(ctx.request.body);
    ctx.body = result;
  }
  async findHistoryList() {
    const { ctx } = this;
    ctx.validate(findHistoryListRule, ctx.query);
    const result = await this.ctx.service.user.findHistoryList(ctx.query);
    ctx.body = result; 
  }
}

module.exports = UserController;
