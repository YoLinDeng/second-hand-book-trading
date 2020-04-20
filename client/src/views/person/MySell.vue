<template>
  <div class="my-sell">
    <app-header :title="title"></app-header>
    <sell-card v-for="(item, index) in sellList" :key="index" :item="item" @cancel="changeList"></sell-card>
    <div v-if="sellList.length === 0" class="tip-text">您还没有卖出的书籍哦~</div>
    <p v-if="isMore && sellList.length > 0" class="footer-text" @click="lookMore">查看更多<img class="icon" :src="require('@/assets/images/look-more.png')" alt=""></p>
    <p v-if="!isMore && sellList.length > 0" class="footer-text">没有更多了</p>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import SellCard from '@/components/card/SellCard'
import { mapState } from "vuex";
import Vue from 'vue';
import { Dialog } from 'vant';

Vue.use(Dialog);

export default {
  name: 'my-sell',
  data() {
    return {
      title: '我卖出的',
      sellList: [
      ],
      page: 1,
      pageSize: 6,
      isMore: true
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token) {
        vm.API.findOrder({
          page: vm.page,
          pageSize: vm.pageSize,
          seller: vm.info._id
        }).then(res => {
          vm.sellList = res.bean.records
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后才查看卖出信息'
        }).then(() => {
          vm.$router.push('/login')
        })
      } 
    })
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    })
  },
  components: {
    AppHeader,
    SellCard
  },
  methods: {
    lookMore() {
      this.page = this.page + 1
      this.API.findOrder({
        page: this.page, 
        pageSize: this.pageSize, 
        seller: this.info._id 
      }).then(res => {
        const data = res.bean.records
         if (data.length > 0) {
           data.forEach(item => {
             this.sellList.push(item)
           })
         } else {
           this.isMore = false
         }
      })
    },
    changeList() {
      this.API.findOrder({
        page: this.page,
        pageSize: this.pageSize,
        seller: this.info._id
      }).then(res => {
        this.sellList = res.bean.records
      })
    }
  },
};
</script>

<style lang='scss' scoped>
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
</style>
