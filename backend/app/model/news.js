'use strict';

/**
 * @description: Mongoose news Schema,
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const NewsSchema = new Schema({
    image: { type: String }, /* 图片 */
    link: { type: String }, /* 链接 */
    create_time: { type: String }, /* 创建时间 */
  });
  return mongoose.model('News', NewsSchema);
};
