<template>
  <div class="follow-page">
    <app-header :title="title"></app-header>
    <follow-card v-for="(item, index) in followList" :key="index" :item="item"></follow-card>
    <look-more :list="followList" :more="isMore" :tip="tip" :size="pageSize" @lookMore="lookMore"></look-more>
  </div>  
</template>

<script>
import Vue from 'vue';
import AppHeader from "@/components/AppHeader"
import FollowCard from "@/components/card/FollowCard"
import LookMore from "@/components/LookMore";
import { mapState } from "vuex";
import { Dialog } from 'vant';
Vue.use(Dialog);

export default {
  name: 'follow-page',
  data() {
    return {
      title: '我的关注',
      followList: [
      ],
      page: 1,
      pageSize: 8,
      isMore: true,
      tip: '您还没有关注的用户哦~'
    }
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
        vm.API.followList({
          userId: vm.info._id,
          page: vm.page,
          pageSize: vm.pageSize
        }).then(res => {
          vm.followList = res.bean
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后才查看关注'
        }).then(() => {
          vm.$router.push('/login')
        });
      }
    })
  },
  components: {
    AppHeader,
    FollowCard,
    LookMore
  },
  methods: {
    lookMore() {
      this.page = this.page + 1
      this.API.followList({page: this.page, pageSize: this.pageSize, userId: this.info._id }).then(res => {
        const data = res.bean
         if (data.length > 0) {
           data.forEach(item => {
             this.followList.push(item)
           })
           if(data.length != this.pageSize) {
             this.isMore = false
           }
         } else {
           this.isMore = false
         }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.follow-page {
  background: #f5f5f5;
}
</style>