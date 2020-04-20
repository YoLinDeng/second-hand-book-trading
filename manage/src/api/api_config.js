export default {
  // 管理员登录接口
  login: {
    url: '/api/admin/login',
    method: 'post'
  },
  //添加用户接口
  create: {
    url: '/api/admin/create',
    method: 'post'
  },
  //获取用户列表接口
  userList: {
    url: '/api/admin/user/list',
    method: 'get'
  },
  //编辑用户信息接口
  updateUserInfo: {
    url: '/api/admin/user/info/edit',
    method: 'post'
  },
  //删除用户接口
  deleteUser: {
    url: '/api/admin/user/delete',
    method: 'post'
  },
  //获取管理员列表接口
  adminList: {
    url: '/api/admin/list',
    method: 'get'
  },
  //编辑管理员信息接口
  updateAdminInfo: {
    url: '/api/admin/info/edit',
    method: 'post'
  },
  //添加管理员接口
  createAdmin: {
    url: '/api/admin/create',
    method: 'post'
  },
  //删除管理员接口
  deleteAdmin: {
    url: '/api/admin/delete',
    method: 'post'
  },
  //获取书籍列表接口
  bookList: {
    url: '/api/book/find',
    method: 'get'
  },
  //删除书籍接口
  deleteBook: {
    url: '/api/book/delete',
    method: 'post'
  },
  //获取书籍分类列表接口
  bookClassifyList: {
    url: '/api/book/classify/get',
    method: 'get'
  },
  //添加书籍分类接口
  addBookClassify: {
    url: '/api/book/classify/create',
    method: 'post'
  },
  //获取订单列表接口
  orderList: {
    url: '/api/admin/order/list',
    method: 'get'
  },
  //获取留言列表接口
  commentList: {
    url: '/api/admin/comment/list',
    method: 'get'
  },
  uploadImage: {
    url: '/api/book/upload',
    method: 'post'
  },
  //添加快讯接口
  addNews: {
    url: '/api/admin/news/add',
    method: 'post'
  },
  //获取快讯列表接口
  newsList: {
    url: '/api/admin/news/list',
    method: 'get'
  },
  deleteBookClassify: {
    url: '/api/admin/book/classify/delete',
    method: 'post'
  },
  editBookClassify: {
    url: '/api/admin/book/classify/edit',
    method: 'post'
  },
  deleteComment: {
    url: '/api/admin/comment/delete',
    method: 'post'
  },
  deleteNews: {
    url: '/api/admin/news/delete',
    method: 'post'
  },
  editNews: {
    url: '/api/admin/news/edit',
    method: 'post'
  },
}