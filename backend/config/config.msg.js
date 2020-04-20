'use strict';

/**
 * @description: API请求返回的文字以及成功状态
 */

module.exports = {
  LOGIN_SUCCESS: {
    success: true,
    code: '0000',
    message: '登录成功',
  },
  LOGOUT_SUCCESS: {
    success: true,
    code: '0000',
    message: '退出成功',
  },
  GET_SUCCESS: {
    success: true,
    code: '0000',
    message: '成功',
  },
  SUCCESS: {
    success: true,
    code: '0000',
    message: '成功',
  },
  ERR: {
    success: false,
    message: '失败'
  },
  GET_ERR: {
    success: false,
    message: '获取失败',
  },
  REGISTER_SUCCESS: {
    success: true,
    code: '0000',
    message: '注册成功',
  },
  REGISTER_ERR: {
    success: false,
    message: '注册失败',
  },
  LOGIN_ERR: {
    success: false,
    message: '用户名或密码错误',
  },
  PHONE_USED: {
    success: false,
    message: '创建失败, 手机号已被注册',
  },
  ADMIN_NAME_EXIT: {
    success: false,
    message: '创建失败, 管理员名称已存在',
  },
  HAS_ADD_CAR: {
    success: false,
    message: '已经加入购物车了',
  },
  HAS_PLACE_ORDER: {
    success: false,
    message: '您已下过单了，请勿重复下单',
  },
  EDIT_SUCCESS: {
    success: true,
    code: '0000',
    message: '修改成功',
  },
  EDIT_ERR: {
    success: false,
    message: '修改失败',
  },
  DEL_SUCCESS: {
    success: true,
    code: '0000',
    message: '删除成功',
  },
  DEL_FAIL: {
    success: false,
    message: '删除失败',
  },
  CREARE_SUCCESS: {
    success: true,
    code: '0000',
    message: '创建成功',
  },
  ADD_ERR: {
    success: false,
    message: '添加购物车失败',
  },
  CREARE_ERR: {
    success: false,
    message: '创建失败',
  },
  PUBLISH_SUCCESS: {
    success: true,
    code: '0000',
    message: '发布成功',
  },
  PUBLISH_FAIL: {
    success: false,
    message: '发布失败',
  },
  PLACE_ORDER_SUCCESS: {
    success: true,
    code: '0000',
    message: '下单成功',
  },
  PLACE_ORDER_FAIL: {
    success: false,
    message: '下单失败',
  },
  NOT_ACCESS: {
    success: false,
    message: '无权限',
  },
  ADMIN_NOT_EDIT: {
    success: false,
    message: '超级管理员信息不可修改',
  },
  ADMIN_NOT_DEL: {
    success: false,
    message: '超级管理员不可删除',
  }
};
