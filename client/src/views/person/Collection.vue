<template>
  <div class="collection">
    <app-header :title="title"></app-header>
    <collection-card v-for="(item, index) in collectionList" :key="index" :item="item"></collection-card>
    <look-more :list="collectionList" :more="isMore" :tip="tip" :size="pageSize" @lookMore="lookMore"></look-more>
  </div>
</template>

<script>
import Vue from 'vue';
import AppHeader from "@/components/AppHeader";
import CollectionCard from '@/components/card/CollectionCard'
import LookMore from "@/components/LookMore";
import * as time from '@/utils/time'
import { mapState } from "vuex";
import { Dialog } from 'vant';
Vue.use(Dialog);

export default {
  name: 'collection',
  data() {
    return {
      title: '我收藏的',
      tip: '你还没有超赞哦~',
      isMore: true,
      page: 1,
      pageSize: 5,
      collectionList: [
      ]
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
        vm.API.collectList({
          page: vm.page,
          pageSize: vm.pageSize,
          user: vm.info._id
        }).then(res => {
          res.bean.forEach(item =>{
            item.create_time = time.getUpdateTime(item.create_time)
          })
          vm.collectionList = res.bean
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后才查看收藏'
        }).then(() => {
          vm.$router.push('/login')
        });
      }
    })
  },
  components: {
    AppHeader,
    CollectionCard,
    LookMore
  },
  methods: {
    lookMore() {
      this.page = this.page + 1
      this.API.collectList({page: this.page, pageSize: this.pageSize, user: this.info._id }).then(res => {
        const data = res.bean
         if (data.length > 0) {
           data.forEach(item => {
             this.collectionList.push(item)
           })
         } else {
           this.isMore = false
         }
      })
    }
  },
};
</script>

<style lang='scss' scoped>
body {
  background: #f5f5f5;
}
</style>
