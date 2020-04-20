'use strict';

/**
 * @description: Mongoose book Schema,
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const BookSchema = new Schema({
    desc: { type: String }, /* 书籍描述 */
    name: { type: String }, /* 书籍名称 */
    press: { type: String }, /* 出版社 */
    author: { type: String }, /* 作者 */
    image: { type: Array }, /* 书籍图片列表*/
    price: { type: String }, /* 价格 */
    book_type: { /* 书籍分类id */
      type: Schema.Types.ObjectId,
      ref: 'BookClassify',
    },
    user: { /* 书籍发布者id */
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    create_time: { type: String }, /* 创建时间 */
    status: { type: String }, /* 状态，1：待购买，2：已购买*/
    look: { type: Number } /* 浏览数量 */
  });
  return mongoose.model('Book', BookSchema);
};
