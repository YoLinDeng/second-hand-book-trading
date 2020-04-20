<template>
  <div class="my-publish">
    <app-header :title="title"></app-header>
    <my-publish-card v-for="(item, index) in publishList" :key="index" :item="item" @delete="deletePublish"></my-publish-card>
    <div v-if="publishList.length === 0" class="tip-text">您还没有发布书籍哦~</div>
    <p v-if="isMore && publishList.length > 0" class="footer-text" @click="lookMore">查看更多<img class="icon" :src="require('@/assets/images/look-more.png')" alt=""></p>
    <p v-if="!isMore && publishList.length > 0" class="footer-text">没有更多了</p>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import MyPublishCard from '@/components/card/MyPublishCard'
import Vue from 'vue';
import { mapState } from "vuex";
import { Dialog } from 'vant';

Vue.use(Dialog);

export default {
  name: 'my-publish',
  data() {
    return {
      title: '我发布的',
      publishList: [
      ],
      page: 1,
      pageSize: 6,
      isMore: true
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token) {
        vm.API.findBook({
          page: vm.page,
          pageSize: vm.pageSize,
          status: 1,
          userId: vm.info._id
        }).then(res => {
          vm.publishList = res.bean.records
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后才可查看发布信息'
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
    MyPublishCard
  },
  methods: {
    lookMore() {
      this.page = this.page + 1
      this.API.findBook({
        page: this.page, 
        pageSize: this.pageSize,
        status: 1, 
        userId: this.info._id 
      }).then(res => {
        const data = res.bean.records
         if (data.length > 0) {
           data.forEach(item => {
             this.publishList.push(item)
           })
         } else {
           this.isMore = false
         }
      })
    },
    deletePublish() {
      this.API.findBook({
        page: this.page, 
        pageSize: this.pageSize,
        status: 1, 
        userId: this.info._id 
      }).then(res => {
        const data = res.bean.records
         if (data.length > 0) {
          this.publishList = data
         } else {
           this.isMore = false
         }
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
