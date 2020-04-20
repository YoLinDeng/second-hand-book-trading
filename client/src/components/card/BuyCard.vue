<template>
  <div class="my-sell-card">
    <div class="buyer-info" @click="goToUserInfoPage">
      <img :src="item.seller.image" alt="" class="buyer-img">
      <span class="buyer-name">{{ item.seller.name }}</span>
    </div>
    <div class="goods-info" @click="goToOrderDetail">
      <img :src="item.book.image[0]" alt="" class="goods-img">
      <div class="desc">{{ item.book.desc}}</div>
      <div class="price">实收款: <span>￥{{ item.book.price }}</span></div>
    </div>
    <div class="btn-box" v-if="item.status === '1'">
      <div class="cancel" @click.stop="cancel">取消订单</div>
      <div class="confirm" @click.stop="confirm">确认收货</div>
    </div>
    <div class="status">{{ statusText }}</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Dialog, Toast } from 'vant';
Vue.use(Toast);
Vue.use(Dialog);
export default {
  name: 'sell-card',
  data() {
    return {
    };
  },
  props: ['item'],
  computed: {
    statusText() {
      let text = ''
      if (this.item.status === '1') {
        text = '已下单'
      } else if (this.item.status === '2') {
        text = '已取消'
      } else if (this.item.status === '3') {
        text = '已完成'
      }
      return text
    }
  },
  methods: {
    cancel() {
      Dialog.confirm({
        title: "提示",
        message: "确定要取消该订单吗？"
      }).then(() => {
        this.API.changeOrderStatus({
          id: this.item._id,
          status: '2'
        }).then(res => {
          if (res.success) {
            Toast('订单已取消')
            this.$emit('cancel')
          }
        })
        }).catch(() => {
        });
    },
    confirm() {
      Dialog.confirm({
        title: "提示",
        message: "是否确认收货"
      }).then(() => {
        this.API.changeOrderStatus({
          id: this.item._id,
          status: '3',
          book: this.item.book._id
        }).then(res => {
          if (res.success) {
            Toast('已确认订单')
            this.$emit('confirm')
          }
        })
        }).catch(() => {
        });
    },
    goToUserInfoPage() {
      this.$router.push({ path: '/userInfoPage', query: {
        id: this.item.seller._id
      }})
    },
    goToOrderDetail() {
      this.$router.push({ path: '/orderDetail', query: {
        id: this.item._id
      }})
    }
  },
};
</script>

<style lang='scss' scoped>
.my-sell-card {
  width: 690px;
  margin: 15px auto;
  background: #fff;
  height: 200px;
  border-radius: 10px;
  position: relative;
  .buyer-info {
    position: relative;
    top: 20px;
    left: 20px;
    .buyer-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: inline-block;
    }
    .buyer-name {
      position: absolute;
      left: 50px;
      top: 5px;
      font-size: 24px;
      color: #333;
    }
  }
  .goods-info {
    position: relative;
    top: 30px;
    left: 20px;
    .goods-img {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 10px;
    }
    .desc {
      width: 500px;
      font-size: 28px;
      color: #333;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      position: absolute;
      left: 120px;
      top: 0;
    }
    .price {
      font-size: 26px;
      position: absolute;
      left: 120px;
      top: 50px;
      span {
        color: red;
        font-weight: bold;
      }
    }
  }
  .delete {
    position: absolute;
    right: 20px;
    bottom: 20px;
    // width: 150px;
    height: 55px;
    line-height: 55px;
    font-size: 24px;
  }
  .btn-box {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 26px;
    .cancel {
      padding: 10px;
      border-radius: 3px;
      text-align: center;
      margin-right: 20px;
      background: #ee0a24;
      color: #fff;
      white-space: nowrap;
      display: inline-block;
    }
    .confirm {
      padding: 10px;
      border-radius: 3px;
      text-align: center;
      background: #fff;
      border: 1px solid #ccc;
      display: inline-block;
      color: #333;
      white-space: nowrap;
    }
  }
  .status {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 28px;
    color: rgb(238, 10, 36);
  }
}
</style>
