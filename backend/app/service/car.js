'use strict';

/**
 * @description: 购物车相关Service
 */
const Service = require('egg').Service;
const mongoose = require('mongoose');
const dayjs = require('dayjs');
module.exports = app => {
  class CarService extends Service {
    /**
     * 添加购物车
     * @param  {Object} data 包括用户id、卖家id、书籍id
     */
    async addCar(data) {
      const { user, seller, book } = data
      const unique = await this.ctx.model.Car.find({ book });
      if (unique.length > 0) {
        return app.config.msg.HAS_ADD_CAR
      }
      const result = await this.ctx.model.Car.create({
        user,
        seller,
        book,
        create_time: dayjs().unix(),
      })
      return result ? app.config.msg.CREARE_SUCCESS : app.config.msg.ADD_ERR
    }
    /**
     * 查询购物车数据
     * @param  {Object} data 包括页码、页数、用户id
     */
    async findCar(data) {
      const { page, pageSize, userId } = data;
      const totalNum = await this.ctx.model.Car.find({ user: mongoose.Types.ObjectId(userId) }).countDocuments();
      const result = await this.ctx.model.Car.find({ user: mongoose.Types.ObjectId(userId) })
        .populate({
          path: 'seller',
          select: { name: 1, image: 1, _id: 1 }
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
     * 删除购物车数据
     * @param  {Object} data 包括购物车id
     */
    async deleteCar(data) {
      const { carId } = data
      const result = await this.ctx.model.Car.deleteOne({ _id: mongoose.Types.ObjectId(carId) })
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL
    }
  }
  return CarService;
};