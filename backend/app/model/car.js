'use strict';

/**
 * @description: Mongoose car Schema
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CarSchema = new Schema({
    user: { /* 用户id */
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
    create_time: { type: String }, /* 加入购物车时间 */
  });

  return mongoose.model('Car', CarSchema);
};
