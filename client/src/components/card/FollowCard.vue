<template>
  <div class="follow-card" @click="goToUserInfoPage">
    <img :src="item.f_user.image" alt="" class="user-img">
    <div class="user-info">
      <div class="user-name">
        <img :src="item.f_user.sex === '男' ? require('@/assets/images/man-icon.png') : require('@/assets/images/woman-icon.png')" alt="" class="sex">
        <span class="name">{{ item.f_user.name }}</span>
      </div>
      <div class="desc">来自{{ item.f_user.school }}的同学，{{ item.f_user.birthday }}出生的{{ item.f_user.sex }}生，他/她的联系方式是：{{ item.f_user.phone }}, 他/她的个性签名是：{{ item.f_user.sign }}</div>
    </div>
    <van-button type="info" icon="star-o" v-if="!isFollow" @click.stop="follow">关注</van-button>
    <van-button type="default" v-else @click.stop="follow">已关注</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'follow-card',
  data() {
    return {
      isFollow: true,
      name: 'tim hello'
    }
  },
  props: ['item'],
  components: {

  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    })
  },
  methods: {
    follow() {
      if (this.isFollow) {
        this.API.cancelFollowUser({
          user: this.info._id,
          fUser: this.item.f_user._id
        }).then(res => {
          console.log(res)
        })
        this.isFollow = false
      } else {
        this.API.followUser({
          user: this.info._id,
          fUser: this.item.f_user._id
        }).then(res => {
          console.log(res)
        })
        this.isFollow = true
      }
    },
    goToUserInfoPage() {
      this.$router.push({ path: '/userInfoPage', query: {
        id: this.item.f_user._id
      }})
    }
  }
}
</script>

<style lang="scss" scoped>
.follow-card {
  width: 690px;
  height: 160px;
  background: #fff;
  margin: 15px auto;
  border-radius: 20px;
  position: relative;
  .user-img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .user-info {
    position: absolute;
    left: 120px;
    top: 15px;
    .user-name {
      .sex {
        width: 35px;
        height: 35px;
        position: relative;
        top: 6px;
      }
      .name {
        font-size: 30px;
        font-weight: bold;
        color: #333;
        margin-left: 5px;
      }
    }
    .desc {
      width: 360px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #333;
      font-size: 26px;
      margin-top: 3px;
    }
   .fans-num {
     display: inline-block;
     font-size: 24px;
     color: #999;
     margin-top: 15px; 
   } 
  }
  .van-button--normal {
    position: absolute;
    right: 30px;
    top: 60px;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    color: #333;
  }
  .van-button {
    border: 1px solid #ccc;
  }
  .van-button--info {
    color: #fff;
  }
}
</style>