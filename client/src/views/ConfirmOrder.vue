<template>
  <div class="confirm-order">
    <div class="contanier">
      <div class="order-info">
        <div class="seller-info">
          <img :src="sellerImg" alt="" class="seller-img">
          <span class="seller-name">{{ sellerName }}</span>
        </div>
        <div class="book-info">
          <img :src="bookImg" alt="" class="book-img">
          <div class="desc">{{ desc }}</div>
          <div class="price">￥{{ price }}</div>
          <div class="name item">
            <span>书名：</span>{{ bookName }}
          </div>
          <div class="author item">
            <span>作者：</span>{{ author }}
          </div>
          <div class="press item">
            <span>出版社：</span>{{ press }}
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="user-name item">
          <span>下单人：</span>{{ info.name }}
        </div>
        <div class="mobile item">
          <span>联系方式：</span>{{ info.phone }}
        </div>
        <div class="address item">
          <span>联系地址：</span>
          {{ info.address }}
        </div>
      </div>
      <p class="tip">ps:该订单为线上下单，线下交易~</p>
    </div>
    <div class="footer-btn" @click="placeOrder">立即下单</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from "vuex";
import { Toast} from 'vant';
Vue.use(Toast);

export default {
  name: 'confirm-order',
  data() {
    return {
      sellerName: '',
      sellerImg: '',
      sellerId: '',
      bookImg: '',
      desc: '',
      price: '',
      bookId: '',
      bookName: '',
      author: '',
      press: ''
    };
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    })
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.bookId = to.query.id
      vm.API.getBookInfo({
        id: to.query.id
      }).then(res => {
        const seller  = res.records[0].user
        const book = res.records[0]
        vm.sellerName = seller.name
        vm.sellerImg = seller.image
        vm.sellerId = seller._id
        vm.bookImg = book.image[0]
        vm.desc = book.desc
        vm.price = book.price
        vm.bookName = book.name
        vm.press = book.press
        vm.author = book.author
      })
    })
  },
  methods: {
    placeOrder() {
      this.API.placeOrder({
        book: this.bookId,
        buyer: this.info._id,
        seller: this.sellerId
      }).then(res => {
        if (res.success) {
          Toast('下单成功，可在我买到的中查询')
          this.$router.push('/home')
        }
      })
    }
  },
};
</script>

<style lang='scss' scoped>
.confirm-order {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  .contanier {
    flex: 1;
    height: 100%;
  }
  .footer-btn {
    height: 100px;
    width: 750px;
    margin: 0 auto;
    line-height: 100px;
    background: #FF4500;
    text-align: center;
    font-size: 30px;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .order-info {
    width: 700px;
    background: #fff;
    margin: 0 auto;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
    border-radius: 10px;
    .seller-info {
      margin: 10px 0 0 20px;
      .seller-img {
        width: 50px;
        height: 50px;
        background: #ccc;
        display: inline-block;
        border-radius: 50%;
      }
      .seller-name {
        font-size: 26px;
        position: absolute;
        left: 80px;
        top: 25px;
      }
    }
    .book-info {
      position: relative;
      .book-img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        background: #ccc;
        display: inline-block;
        margin-top: 10px;
        margin-left: 20px;
      }
      .desc {
        width: 500px;
        position: absolute;
        left: 140px;
        top: 10px;
        font-size: 28px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #333;
      }
      .price {
        position: absolute;
        left: 140px;
        top: 70px;
        font-size: 28px;
        color: red;
      }
      .item {
        font-size: 28px;
        margin-left: 20px;
        margin-top: 15px;
        margin-bottom: 10px;
        span {
          margin-right: 5px;
        }
      }
    }
  }
  .user-info {
    background: #fff;
    width: 700px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    .item {
      font-size: 28px;
      margin-bottom: 10px;
      span {
        margin-right: 5px;
      }
    }
  }
  .tip {
    text-align: center;
    font-size:28px;
  }
}
</style>
