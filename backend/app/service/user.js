'use strict';

/**
 * @description: 用户相关Service
 */
const Service = require('egg').Service;
const dayjs = require('dayjs');
const sha1 = require('sha1');
const mongoose = require('mongoose');
module.exports = app => {
  class UserService extends Service {
    /**
     * 注册用户
     * @param  {Object} data 包括用户名、手机号、性别、年龄、生日、密码
     */
    async register(data) {
      const { name, phone, password, sex, birthday, school } = data;
      const unique = await this.ctx.model.User.find({ phone }) ;
      if (unique.length > 0) {
        return app.config.msg.PHONE_USED;
      }
      const result = await this.ctx.model.User.create({
        name,
        phone,
        password: sha1(sha1(password) + password),
        sex,
        birthday,
        school,
        create_time: dayjs().unix(),
      });
      return result ? app.config.msg.REGISTER_SUCCESS : app.config.msg.REGISTER_ERR;
    }
    /**
     * 用户登录
     * @param  {Object} data 包括手机号、密码
     */
    async login(data) {
      const { phone, password } = data;
      let userInfo = await this.ctx.model.User.findOne({ phone });
      if (userInfo.password === sha1(sha1(password) + password)) {
        await this.ctx.model.User.updateOne({ phone }, { login_time: dayjs().unix() })
        const resultToken = await this.ctx.service.token.createToken({
          phone: userInfo.phone,
          name: userInfo.name,
          sex: userInfo.sex,
        });
        const info = await this.ctx.model.User.findOne({ phone }, { password: 0 });
        return {
          success: true,
          code: '0000',
          message: '登录成功',
          token: resultToken,
          userInfo: info
        }
      } else {
        return app.config.msg.LOGIN_ERR;
      }
    }
    /**
     * 通过token获取用户信息
     * @param  {Object} data 包括token
     */
    async getUserInfoByToken(data) {
      const { token } = data;
      const result = await this.ctx.service.token.getUserByToken(token);
      const id = result._id
      const starNum = await this.ctx.model.Star.find({ seller: mongoose.Types.ObjectId(id) }).countDocuments();
      const followNum = await this.ctx.model.Fans.find({ user: mongoose.Types.ObjectId(id) }).countDocuments();
      const fansNum = await this.ctx.model.Fans.find({ f_user: mongoose.Types.ObjectId(id) }).countDocuments();
      const publishNum = await this.ctx.model.Book.find({ user: mongoose.Types.ObjectId(id) }).countDocuments();
      const sellNum = await this.ctx.model.Order.find({ seller: mongoose.Types.ObjectId(id) }).countDocuments();
      const buyNum = await this.ctx.model.Order.find({ buyer: mongoose.Types.ObjectId(id) }).countDocuments();
      const collectNum = await this.ctx.model.Collect.find({ user: mongoose.Types.ObjectId(id) }).countDocuments();
      return result ? { bean: result, starNum, followNum, fansNum, publishNum, sellNum, buyNum, collectNum, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    /**
     * 通过id获取用户信息
     * @param  {Object} data 包括用户id
     */
    async getUserInfoById(data) {
      const { id } = data;
      const result = await this.ctx.model.User.find({ _id: mongoose.Types.ObjectId(id) });
      const starNum = await this.ctx.model.Star.find({ seller: mongoose.Types.ObjectId(id) }).countDocuments();
      const followNum = await this.ctx.model.Fans.find({ user: mongoose.Types.ObjectId(id) }).countDocuments();
      const fansNum = await this.ctx.model.Fans.find({ f_user: mongoose.Types.ObjectId(id) }).countDocuments();
      return result ? { bean: result, starNum, followNum, fansNum, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    /**
     * 修改用户头像
     * @param  {Object} ctx 上下文
     */
    async updateUserImage(ctx) {
      const uploadData = await ctx.service.upload.saveByPipe(ctx);
      const { phone, path } = uploadData;
      const loacl_url = `http://127.0.0.1:7001/static/${path}`;
      const result = await this.ctx.model.User.updateOne({ phone },{ image: loacl_url });
      return result ? { path: loacl_url, ...app.config.msg.EDIT_SUCCESS } : app.config.msg.EDIT_ERR;
    }
    /**
     * 修改用户信息
     * @param  {Object} data 可以包括用户名，性别，生日,地址，学校，个性签名
     */
    async updateUserInfo(data) {
      const { name, sex, birthday, address, school, sign, phone } = data;
      let result;
      if (name) {
        result = await this.ctx.model.User.updateOne({ phone }, { name });
      } else if (sex) {
        result = await this.ctx.model.User.updateOne({ phone }, { sex });
      } else if (birthday) {
        result = await this.ctx.model.User.updateOne({ phone }, { birthday });
      } else if (address) {
        result = await this.ctx.model.User.updateOne({ phone }, { address });
      } else if (school) {
        result = await this.ctx.model.User.updateOne({ phone }, { school });
      } else if (sign) {
        result = await this.ctx.model.User.updateOne({ phone }, { sign });
      }
      return result ? app.config.msg.EDIT_SUCCESS : app.config.msg.EDIT_ERR;
    }
    /**
     * 用户点赞书籍
     * @param  {Object} data 可以包括用户id，卖家id，商品id
     */
    async starBook(data) {
      const { user, seller, book } = data;
      const result = await this.ctx.model.Star.create({
        user,
        book,
        seller,
        create_time: dayjs().unix()
      });
      return result ? app.config.msg.SUCCESS : app.config.msg.ERR;
    }
    /**
     * 用户取消点赞书籍
     * @param  {Object} data 可以包括用户id， 书籍id
     */
    async cancelStar(data) {
      const { user, book } = data;
      const result = await this.ctx.model.Star.deleteOne({ user, book });
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL;
    }
    /**
     * 查询用户是否点赞书籍
     * @param  {Object} data 可以包括用户id， 书籍id
     */
    async findUserStarBook(data) {
      const { user, book } = data;
      const result = await this.ctx.model.Star.find({ user, book });
      return result ? { bean: result, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    /**
     * 查询用户超赞列表
     * @param  {Object} data 可以包括用户id
     */
    async findUserStarList(data) {
      const { user, page, pageSize } = data;
      const result = await this.ctx.model.Star.find({ seller: mongoose.Types.ObjectId(user) })
        .populate({
          path: 'user',
          select: { name: 1, image: 1, _id: 1 }
        })
        .populate({
          path: 'book',
          select: { image: 1, _id: 1 }
        })
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize));
      return result ? { bean : result, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    /**
     * 用户收藏书籍
     * @param  {Object} data 可以包括用户id、书籍id、卖家id
     */
    async collectBook(data) {
      const { user, book, seller } = data;
      const result = await this.ctx.model.Collect.create({
        user, 
        book,
        seller,
        create_time: dayjs().unix()
      })
      return result ? app.config.msg.SUCCESS : app.config.msg.ERR;
    }
    /**
     * 用户取消收藏书籍
     * @param  {Object} data 可以包括用户id， 书籍id
     */
    async cancelCollect(data) {
      const { user, book } = data;
      const result = await this.ctx.model.Collect.deleteOne({ user, book });
      return result ? app.config.msg.DEL_SUCCESS : app.config.msg.DEL_FAIL;
    }
    /**
     * 查询用户是否收藏书籍
     * @param  {Object} data 可以包括用户id， 书籍id
     */
    async findUserCollectBook(data) {
      const { user, book } = data;
      const result = await this.ctx.model.Collect.find({ user, book });
      return result ? { bean: result, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR;
    }
    /**
     * 查询用户收藏列表
     * @param  {Object} data 可以包括用户id
     */
    async findUserCollectList(data) {
      const { user, page, pageSize } = data;
      const result = await this.ctx.model.Collect.find({ user: mongoose.Types.ObjectId(user) })
        .populate({
          path: 'seller',
          select: { name: 1, image: 1, _id: 1 }
        })
        .populate({
          path: 'book',
          select: { image: 1, _id: 1, price: 1, desc: 1 }
        })
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize));
      return result ? { bean : result, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR
    }
    /**
     * 关注用户
     * @param  {Object} data 可以包括用户id，被关注用户id
     */
    async followUser(data) {
      const { user, fUser } = data;
      const result = await this.ctx.model.Fans.create({
        user,
        f_user: fUser
      });
      return result ? app.config.msg.SUCCESS : app.config.msg.ERR;
    }
    /**
     * 取消关注用户
     * @param  {Object} data 可以包括用户id，被取消关注用户id
     */
    async cancelFollowUser(data) {
      const { user, fUser } = data;
      const result = await this.ctx.model.Fans.deleteOne({ user: mongoose.Types.ObjectId(user), f_user: mongoose.Types.ObjectId(fUser) });
      return result ? app.config.msg.SUCCESS : app.config.msg.ERR;
    }
    /**
     * 查询用户是否已关注该用户
     * @param  {Object} data 可以包括用户id，被关注用户id
     */
    async findUserIsFollow(data) {
      const { user, fUser } = data;
      const result = await this.ctx.model.Fans.find({ user: mongoose.Types.ObjectId(user), f_user: mongoose.Types.ObjectId(fUser) });
      return result ? { bean: result, ...app.config.msg.SUCCESS } : app.config.msg.ERR;
    }
    /**
     * 查询用户关注列表
     * @param  {Object} data 可以包括用户id,页码，页数
     */
    async findFollowList(data) {
      const { userId, page, pageSize } = data;
      const result = await this.ctx.model.Fans.find({ user: mongoose.Types.ObjectId(userId) })
        .populate({
          path: 'f_user',
          select: { password: 0 }
        })
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize));
      return result ? { bean : result, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR
    }
    /**
     * 查询用户粉丝列表
     * @param  {Object} data 可以包括用户id,页码，页数
     */
    async findFansList(data) {
      const { userId, page, pageSize } = data;
      const result = await this.ctx.model.Fans.find({ f_user: mongoose.Types.ObjectId(userId) })
        .populate({
          path: 'user',
          select: { password: 0 }
        })
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize));
      return result ? { bean : result, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR
    }
    /**
     * 创建浏览书籍历史记录
     * @param  {Object} data 可以包括用户id,书籍id
     */
    async createHistory(data) {
      const { user, book } = data;
      const hasExist = await this.ctx.model.History.find({ user, book }).countDocuments();
      if (hasExist > 0) {
        await this.ctx.model.History.updateOne({
          create_time: dayjs().format('YYYY-MM-DD')
        });
        return {
          success: true,
          code: '0000'
        }
      } else {
        await this.ctx.model.History.create({
          user,
          book,
          create_time: dayjs().format('YYYY-MM-DD')
        });
        return {
          success: true,
          code: '0000'
        }
      }
    }
    /**
     * 查询浏览书籍历史记录列表
     * @param  {Object} data 可以包括用户id，页码，页数
     */
    async findHistoryList(data) {
      const { id } = data;
      const result = await this.ctx.model.History.find({ user: mongoose.Types.ObjectId(id) })
        .populate({
          path: 'book',
        })
      return result ? { bean : result, ...app.config.msg.GET_SUCCESS } : app.config.msg.GET_ERR
    }
  }
  return UserService;
};