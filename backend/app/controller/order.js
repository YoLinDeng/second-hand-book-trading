'use strict';

const Controller = require('egg').Controller;
// 定义下单请求参数规则
const placeOrderRule = {
  buyer: 'string',
  seller: 'string',
  book: 'string'
}
// 定义查询订单请求参数规则
const findOrderRule = {
  page: {
    type: 'string',
    required: false,
  },
  pageSize: {
    type: 'string',
    required: false,
  },
  buyer: {
    type: 'string',
    required: false,
  },
  seller: {
    type: 'string',
    required: false,
  },
}
// 定义更改订单状态请求参数规则
const changeOrderStatusRule = {
  id: 'string',
  status: 'string',
  book: {
    type: 'string',
    required: false,
  },
}
// 定义查询订单详情清楚参数规则
const findOrderDetailRule = {
  id: 'string'
}
class OrderController extends Controller {
  async placeOrder() {
    const { ctx } = this;
    ctx.validate(placeOrderRule, ctx.request.body);
    const result = await this.ctx.service.order.placeOrder(ctx.request.body);
    ctx.body = result;
  }
  async findOrder() {
    const { ctx } = this;
    ctx.validate(findOrderRule, ctx.request.body);
    const result = await this.ctx.service.order.findOrder(ctx.query);
    ctx.body = result;
  }
  async changeOrderStatus() {
    const { ctx } = this;
    ctx.validate(changeOrderStatusRule, ctx.request.body);
    const result = await this.ctx.service.order.changeOrderStatus(ctx.request.body);
    ctx.body = result;
  }
  async findOrderDetail() {
    const { ctx } = this;
    ctx.validate(findOrderDetailRule, ctx.request.body);
    const result = await this.ctx.service.order.findOrderDetail(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = OrderController;
