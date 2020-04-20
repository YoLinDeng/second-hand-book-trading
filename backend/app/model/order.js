'use strict';

/**
 * @description: Mongoose order Schema
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const OrderSchema = new Schema({
    name: { type: String }, /* 书籍分类分类名 */
    buyer: { /* 买家id */
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    seller: { /* 卖家id */
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    book: { /* 书籍id */
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
    create_time: { type: String }, /* 下单时间 */
    status: { type: String }, /* 状态，1：已下单、2：已取消、3：已完成*/
  });

  return mongoose.model('Order', OrderSchema);
};
