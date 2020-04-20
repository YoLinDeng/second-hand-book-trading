<template>
  <div class="login-wrapper">
    <img :src="require('@/assets/images/left-jt.png')" alt class="back-icon" @click="goBack" />
    <img :src="require('@/assets/images/unlogin-tx.png')" alt class="user-tx" />
    <div @click="goToRegister" class="resiter">注册</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue';
import { Form, Toast } from 'vant';
import * as types from '@/store/mutation-types'
Vue.use(Form);
export default {
  name: "login",
  data() {
    return {
      phone: '',
      password: ''
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
     onSubmit() {
      this.API.login({
        phone: this.phone,
        password: this.password
      }).then(res => {
        Toast('登录成功');
        this.$store.commit(types.RECORD_USER_TOKEN, res.token)
        this.$store.commit(types.RECORD_USER_INFO, res.userInfo)
        this.$router.push('/')
      }).catch(() => {})
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
};
</script>

<style lang='scss' scoped>
body {
  overflow: hidden !important;
}
.login-wrapper {
  width: 750px;
  height: 1330px;
  background: url("../assets/images/login-bg.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  position: relative;
  .back-icon {
    width: 50px;
    height: 50px;
    display: inline-block;
    position: absolute;
    left: 10px;
    top: 20px;
  }
  .user-tx {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 200px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .van-form {
    width: 660px;
    position: absolute;
    top: 450px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .resiter {
    font-size: 24px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 20px;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
  }
}
</style>
