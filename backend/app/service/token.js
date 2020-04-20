'use strict';

/**
 * @description: Token相关Service
 * @author: jinghao
 * @update: 更新SSO by shunbai 2013-05-05 16:48
 */

const Service = require('egg').Service;

module.exports = app => {
  class TokenService extends Service {
    /**
     * 查询Redis缓存是否有该用户token
     * @param  {String} phone 用户手机号
     */
    // async queryTokenStore(phone) {
    //   await app.redis.get(phone);
    // }
    /**
     * 缓存该用户token
     * @param  {String} phone 用户手机号
     * @param  {String} token 安全令牌
     */
    // async storeUserToken(phone, token) {
    //   await app.redis.set(phone, token);
    // }
    /**
     * 创建token
     * @param  {Obecjt} data
     * @return {String} token
     */
    async createToken(data) {
      const token = app.jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        data,
      }, app.config.jwt.secret);
      // await this.ctx.service.token.storeUserToken(data.phone, token);
      return token;
    }
    /**
     * 解码token携带的参数
     * @param  {String} token token
     * @return {String} 返回解码token的信息对象
     */
    async decodeToken(token) {
      const tokenStr = token.replace('Bearer ', '');
      return app.jwt.decode(tokenStr);
    }
    /**
     * 根据token获取用户id
     * @param  {String} token token
     * @return {String} 返回用户id
     */
    async getIdByToken(token) {
      const tokenStr = token.replace('Bearer ', '');
      const { phone } = app.jwt.decode(tokenStr).data;
      const { _id } = await this.ctx.model.User.findOne({ phone });
      return _id;
    }
    /**
     * 根据token获取用户信息
     * @param  {String} token
     * @return {String} 返回用户信息
     */
    async getUserByToken(token) {
      const tokenStr = token.replace('Bearer ', '');
      const { phone } = app.jwt.decode(tokenStr).data;
      const user = await this.ctx.model.User.findOne({ phone });
      delete user._doc.password;
      return user._doc;
    }
    /**
     * 根据token获取用户手机号
     * @param  {String} token
     * @return {String} 返回用户邮箱
     */
    async getPhoneByToken(token) {
      const tokenStr = token.replace('Bearer ', '');
      const { phone } = app.jwt.decode(tokenStr).data;
      return phone;
    }
  }
  return TokenService;
};
