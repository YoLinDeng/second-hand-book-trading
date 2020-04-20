'use strict';

/**
 * @description: Mongoose fans Schema
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FansSchema = new Schema({
    user: { /* 用户id */
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    f_user: { /* 被关注者id */
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  });

  return mongoose.model('Fans', FansSchema);
};
