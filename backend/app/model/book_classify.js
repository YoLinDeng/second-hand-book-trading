'use strict';

/**
 * @description: Mongoose Book Classify Schema
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BookClassifySchema = new Schema({
    name: { type: String }, /* 书籍分类分类名 */
    create_time: { type: String }, /* 创建时间 */
  });

  return mongoose.model('BookClassify', BookClassifySchema);
};
