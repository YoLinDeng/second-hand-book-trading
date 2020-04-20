<template>
  <div class="super-praise">
    <app-header :title="title"></app-header>
    <star-card v-for="(item, index) in praiseList" :key="index" :item="item"></star-card>
     <look-more :list="praiseList" :more="isMore" :tip="tip" @lookMore="lookMore"></look-more>
  </div>
</template>

<script>
import Vue from 'vue';
import AppHeader from "@/components/AppHeader";
import LookMore from "@/components/LookMore";
import StarCard from "@/components/card/StarCard";
import * as time from '@/utils/time'
import { mapState } from "vuex";
import { Dialog } from 'vant';
Vue.use(Dialog);
export default {
  name: 'super-praise',
  data() {
    return {
      title: '我的超赞',
      isMore: true,
      praiseList: [
      ],
      tip: '你还没有超赞哦~',
      page: 1,
      pageSize: 10
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
        vm.API.starList({
          page: vm.page,
          pageSize: vm.pageSize,
          user: vm.info._id
        }).then(res => {
          res.bean.forEach(item =>{
            item.create_time = time.getUpdateTime(item.create_time)
          })
          vm.praiseList = res.bean
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后才查看超赞'
        }).then(() => {
          vm.$router.push('/login')
        });
      }
    })
  },
  components: {
    AppHeader,
    StarCard,
    LookMore
  },
  methods: {
    lookMore() {
      this.page = this.page + 1
      this.API.starList({page: this.page, pageSize: this.pageSize, user: this.info._id }).then(res => {
        const data = res.bean
         if (data.length > 0) {
           data.forEach(item => {
             this.praiseList.push(item)
           })
         } else {
           this.isMore = false
         }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>