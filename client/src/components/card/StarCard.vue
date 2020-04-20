<template>
  <div class="star-card">
    <img :src="item.user.image" alt="" class="user-img">
    <div class="user-info">
      <div class="user-name">{{ item.user.name }}</div>
      <div class="desc">给你的宝贝一个赞|{{ item.create_time }}</div>
    </div>
    <img :src="item.book.image[0]" alt="" class="goods-img">
  </div>
</template>

<script>
export default {
  name: 'star-card',
  data() {
    return {
    }
  },
  props: ['item'],
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.star-card {
  position: relative;
  width: 690px;
  height: 120px;
  border-bottom: 0.01rem solid #dcdcdc;
  left: 0;
  right: 0;
  margin: auto;
  .user-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .user-info {
    position: absolute;
    left: 110px;
    top: 20px;
    .user-name {
      font-size: 28px;
      font-weight: bolder;
      color: #333;
    }
    .desc {
      font-size: 26px;
      color: #999;
    }
  }
  .goods-img {
    position: absolute;
    right: 0;
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: px;
    top: 20px;
  }
}
</style>