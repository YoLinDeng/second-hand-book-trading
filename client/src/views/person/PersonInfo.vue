<template>
  <div class="person-info">
    <app-header :title="title"></app-header>
    <section class="user-tx" is-link @click="changeIcon">
      <span class="item-name">头像</span>
      <img :src="userImg" alt="用户头像" class="user-img" v-if="userImg" />
      <img
        :src="
          sex === '男'
            ? require('@/assets/images/man-tx.png')
            : require('@/assets/images/woman-tx.png')
        "
        alt="用户头像"
        class="user-img"
        v-else
      />
      <img src="@/assets/images/person-right-jt.png" alt class="right-jt" />
      <input type="file" ref="file" :accept="accept" @change="changeImage">
    </section>
    <van-cell-group>
      <van-cell title="用户名" is-link :value="userName" @click.native="editName" />
      <van-cell title="手机号" :value="phone" />
      <van-cell title="性别" is-link :value="sex" @click.native="showPopup" />
      <van-cell title="生日" is-link :value="brithday" @click.native="openDatePicker" />
      <van-cell title="我的地址" is-link @click.native="editAddress" />
      <van-cell title="我的学校" is-link @click.native="editSchool" />
      <van-cell title="个性签名" is-link @click.native="editSign" />
    </van-cell-group>
    <div class="sign-out" @click="signOut">退出登录</div>
    <date-picker v-show="isShowDateLayer" @hide="hide" @confirm="confirm"></date-picker>
    <van-popup v-model="isShowSexPopup" class="sex-popup">
      <van-cell-group>
        <van-cell title="男"  is-link @click.native="changeSex('男')"/>
        <van-cell title="女"  is-link @click.native="changeSex('女')"/>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import DatePicker from "@/components/DatePicker";
import Vue from "vue";
import * as types from '@/store/mutation-types'
import { mapState } from "vuex";
import { Cell, CellGroup, Dialog, Toast } from "vant";
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Cell).use(CellGroup);
export default {
  data() {
    return {
      title: "个人信息",
      sex: "女",
      userImg: "",
      userName: "754",
      phone: "15016103139",
      brithday: "1998年4月9日",
      address: "广东惠州",
      sign: "快乐不能丢",
      isShowDateLayer: false,
      isShowSexPopup: false,
      accept: 'image/*',
      maxSize: 3000000, // (单位:b = 字节, 1mb = 1024000b)
    };
  },
  components: {
    AppHeader,
    DatePicker
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token) {
        Promise.all([vm.API.getUserInfo({ token: vm.token })]).then(([infoRes]) => {
          vm.userImg = infoRes.bean.image
          vm.userName = infoRes.bean.name
          vm.phone = infoRes.bean.phone
          vm.address = infoRes.bean.address
          vm.school = infoRes.bean.school
          vm.brithday = infoRes.bean.birthday
          vm.sign = infoRes.bean.sign
          vm.sex = infoRes.bean.sex
        }).catch(() => {})
      }    
    })
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      info: state => state.user.info
    })
  },
  methods: {
    changeImage(e) {
      let file = e.target.files[0]
      if (file.size > this.maxSize) {
        Dialog('图片太大了')
      } else {
        let formData = new FormData()
        formData.append('phone', this.phone)
        formData.append('img', file)
        this.API.updateImage(formData).then(res => {
          this.userImg = res.path
        })
      }
    },
    changeIcon () {
      this.$refs.file.click()
    },
    editName() {
      this.$router.push({
        name: "editPage",
        params: {
          title: "更改名字",
          placeholder: "请输入用户名",
          value: this.userName,
          key: 'name',
          desc: "好的名字能让买家更好的记住你~"
        }
      });
    },
    editAddress() {
      this.$router.push({
        name: "editPage",
        params: {
          title: "更改地址",
          placeholder: "请输入你的地址",
          value: this.address,
          key: 'address',
          desc: "真实地址让交易更可靠~"
        }
      });
    },
    editSchool() {
      this.$router.push({
        name: "editPage",
        params: {
          title: "更改学校",
          placeholder: "请输入你的学校",
          value: this.school,
          key: 'school',
          desc: "真实学校让交易更可靠~"
        }
      });
    },
    editSign() {
      this.$router.push({
        name: "editPage",
        params: {
          title: "更改个性签名",
          placeholder: "请输入你的个性签名",
          value: this.sign,
          key: 'sign',
          desc: "个性签名彰显你的个性~"
        }
      });
    },
    openDatePicker() {
      this.isShowDateLayer = true;
    },
    hide() {
      this.isShowDateLayer = false;
    },
    confirm(date) {
      this.API.updateUserInfo({
        phone: this.info.phone,
        birthday: date
      }).then(res => {
        console.log(res)
        this.isShowDateLayer = false;
        this.brithday = date;
      })
    },
    showPopup() {
      this.isShowSexPopup = true;
    },
    changeSex(sex) {
      this.API.updateUserInfo({
        phone: this.info.phone,
        sex: sex
      }).then(res => {
        console.log(res)
        this.sex = sex;
        this.isShowSexPopup = false;
      })
    },
    signOut() {
      Dialog.confirm({
        title: "提示",
        message: "确定要退出登录吗？"
      }).then(() => {
        this.$router.push('/login')
         this.$store.commit(types.RECORD_USER_TOKEN, null)
         this.$store.commit(types.RECORD_USER_INFO, {})
        }).catch(() => {
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.person-info {
  width: 750px;
  margin: 0 auto;
  .upload-image {
    display: none;
  }
  .user-tx {
    background: #fff;
    height: 120px;
    line-height: 120px;
    margin: 0 auto;
    position: relative;
    border-bottom: 0.01rem solid #dcdcdc;
    input[type="file"] {
      display: none;
    }
    .item-name {
      font-size: 30px;
      margin-left: 30px;
    }
    .user-img {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      top: 10px;
      right: 90px;
    }
    .right-jt {
      position: absolute;
      right: 30px;
      top: 40px;
      width: 35px;
      height: 35px;
    }
  }
  .van-cell {
    height: 90px;
    line-height: 90px;
    font-size: 30px;
    padding: 0 30px;
    border-bottom: 0.01rem solid #dcdcdc;
    .van-cell__right-icon {
      line-height: 90px;
      font-size: 35px;
    }
  }
  .sex-popup {
    width: 600px;
    height: 180px;
    .van-cell__right-icon {
      display: none;
    }
  }
  .sign-out {
    width: 750px;
    height: 100px;
    background: linear-gradient(#FF4500, #FF0000);
    line-height: 100px;
    font-size: 32px;
    text-align: center;
    font-weight: bold;
    color: #fff;
  }
}
</style>
