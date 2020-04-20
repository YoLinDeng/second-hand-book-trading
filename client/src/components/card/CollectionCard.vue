<template>
  <div class="collection-card">
    <div class="user-info">
      <img :src="item.seller.image" alt="" class="user-img">
      <div class="user-name">
        <img :src="item.sex === '男' ? require('@/assets/images/man-icon.png') : require('@/assets/images/woman-icon.png')" alt="" class="sex">
        <span class="name">{{ item.seller.name }}</span>
      </div>
      <div class="price">￥{{ item.book.price }}</div>
    </div>
    <div class="goods-info">
      <div class="goods-img">
        <img :src="item" alt="" class="item" v-for="(item, index) in item.book.image" :key="index">
      </div>
      <div class="desc">{{ item.book.desc }}</div>
    </div>
    <div class="footer-btn">
      <van-button icon="star-o" type="info" v-if="isCollection" @click="clickCollection">取消收藏</van-button>
      <van-button icon="star-o" type="default" v-else @click="clickCollection">收藏</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'collection-card',
  data() {
    return {
      isCollection: true
    };
  },
  props: ['item'],
  computed: {
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    }),
  },
  methods: {
    clickCollection() {
      if (this.isCollection) {
        this.API.cancelCollect({
          user: this.info._id,
          book: this.item.book._id
        }).then(res => {
          console.log(res)
        })
      } else {
        this.API.collectBook({
          user: this.info._id,
          book: this.item.book._id,
          seller: this.item.seller._id
        }).then(res => {
          console.log(res)
        })
      }
      this.isCollection ? this.isCollection = false : this.isCollection = true
    }
  },
};
</script>

<style lang='scss' scoped>
.collection-card {
  width: 750px;
  height: 530px;
  background: #fff;
  margin: 0 auto;
  position: relative;
  margin-bottom: 30px;
  .user-info {
    width: 100%;
    height: 120px;
    position: relative;
    .user-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: inline-block;
      background: #ccc;
      position: absolute;
      left: 20px;
      top: 20px;
    }
    .user-name {
      position: absolute;
      left: 85px;
      top: 23px;
      .sex {
        width: 35px;
        height: 35px;
        position: relative;
        top: 6px;
      }
      .name {
        font-size: 28px;
        font-weight: bold;
        color: #333;
        margin-left: 5px;
      }
    }
    .price {
      color: red;
      font-size: 30px;
      font-weight: bold;
      position: absolute;
      right: 30px;
      top: 25px;
    }
  }
  .goods-info {
    padding: 0 10px;
    .goods-img {
      .item {
        display: inline-block;
        width: 220px;
        height: 220px;
        border-radius: 8px;
        display: inline-block;
        background: #ccc;
        margin: 0 10px;
      }
    }
  }
  .desc {
    margin: 20px auto;
    width: 700px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #333;
    font-size: 28px;
  }
  .footer-btn {
    position: absolute;
    right: 25px;
    bottom: 23px;
    .van-button {
      height: 60px;
      line-height: 60px;
      font-size: 24px;
    }
  }
}
</style>
