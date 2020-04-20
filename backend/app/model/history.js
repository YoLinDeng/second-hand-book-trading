'use strict';

/**
 * @description: Mongoose history Schema,
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const HistorySchema = new Schema({
    user: { /* 书籍发布者id */
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    book: { /* 书籍id */
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
    create_time: { type: String }, /* 创建时间 */
  });
  return mongoose.model('History', HistorySchema);
};
