'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    const { ctx } = this;
    let { userName, password }= ctx.request.body
    let name = userName + 'dyl'
    ctx.body = {
      code: 1,
      msg: "登录成功",
      name
    };
  }
}

module.exports = HomeController;
