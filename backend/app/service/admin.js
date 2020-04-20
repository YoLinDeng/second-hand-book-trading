'use strict';

/**
 * @description: 管理员相关Service
 */

const Service = require('egg').Service;
const dayjs = require('dayjs');
const mongoose = require('mongoose');

module.exports = app => {
  class AdminService extends Service {
    /**
     * 管理员登录
     * @param  {Object} data 包括管理员名称和密码
     */
    async login(data) {
      const { name, password } = data;
      const adminInfo = await this.ctx.model.Admin.findOne({ name });
      if (adminInfo.password === password) {
        return app.config.msg.LOGIN_SUCCESS;
      } else {
        return app.config.msg.LOGIN_ERR;
      }
    }
    /**
     * 创建管理员
     * @param  {Object} data 包括管理员名称和密码
     */
    async create(data) {
      const { name, password } = data;
      const unique = await this.ctx.model.Admin.find({ name }).countDocuments();
      if (unique > 0) {
        return app.config.msg.ADMIN_NAME_EXIT;
      } 
      const result = await this.ctx.model.Admin.create({
        name,
        password,
        create_time: dayjs().unix()
      })
      return result ? app.config.msg.SUCCESS : app.config.msg.ERR;
    }
     /**
     * 获取用户列表
     * @param  {Object} data 包括手机号、页码和页数
     */
    async userList(data){
      const { phone, pageSize, pageNum } = data;
      const totalNum = await this.ctx.model.User.find().and({ phone : { $regex: phone ? phone : '', $options: '$i' } }).countDocuments();
      const result = await this.ctx.model.User.find()
      .and({ phone : { $regex: phone ? phone : '', $options: '$i' } })
      .skip((parseInt(pageNum) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize));
      return result ? { bean: {
        records: result,
        current: pageNum,
        size: result.length,
        total: totalNum,
      }, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    /**
     * 更新用户信息
     * @param  {Object} data 用户信息对象
     */
    async updateUserInfo(data) {
      const { name, sex, school, address, sign, phone } = data;
      const result = await this.ctx.model.User.updateMany({ phone }, { name, sex, school, address, sign });
      return result ? app.config.msg.EDIT_SUCCESS : app.config.msg.EDIT_ERR;
    }
    /**
     * 删除用户
     * @param  {Object} data 包括用户id
     */
    async deleteUser(data) {
      const { id } = data;
      await this.ctx.model.Book.remove({ user: mongoose.Types.ObjectId(id)})
      await this.ctx.model.Order.remove({ buyer: mongoose.Types.ObjectId(id), seller: mongoose.Types.ObjectId(id) })
      const result = await this.ctx.model.User.deleteOne({ _id: mongoose.Types.ObjectId(id) });
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL;
    }
    /**
     * 管理员列表
     * @param  {Object} data 包括管理员名称、页数、页码
     */
    async adminList(data) {
      const { name, pageSize, pageNum } = data;
      const totalNum = await this.ctx.model.Admin.find().and({ name : { $regex: name ? name : '', $options: '$i' } }).countDocuments();
      const result = await this.ctx.model.Admin.find()
      .and({ name : { $regex: name ? name : '', $options: '$i' } })
      .skip((parseInt(pageNum) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize));
      return result ? { bean: {
        records: result,
        current: pageNum,
        size: result.length,
        total: totalNum,
      }, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    /**
     * 修改管理员信息
     * @param  {Object} data 包括管理员id，管理员名称、密码
     */
    async updateAdminInfo(data) {
      const { _id, name, password } = data;
      const admin = await this.ctx.model.Admin.findOne({ _id });
      if (admin.name === 'admin') {
        return app.config.msg.ADMIN_NOT_EDIT;
      }
      const result = await this.ctx.model.Admin.updateMany({ _id }, { name, password });
      return result ? app.config.msg.EDIT_SUCCESS : app.config.msg.EDIT_ERR;
    }
    /**
     * 删除管理员
     * @param  {Object} data 包括管理员id
     */
    async deleteAdmin(data) {
      const { _id } = data;
      const admin = await this.ctx.model.Admin.findOne({ _id });
      if (admin.name === 'admin') {
        return app.config.msg.ADMIN_NOT_DEL;
      }
      const result = await this.ctx.model.Admin.deleteOne({ _id });
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL;
    }
    /**
     * 订单列表
     * @param  {Object} data 包括订单名称、页数、页码
     */
    async orderList(data) {
      const { id, pageSize, page, status } = data;
      const searchVal = {}
      if (id) {
        searchVal._id = mongoose.Types.ObjectId(id)
      }
      if (status) {
        searchVal.status = status
      }
      const totalNum = await this.ctx.model.Order.find(searchVal).countDocuments();
      const result = await this.ctx.model.Order.find(searchVal)
      .populate({
        path: 'buyer'
      })
      .populate({
        path: 'seller'
      })
      .populate({
        path: 'book'
      })
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
     * 评论列表
     * @param  {Object} data 包括查询条件、页数、页码
     */
    async commentList(data) {
      const { name, pageSize, page } = data;
      const totalNum = await this.ctx.model.Comment.find().and({ content : { $regex: name ? name : '', $options: '$i' } }).countDocuments();
      const result = await this.ctx.model.Comment.find().and({ content : { $regex: name ? name : '', $options: '$i' } })
      .populate({
        path: 'from'
      })
      .populate({
        path: 'to'
      })
      .populate({
        path: 'book'
      })
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
     * 添加快讯
     * @param  {Object} data 包括图片url，链接
     */
    async addNews(data) {
      const { image, link } = data;
      const total = await this.ctx.model.News.find().countDocuments();
      if (total > 5) {
        return {
          success: false,
          message: '快讯最多只能建5个'
        }
      }
      const result = await this.ctx.model.News.create({
        image,
        link,
        create_time: dayjs().unix()
      })
      return result ? app.config.msg.CREARE_SUCCESS :  app.config.msg.CREARE_ERR;
    }
    /**
     * 添加列表
     * @param  {Object} data 包括查询名字，页码，页数
     */
    async newsList(data) {
      const { name, pageSize, page } = data;
      const totalNum = await this.ctx.model.News.find().countDocuments();
      const result = await this.ctx.model.News.find()
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
     * 删除书籍分类
     * @param  {Object} data 包括分类id
     */
    async deleteBookClassify(data) {
      const { id } = data;
      const result = await this.ctx.model.BookClassify.deleteOne({ _id: mongoose.Types.ObjectId(id) });
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL;
    }
    /**
     * 修改书籍分类名
     * @param  {Object} data 包括分类id,分类名称
     */
    async editBookClassify(data) {
      const { id, name } = data;
      const result = await this.ctx.model.BookClassify.updateOne({ _id: mongoose.Types.ObjectId(id) }, { name });
      return result ? app.config.msg.EDIT_SUCCESS : app.config.msg.EDIT_ERR;
    }
    /**
     * 刪除留言
     * @param  {Object} data 包括留言id
     */
    async deleteComment(data) {
      const { id } = data;
      const result = await this.ctx.model.Comment.deleteOne({ _id: mongoose.Types.ObjectId(id) });
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL;
    }
    /**
     * 刪除快讯
     * @param  {Object} data 包括快讯id
     */
    async deleteNews(data) {
      const { id } = data;
      const result = await this.ctx.model.News.deleteOne({ _id: mongoose.Types.ObjectId(id) });
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL;
    }
    /**
     * 修改快讯
     * @param  {Object} data 包括快讯id，图片，链接
     */
    async editNews(data) {
      const { id, image, link } = data;
      const result = await this.ctx.model.News.updateMany({ _id: mongoose.Types.ObjectId(id) }, { image, link });
      return result ? app.config.msg.EDIT_SUCCESS : app.config.msg.EDIT_ERR;
    }
  }
  return AdminService;
};