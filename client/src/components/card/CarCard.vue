<template>
  <div class="car-card">
    <div class="user-info" @click="goToUserInfoPage">
      <img :src="item.seller.image" alt="" class="user-img">
      <span class="user-name">{{ item.seller.name }}</span>
    </div>
    <section class="gooods-box" @click="goToBookDetail(item)">
      <img :src="item.book.image[0]" alt="" class="goods-img">
      <div class="goods-info">
        <div class="desc">{{ item.book.desc }}</div>
        <div class="price">￥{{ item.book.price }}</div>
      </div>
    </section>
    <div class="footer-btn">
      <van-button type="default" @click="deleteItem(item._id)">删除</van-button>
      <van-button type="info" @click="confirm(item._id)">立即下单</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Dialog, Toast } from 'vant';
Vue.use(Dialog);
Vue.use(Toast);
export default {
  name: 'car-card',
  data() {
    return {
    };
  },
  props: ['item'],
  methods: {
    deleteItem(id) {
      Dialog.confirm({
        title: "提示",
        message: "确定要删除这项购物车信息吗？"
      }).then(() => {
        this.API.deleteCar({
          carId: id
        }).then(res => {
          if (res.success) {
            Toast('删除成功')
            this.$emit('delete')
          }
        })
        }).catch(() => {
        });
    },
    confirm(id) {
      Dialog.confirm({
        title: "提示",
        message: "确定要立即下单吗？"
      }).then(() => {
        this.API.deleteCar({
          carId: id
        })
        this.$router.push({ path: '/confirmOrder', query: {
          id: this.item.book._id
        }})
        }).catch(() => {
        });
    },
    goToUserInfoPage() {
      this.$router.push({ path: '/userInfoPage', query: {
        id: this.item.seller._id
      }})
    },
    goToBookDetail() {
      this.$router.push({ path: '/bookDetail', query: {
        id: this.item.book._id
      }})
    }
  },
};
</script>

<style lang='scss' scoped>
.car-card {
  width: 730px;
  height: 300px;
  background: #fff;
  border-radius: 8px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 20px;
  .user-info {
    position: relative;
    height: 85px;
    .user-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: inline-block;
      position: absolute;
      left: 20px;
      top: 15px;
    }
    .user-name {
      font-size: 28px;
      color: #333;
      position: absolute;
      left: 95px;
      top: 25px;
      font-weight: bold;
    }
  }
  .goods-img {
    width: 120px;
    height: 120px;
    display: inline-block;
    border-radius: 8px;
    position: absolute;
    left: 20px;
    top: 90px;
  }
  .goods-info {
    position: absolute;
    left: 170px;
    top: 90px;
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
      font-size: 28px;
      font-weight: bold;
    }
    .price {
      font-size: 28px;
      color: red;
      margin-top: 12px;
    }
  }
  .footer-btn {
    position: absolute;
    bottom: 20px;
    right: 10px;
    .van-button {
      // width: 150px;
      height: 60px;
      line-height: 60px;
      font-size: 26px;
      margin-right: 20px;
    }
  }
}
</style>
