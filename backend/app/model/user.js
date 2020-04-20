'use strict';

/**
 * @description: Mongoose User Classify Schema,
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    phone: { type: String }, /* 手机号 */
    password: { type: String }, /* 用户密码默认为邮箱 加密方式 sha1(sha1(account)+account) */
    name: { type: String }, /* 用户姓名 */
    birthday: { type: String }, /* 生日 */
    school: { type: String }, /* 学校 */
    sex: { type: String }, /* 性别 */
    create_time: { type: String }, /* 创建时间 */
    login_time: { type: String }, /* 登录时间 */
    address: { type: String }, /* 地址 */
    sign: { type: String }, /* 个性签名 */
    image: { type: String }, /* 用户头像地址 */
  });
  return mongoose.model('User', UserSchema);
};
