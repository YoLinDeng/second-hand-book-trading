'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
   /**
   * 用户相关部分
   */
  // 登录
  router.post('/api/user/login', controller.user.login);
  // 注册
  router.post('/api/user/register', controller.user.register);
  // 获取用户信息通过token
  router.post('/api/user/info', controller.user.getUserInfo);
  // 获取用户信息通过id
  router.get('/api/user/info/get', controller.user.getUserInfoById);
  // 更新用户头像
  router.post('/api/user/image/update', controller.user.updateUserImage);
  // 修改用户信息
  router.post('/api/user/info/update', controller.user.updateUserInfo);
  // 用户点赞书籍
  router.get('/api/user/star', controller.user.starBook);
  // 用户取消点赞书籍
  router.get('/api/user/star/cancel', controller.user.cancelStar);
  // 查询用户是否点赞书籍
  router.get('/api/user/star/is', controller.user.findUserStarBook);
  // 查询用户超赞列表
  router.get('/api/user/star/list', controller.user.findUserStarList);
  // 用户收藏书籍
  router.get('/api/user/collect', controller.user.collectBook);
  // 用户取消收藏书籍
  router.get('/api/user/collect/cancel', controller.user.cancelCollect);
  // 查询用户是否收藏书籍
  router.get('/api/user/collect/is', controller.user.findUserCollectBook);
  // 查询用户收藏列表
  router.get('/api/user/collect/list', controller.user.findUserCollectList);
  // 关注用户
  router.get('/api/user/follow', controller.user.followUser);
  // 取消关注用户
  router.get('/api/user/follow/cancel', controller.user.cancelFollowUser);
  // 查询用户是否已关注该用户
  router.get('/api/user/follow/is', controller.user.findUserIsFollow);
  // 查询用户关注列表
  router.get('/api/user/follow/list', controller.user.findFollowList);
  // 查询用户粉丝列表
  router.get('/api/user/fans/list', controller.user.findFansList);
  // 用户浏览书籍历史记录
  router.post('/api/user/history/create', controller.user.createHistory);
  // 用户浏览书籍历史记录
  router.get('/api/user/history/list', controller.user.findHistoryList);

  /**
   * 书籍相关部分
   */
  // 发布书籍
  router.post('/api/book/publish', controller.book.publish);
  // 上传书籍图片
  router.post('/api/book/upload', controller.book.upload);
  // 创建书籍分类
  router.post('/api/book/classify/create', controller.book.createClassify);
  // 查询书籍分类
  router.get('/api/book/classify/get', controller.book.getClassify);
  // 查询书籍列表
  router.get('/api/book/find', controller.book.findbookList);
  // 查询书籍信息
  router.get('/api/book/info', controller.book.getBookInfo);
  // 浏览书籍信息
  router.get('/api/book/look', controller.book.lookBook);
  // 删除发布书籍
  router.post('/api/book/delete', controller.book.deletePublish);

  /**
   * 订单相关部分
   */
  // 下单
  router.post('/api/order/create', controller.order.placeOrder);
  // 查询订单
  router.get('/api/order/find', controller.order.findOrder);
  // 更改订单状态
  router.post('/api/order/status/change', controller.order.changeOrderStatus);
  // 查询订单详情
  router.post('/api/order/detail', controller.order.findOrderDetail);


  /**
   * 购物车相关部分
   */
  // 添加购物车
  router.post('/api/car/add', controller.car.add);
  // 查询购物车列表
  router.get('/api/car/list', controller.car.find);
  // 删除购物车
  router.post('/api/car/delete', controller.car.delete);
  

  /**
   * 购物车相关部分
   */
  // 新建评论
  router.post('/api/comment/create', controller.comment.create);
  // 查询评论
  router.get('/api/comment/find', controller.comment.find);

  /**
   * 管理员相关部分
   */
  // 管理员登录
  router.post('/api/admin/login', controller.admin.login);
  // 管理员创建
  router.post('/api/admin/create', controller.admin.create);
  // 获取用户列表
  router.get('/api/admin/user/list', controller.admin.userList);
  // 修改用户信息
  router.post('/api/admin/user/info/edit', controller.admin.updateUser);
  // 删除用户
  router.post('/api/admin/user/delete', controller.admin.deleteUser);
  // 获取管理列表列表
  router.get('/api/admin/list', controller.admin.adminList);
  // 修改管理员信息
  router.post('/api/admin/info/edit', controller.admin.updateAdminInfo);
  // 删除管理员
  router.post('/api/admin/delete', controller.admin.deleteAdmin);
  // 获取订单列表
  router.get('/api/admin/order/list', controller.admin.orderList);
  // 获取评论列表
  router.get('/api/admin/comment/list', controller.admin.commentList);
  // 添加校园快讯
  router.post('/api/admin/news/add', controller.admin.addNews);
  // 获取校园快讯
  router.get('/api/admin/news/list', controller.admin.newsList);
  // 删除书籍分类
  router.post('/api/admin/book/classify/delete', controller.admin.deleteBookClassify);
  // 修改书籍分类
  router.post('/api/admin/book/classify/edit', controller.admin.editBookClassify);
  // 删除评论
  router.post('/api/admin/comment/delete', controller.admin.deleteComment);
  // 删除快讯
  router.post('/api/admin/news/delete', controller.admin.deleteNews);
  // 修改快讯
  router.post('/api/admin/news/edit', controller.admin.editNews);
};
