<template>
  <div class="car-wapper">
    <div class="car-header">
      <div class="car-name">购物车</div>
      <div class="num-info">
        <span>共{{ total }}件宝贝</span>
      </div>
    </div>
    <car-card v-for="(item, index) in carList" :key="index" :item="item" @delete="deleteCar"></car-card>
    <look-more :list="carList" :more="isMore" :tip="tip" :size="pageSize" @lookMore="lookMore"></look-more>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Vue from 'vue';
import AppFooter from "@/components/AppFooter";
import CarCard from '@/components/card/CarCard'
import { Dialog } from 'vant';
import { mapState } from "vuex";
import LookMore from "@/components/LookMore";
Vue.use(Dialog);

export default {
  name: 'car',
  data() {
    return {
      carList: [
      ],
      page: 1,
      pageSize: 5,
      total: '',
      isMore: true,
      tip: '您的购物车空空如也~'
    };
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    }),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token) {
        vm.API.findCar({
          page: vm.page,
          pageSize: vm.pageSize,
          userId: vm.info._id
        }).then(res => {
          vm.carList = res.bean.records
          vm.total = res.bean.total
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后才可查看购物车'
        }).then(() => {
          vm.$router.push('/login')
        });
      }
    })
  },
  components: {
    AppFooter,
    CarCard,
    LookMore
  },
  methods: {
    deleteCar() {
      this.API.findCar({
        page: 1,
        pageSize: this.page*this.pageSize,
        userId: this.info._id
      }).then(res => {
        this.carList = res.bean.records
        this.total = res.bean.total
      })
    },
    lookMore() {
      this.page = this.page + 1
      this.API.findCar({page: this.page, pageSize: this.pageSize, userId: this.info._id }).then(res => {
        const data = res.bean.records
         if (data.length > 0) {
           data.forEach(item => {
             this.carList.push(item)
           })
           if(data.length != this.pageSize) {
             this.isMore = false
           }
         } else {
           this.isMore = false
         }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.car-wapper {
  padding-bottom: 150px;
  .car-header {
    width: 750px;
    margin: 0 auto;
    margin-bottom: 30px;
    .car-name {
      font-size: 36px;
      color: #333;
      font-weight: bold;
      margin-top: 20px;
      margin-left: 20px;  
    }
    .num-info {
      font-size: 26px;
      margin-left: 20px;
      margin-top: 10px;
      color: #666; 
    }
  }
  .tip-text {
      text-align: center;
      position: absolute;
      top: 300px;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 28px;
      color: #666;
    }
    .footer-text {
      text-align: center;
      font-size: 28px;
      color: #666;
      height: 40px;
      line-height: 40px;
      .icon {
        width: 40px;
        height: 40px;
        display: inline-block;
        position: relative;
        top: 5px;
      }
    }
}
</style>
