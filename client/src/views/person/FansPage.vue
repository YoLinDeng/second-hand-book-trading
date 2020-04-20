<template>
  <div class="fans-page">
    <app-header :title="title"></app-header>
    <fans-card v-for="(item, index) in fansList" :key="index" :item="item"></fans-card>
    <look-more :list="fansList" :more="isMore" :tip="tip" :size="pageSize" @lookMore="lookMore"></look-more>
  </div>
</template>

<script>
import Vue from 'vue';
import AppHeader from '@/components/AppHeader'
import FansCard from "@/components/card/FansCard"
import LookMore from "@/components/LookMore";
import { mapState } from "vuex";
import { Dialog } from 'vant';
Vue.use(Dialog);

export default {
  name: 'fans-page',
  data() {
    return {
      title: '我的粉丝',
      fansList: [
      ],
      page: 1,
      pageSize: 8,
      isMore: true,
      tip: '您还没有粉丝哦~'
    };
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    }),
  },
  components: {
    AppHeader,
    FansCard,
    LookMore
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token) {
        vm.API.fansList({
          userId: vm.info._id,
          page: vm.page,
          pageSize: vm.pageSize
        }).then(res => {
          vm.fansList = res.bean
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后才查看粉丝'
        }).then(() => {
          vm.$router.push('/login')
        });
      } 
    })
  },
  methods: {
    lookMore() {
      this.page = this.page + 1
      this.API.fansList({page: this.page, pageSize: this.pageSize, user: this.info._id }).then(res => {
        const data = res.bean
         if (data.length > 0) {
           data.forEach(item => {
             this.fansList.push(item)
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

<style lang='scss' scoped>

</style>
