'use strict';

const Controller = require('egg').Controller;
// 定义添加购物车请求参数规则
const addCarRule = {
  user: 'string',
  seller: 'string',
  book: 'string',
}
// 定义查询购物车列表请求参数规则
const findCarRule = {
  page: 'string',
  pageSize: 'string',
  userId: 'string',
}
// 定义删除购物车请求参数规则
const deleteCarRule = {
  carId: 'string',
}
class CarController extends Controller {
  async add() {
    const { ctx } = this;
    ctx.validate(addCarRule, ctx.request.body);
    const result = await this.ctx.service.car.addCar(ctx.request.body);
    ctx.body = result;
  }
  async find() {
    const { ctx } = this;
    ctx.validate(findCarRule, ctx.query);
    const result = await this.ctx.service.car.findCar(ctx.query);
    ctx.body = result;
  }
  async delete() {
    const { ctx } = this;
    ctx.validate(deleteCarRule, ctx.request.body);
    const result = await this.ctx.service.car.deleteCar(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = CarController;
