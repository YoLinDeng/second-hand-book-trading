<template>
  <div class="register-wrapper">
    <section class="header">
      <img :src="require('@/assets/images/left-jt.png')" alt class="back-icon" @click="goBack" />
      <span class="title">注册用户</span>
    </section>
    <van-form validate-first @submit="submit">
      <van-field 
        v-model="userName" 
        name="用户名" label="用户名" 
        placeholder="请输入用户名" 
        :rules="[{ pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]{2,6}/, message: '必须是中文或英文或数字，长度2-6位字符' }]"
        />
      <van-field 
        v-model="phone" 
        name="手机号" label="手机号" 
        placeholder="请输入手机号"
        :maxlength="11"
        type="tel"
        :rules="[{ pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '手机号格式错误' }]"/>
      <van-field 
        v-model="password" 
        name="密码" label="密码" 
        placeholder="请输入密码"
        :maxlength="10"
        type="password"
        :rules="[{ pattern: /[a-zA-Z0-9]{6,10}/, message: '密码必须为数字或字母组合，长度6-10' }]"/>
        <van-field 
          v-model="cPassword" 
          name="确认密码" label="确认密码" 
          placeholder="请输入确认密码"
          :maxlength="10"
          type="password"
          :rules="[{ pattern: /[a-zA-Z0-9]{6,10}/, message: '密码必须为数字或字母组合，长度6-10' }]"/>
        <van-field name="sex" label="性别">
          <template #input>
            <van-radio-group v-model="sex" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="birthday"
          label="生日"
          placeholder="点击选择生日"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请填写生日' }]"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @change="change"
            @confirm="confirm"
            @cancel="cancel"
          />
        </van-popup>
        <van-field 
          v-model="school" 
          name="学校" label="学校" 
          placeholder="请输入学校"
          :maxlength="20"
          :rules="[{ required: true, message: '请输入你的学校' }]"
        />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">立即注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  name: "register",
  data() {
    return {
      userName: '',
      phone: '',
      password: '',
      sex: '男',
      cPassword: '',
      birthday: '',
      school: '',
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(1999, 0, 1)
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      if (this.password !== this.cPassword) {
        Toast('密码与确认密码必须相同');
      } else {
        this.API.register({     
          name: this.userName,
          phone: this.phone,
          password: this.password,
          sex: this.sex,
          birthday: this.birthday,
          school: this.school 
        }).then(res => {
          if (res.code === '0000') {
            Toast('注册成功');
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
          }
        }).catch(() => {})
      }
    },
    confirm(d) {
      this.birthday =  d.getFullYear() + '年' + (Number(d.getMonth()) + 1) + '月' + d.getDate() + '日 '
      this.showPicker = false
    },
    cancel() {
      this.showPicker = false
    },
    change() {
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`
      }
      return value;
    }
  }
};
</script>

<style lang='scss' scoped>
.register-wrapper {
  width: 750px;
  height: 1330px;
  background: url("../assets/images/login-bg.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
  position: relative;
  .header {
    position: relative;
    .back-icon {
      width: 50px;
      height: 50px;
      display: inline-block;
      position: absolute;
      left: 10px;
      top: 20px;
    }
    .title {
      font-size: 32px;
      color: #fff;
      position: absolute;
      top: 20px;
      left: 320px;
      font-weight: bold;
    }
  }
  .van-form {
    width: 690px;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
