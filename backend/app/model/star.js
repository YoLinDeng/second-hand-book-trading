'use strict';

/**
 * @description: Mongoose star Schema
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const StarSchema = new Schema({
    user: { /* 点赞人id */
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
    create_time: { type: String }, /* 点赞时间 */
  });

  return mongoose.model('Star', StarSchema);
};
