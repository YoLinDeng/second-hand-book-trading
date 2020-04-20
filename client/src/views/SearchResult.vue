<template>
  <div class="search-result">
    <section class="search-header">
      <van-nav-bar 
        title="标题" 
        left-text="返回" 
        left-arrow 
        right-text="搜索"
        @click-left="onClickLeft"
        @click-right="onClickRight">
        <van-search 
          v-model="searchVal" 
          placeholder="请输入搜索关键词" 
          slot="title"
          @search="onSearch"/>
      </van-nav-bar>
    </section>
    <section class="search-content">
      <div class="search-item" v-for="(item, index) in resultList" :key="index" @click="goToBookDetail(item)">
        <img :src="item.image[0]" alt="" class="goods-img">
        <div class="info">
          <div class="desc">{{ item.desc }}</div>
          <div class="price">￥{{ item.price }}</div>
          <div class="user-info">
            <img :src="item.user.image" alt="" class="user-img">
            <span class="user-name">{{ item.user.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="resultList.length === 0" class="tip-text">暂无书籍~</div>
      <p v-if="isMore && resultList.length > 0" class="footer-text" @click="lookMore">查看更多<img class="icon" :src="require('@/assets/images/look-more.png')" alt=""></p>
      <p v-if="!isMore && resultList.length > 0" class="footer-text">没有更多了</p>
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import { Search, Toast } from 'vant';
import { mapState } from 'vuex';

Vue.use(Search);
Vue.use(Toast);
export default {
  name: 'search-result',
  data() {
    return {
      resultList: [],
      isMore: true,
      page: 1,
      pageSize:6,
      searchVal: ''
    };
  },
  mounted() {
    this.searchVal = this.queryName
    this.API.findBook({ page: 1, pageSize: 6, desc: this.queryName, status: 1 }).then(res => {
      this.resultList = res.bean.records 
    })
  },
  components: {
  },
  computed: {
    ...mapState({
      queryName: state => state.book.queryName
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      if (this.searchVal === '') {
        Toast('请输入要搜索的内容')
      } else {
        this.API.findBook({ page: 1, pageSize: 6, desc: this.searchVal, status: 1 }).then(res => {
          this.resultList = res.bean.records 
        })
      }
    },
    onSearch(val) {
      console.log(val)
    },
    goToBookDetail (item) {
      this.$router.push({ path: '/bookDetail', query: {
        id: item._id
      }})
    },
    lookMore() {
      this.page = this.page + 1
      this.API.findBook({page: this.page, pageSize: this.pageSize, desc: this.queryName, status: 1 }).then(res => {
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
  },
};
</script>

<style lang='scss' scoped>
  .search-result {
    width: 750px;
    margin: 0 auto;
    .search-header {
      .van-nav-bar__title {
        position: relative;
        top: 10px;
        left: 20px;
      }
      .van-search {
        padding: 0;
      }
    }
    .search-content {
      .search-item {
        width: 355px;
        margin: 20px 10px;
        display: inline-block;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: #fff;
        box-sizing: border-box; 
        .goods-img {
          width: 355px;
          height: 380px;
          display: inline-block;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
        .info {
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
  }
</style>
