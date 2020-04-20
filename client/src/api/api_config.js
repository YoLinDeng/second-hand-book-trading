export default {
  // 登录接口
  login: {
    url: '/api/user/login',
    method: 'post'
  },
  // 注册接口
  register: {
    url: '/api/user/register',
    method: 'post'
  },
  // 获取用户信息通过token
  getUserInfo: {
    url: '/api/user/info',
    method: 'post'
  },
  getUserInfoById: {
    url: '/api/user/info/get',
    method: 'get'
  },
  // 修改用户头像
  updateImage: {
    url: '/api/user/image/update',
    method: 'post'
  },
  // 修改用户信息
  updateUserInfo: {
    url: '/api/user/info/update',
    method: 'post'
  },
  // 上传书籍图片
  bookImageUpload: {
    url: '/api/book/upload',
    method: 'post'
  },
  // 获取书籍分类列表
  getBookClassify: {
    url: '/api/book/classify/get',
    method: 'get'
  },
  // 发布书籍图片
  publish: {
    url: '/api/book/publish',
    method: 'post'
  },
  // 查询书籍列表
  findBook: {
    url: '/api/book/find',
    method: 'get'
  },
  // 查询书籍信息
  getBookInfo: {
    url: '/api/book/info',
    method: 'get'
  },
  // 查询书籍信息
  lookBook: {
    url: '/api/book/look',
    method: 'get'
  },
  // 下单
  placeOrder: {
    url: '/api/order/create',
    method: 'post'
  },
  // 查询订单
  findOrder: {
    url: '/api/order/find',
    method: 'get'
  },
  // 添加购物车
  addCar: {
    url: '/api/car/add',
    method: 'post'
  },
  // 查询购物车
  findCar: {
    url: '/api/car/list',
    method: 'get'
  },
  // 删除购物车
  deleteCar: {
    url: '/api/car/delete',
    method: 'post'
  },
  // 新建评论
  createComment: {
    url: '/api/comment/create',
    method: 'post'
  },
  // 查询评论
  findComment: {
    url: '/api/comment/find',
    method: 'get'
  },
  // 用户点赞书籍
  starBook: {
    url: '/api/user/star',
    method: 'get'
  },
  // 用户取消点赞书籍
  cancelStar: {
    url: '/api/user/star/cancel',
    method: 'get'
  },
  // 用户是否点赞书籍
  isStar: {
    url: '/api/user/star/is',
    method: 'get'
  },
  // 用户超赞列表
  starList: {
    url: '/api/user/star/list',
    method: 'get'
  },
  // 用户收藏书籍
  collectBook: {
    url: '/api/user/collect',
    method: 'get'
  },
  // 用户取消点赞书籍
  cancelCollect: {
    url: '/api/user/collect/cancel',
    method: 'get'
  },
  // 用户是否点赞书籍
  isCollect: {
    url: '/api/user/collect/is',
    method: 'get'
  },
  // 用户收藏列表
  collectList: {
    url: '/api/user/collect/list',
    method: 'get'
  },
  // 关注用户
  followUser: {
    url: '/api/user/follow',
    method: 'get'
  },
  // 关注用户
  cancelFollowUser: {
    url: '/api/user/follow/cancel',
    method: 'get'
  },
  // 查询用户是否已关注该用户
  userIsFollow: {
    url: '/api/user/follow/is',
    method: 'get'
  },
  // 查询用户关注列表
  followList: {
    url: '/api/user/follow/list',
    method: 'get'
  },
  // 查询用户粉丝列表
  fansList: {
    url: '/api/user/fans/list',
    method: 'get'
  },
  // 用户浏览书籍历史记录
  createHistory: {
    url: '/api/user/history/create',
    method: 'post'
  },
  // 用户浏览书籍历史记录
  findHistoryList: {
    url: '/api/user/history/list',
    method: 'get'
  },
  // 删除发布书籍
  deletePublish: {
    url: '/api/book/delete',
    method: 'post'
  },
  // 更改订单状态
  changeOrderStatus: {
    url: '/api/order/status/change',
    method: 'post'
  },
  // 查询订单详情
  findOrderDetail: {
    url: '/api/order/detail',
    method: 'post'
  },
  // 获取校园快讯
  getNews: {
    url: '/api/admin/news/list',
    method: 'get'
  }
}