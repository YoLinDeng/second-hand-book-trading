'use strict';

/**
 * @description: Mongoose comment Schema,
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CommentSchema = new Schema({
    from: { /* 评论人id */
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    to: { /* 被评论人id */
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: { type: String }, /* 内容 */
    create_time: { type: String }, /* 评论时间 */
    book: { /* 书籍id */
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
    parent_id: { type: String, required: true, default: 0 } /* 父级 */
  });
  return mongoose.model('Comment', CommentSchema);
};
