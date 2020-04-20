'use strict';

/**
 * @description: 用户相关Service
 */
const Service = require('egg').Service;
const dayjs = require('dayjs');
const mongoose = require('mongoose');

module.exports = app => {
  class OrderService extends Service {
    /**
     * 下单
     * @param  {Object} data 请求传过来的数据包括书籍id、买家id、卖家id
     */
    async placeOrder(data) {
      const { buyer, seller, book } = data;
      const isPlaceOrder = await this.ctx.model.Order.find({
        buyer,
        book,
        status: '1'
      });
      if (isPlaceOrder.length > 0) {
        return app.config.msg.HAS_PLACE_ORDER;
      }
      const result = await this.ctx.model.Order.create({
        book,
        buyer,
        seller,
        create_time: dayjs().unix(),
        status: '1'
      });
      return result ? app.config.msg.PLACE_ORDER_SUCCESS : app.config.msg.PLACE_ORDER_FAIL;
    }
    /**
     * 查询订单
     * @param  {Object} data 请求传过来的数据包括买家id，卖家id
     */
    async findOrder(data) {
      const { buyer, seller, page, pageSize } = data;
      const searchVal = {}
      if (buyer) {
        searchVal.buyer = mongoose.Types.ObjectId(buyer)
      }
      if (seller) {
        searchVal.seller = mongoose.Types.ObjectId(seller)
      }
      const totalNum = await this.ctx.model.Order.find(searchVal).countDocuments();
      const result = await this.ctx.model.Order.find(searchVal)
        .populate({
          path: 'buyer',
          select: { name: 1, image: 1 }
        })
        .populate({
          path: 'seller',
          select: { name: 1, image: 1 }
        })
        .populate({
          path: 'book'
        })
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
     * 更改订单状态
     * @param  {Object} data 请求传过来的数据包括订单id,状态值, 书籍id
     */
    async changeOrderStatus(data) {
      const { id, status, book } = data;
      if (status === '3') {
        await this.ctx.model.Order.updateOne({ _id: mongoose.Types.ObjectId(id) }, { status });
        await this.ctx.model.Book.updateOne({ _id:mongoose.Types.ObjectId(book) }, { status: '2' })
        return  {
          code: '0000',
          success: true
        }
      }
      if (status === '2') {
        await this.ctx.model.Order.updateOne({ _id: mongoose.Types.ObjectId(id) }, { status });
        return { code: '0000', success: true } 
      }
    }
    /**
     * 查询订单详情
     * @param  {Object} data 请求传过来的数据包括订单id
     */
    async findOrderDetail(data) {
      const { id } = data;
      const result = await this.ctx.model.Order.find({ _id: mongoose.Types.ObjectId(id) })
      .populate({
        path: 'book',
      })
      .populate({
        path: 'buyer',
        select: { password: 0}
      })
      .populate({
        path: 'seller',
        select: { password: 0 }
      })
      return result ? { bean: result, ...app.config.msg.SUCCESS } : app.config.msg.ERR;
    }
  }
  return OrderService;
};