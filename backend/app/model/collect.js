'use strict';

/**
 * @description: Mongoose collect Schema
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CollectSchema = new Schema({
    user: { /* 收藏人id */
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
    create_time: { type: String }, /* 收藏时间 */
  });

  return mongoose.model('Collect', CollectSchema);
};
