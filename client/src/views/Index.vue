<template>
  <div class="index">
    <van-search
      :value="value"
      placeholder="请输入搜索关键词"
      bind:search="onSearch"
      input-align="left"
      :readonly="true"
      shape="round"
      background="#1E90FF"
      @click.native="goToSearch"
    />
      <van-notice-bar
        left-icon="like-o"
        color=""
        text="欢迎新同学使用校园二手书交易网站，您的支持是我最大的鼓励。"
      />
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(item, index) in newsList" :key="index">
          <img :src="item.image" class="swiper-img" @click="clickNews(item.link)">
        </van-swipe-item>
      </van-swipe>
      <van-tabs v-model="active" @change="changeTab">
        <van-tab :title="item.name" v-for="(item, index) in tabList" :key="index" class="tab-box">
          <section class="book-item">
            <div class="search-item" v-for="(item, index) in resultList" :key="index" @click="goToBookDetail(item)">
              <img :src="item.image[0]" alt="" class="goods-img">
              <div class="info">
                <div class="desc">{{ item.name || item.desc }}</div>
                <div class="price">￥{{ item.price }}</div>
                <div class="user-info">
                  <img :src="item.user.image" alt="" class="user-img">
                  <span class="user-name">{{ item.user.name }}</span>
                </div>
              </div>
            </div>
          </section>
          <div v-if="resultList.length === 0" class="tip-text">暂无此类书籍~</div>
          <p v-if="isMore && resultList.length > 0" class="footer-text" @click="lookMore">查看更多<img class="icon" :src="require('@/assets/images/look-more.png')" alt=""></p>
          <p v-if="!isMore && resultList.length > 0" class="footer-text">没有更多了</p>
        </van-tab>
      </van-tabs>
      <app-footer></app-footer>
  </div>
</template>

<script>
import Vue from "vue";
import AppFooter from '@/components/AppFooter'
import { Swipe, SwipeItem,Tab, Tabs } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Swipe).use(SwipeItem);
export default {
  name: 'index',
  data() {
    return {
      value: '',
      active: 0,
      page: 1,
      pageSize: 6,
      type: '',
      newsList: [
        require('@/assets/images/banner-1.png'),
        require('@/assets/images/banner-2.png')
      ],
      resultList: [],
      tabList: [],
      isMore: true
    };
  },
  components: {
    AppFooter
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.API.getBookClassify().then(res => {
        vm.tabList = res.records
        if (vm.tabList.length > 0) {
          vm.type = vm.tabList[0]._id
          vm.API.findBook({ page: 1, pageSize: vm.pageSize, type: vm.tabList[0]._id, status: 1 }).then(res => {
            vm.resultList = res.bean.records
          })
        }
      })
      vm.API.getNews().then(res => {
        const data = res.bean.records
        vm.newsList = data
      })   
    })
  },
  methods: {
    clickNews(link) {
      window.location.href = link
    },
    goToSearch() {
      this.$router.push('/search')
    },
    goToBookDetail(item) {
      this.$router.push({ path: '/bookDetail', query: {
        id: item._id
      }})
    },
    changeTab(name) {
      this.isMore = true
      this.page = 1
      this.type = this.tabList[name]._id
      this.API.findBook({page: 1, pageSize: this.pageSize, type: this.tabList[name]._id, status: 1 }).then(res => {
        this.resultList = res.bean.records
      })
    },
    lookMore() {
      this.page = this.page + 1
      this.API.findBook({page: this.page, pageSize: this.pageSize, type: this.type, status: 1 }).then(res => {
        const data = res.bean.records
         if (data.length > 0) {
           data.forEach(item => {
             this.resultList.push(item)
           })
         } else {
           this.isMore = false
         }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .index {
    width: 750px;
    margin: 0 auto;
    padding-bottom: 150px;
    .van-swipe {
      margin-bottom: 10px;
      .van-swipe-item {
        width: 750px;
        .swiper-img {
          width: 750px;
          height: 300px;
        }
      }
    }
    .book-item {
      .search-item {
        width: 355px;
        margin: 20px 10px;
        display: inline-block;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: #fff;
        box-sizing: border-box; 
        padding-top: 10px;
        .goods-img {
          width: 355px;
          height: 380px;
          display: inline-block;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
        .info {
          margin-left: 10px;
          .desc {
            width: 330px;
            margin: 10px auto;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
            color: #333;
            font-size: 28px;
            margin-left: 10px;
          }
          .price {
            font-size: 28px;
            font-weight: bold;
            color: red;
            margin-left: 10px;
          }
        }
        .user-info {
          width: 330px;
          margin: 10px 0;
          position: relative;
          left: 10px;
          .user-img {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            display: inline-block;
          }
          .user-name {
            position: absolute;
            top: 10px;
            left: 65px;
          }
        }
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
