'use strict';

/**
 * @description: token检查中间件
 */


module.exports = (options, app) => {
  return async function checkToken(ctx, next) {
    /* token访问白名单地址 */
    const white_list = [
      '/api/user/register',
      '/api/user/login'
    ];
    /* 检查请求地址是否白名单 */
    if (white_list.indexOf(ctx.request.url.split('?')[0]) > -1) {
      console.log('白名单放行' + ctx.request.url);
    } else {
      /* 检查请求头是否携带token */
      if (!ctx.request.header.authorization) {
        ctx.status = 401;
        ctx.body = app.config.msg.NOT_ACCESS;
        return;
      }
      /* 去掉Authorization Bearer */
      const token = ctx.request.header.authorization.split(' ')[1];
      /* 解码token获取邮箱和姓名 */
      const { phone, name } = app.jwt.decode(token).data;
      const redis_token = await app.redis.get(phone);
      /* token正确性访问检查 */
      if (redis_token === token) {
        console.log('token正确');
        /* 用户访问日志记录 */
        ctx.swLog.info(`[${phone}][${name}]`);
      } else {
        ctx.status = 401;
        ctx.body = app.config.msg.TOKEN_ERR;
        return;
      }
    }
    await next();
  };
};
