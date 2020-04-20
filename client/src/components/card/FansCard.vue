<template>
  <div class="fans-card" @click="goToUserInfoPage">
    <img :src="item.user.image" alt="" class="user-img">
    <div class="user-info">
      <div class="user-name">
        <img :src="item.user.sex === '男' ? require('@/assets/images/man-icon.png') : require('@/assets/images/woman-icon.png')" alt="" class="sex">
        <span class="name">{{ item.user.name }}</span>
      </div>
      <div class="desc">来自{{ item.user.school }}的同学，{{ item.user.birthday }}出生的{{ item.user.sex }}生，他/她的联系方式是：{{ item.user.phone }}, 他/她的个性签名是：{{ item.user.sign }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fans-card',
  data() {
    return {
      isFollow: false
    };
  },
  props: ['item'],
  methods: {
    goToUserInfoPage() {
      this.$router.push({ path: '/userInfoPage', query: {
        id: this.item.user._id
      }})
    }
  },
};
</script>

<style lang='scss' scoped>
.fans-card {
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
      width: 530px;
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
  .van-button--info {
    color: #fff;
  }
}
</style>
