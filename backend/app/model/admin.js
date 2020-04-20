'use strict';

/**
 * @description: Mongoose admin Schema
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema({
    name: { type: String }, /* 管理员名称 */
    password: { type: String }, /* 密码 */
    create_time: { type: String }, /* 创建时间 */
  });

  return mongoose.model('Admin', AdminSchema);
};
