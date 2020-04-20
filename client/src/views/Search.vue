<template>
  <div class="search-wrapper">
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
          slot="title"/>
      </van-nav-bar>
    </section>
    <div class="history-cell">
      <span class="title">历史搜索</span>
      <img :src="clear" class="clear" @click="clearHistory">
    </div>
    <div class="history-content" v-if="historyList[0] !== ''">
      <div class="item" v-for="(item, index) in historyList" :key="index" @click="clickHistoryItem(item)"> {{ item }} </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Search, Dialog, Toast } from 'vant';
import * as types from '@/store/mutation-types'

Vue.use(Search);
Vue.use(Dialog);
Vue.use(Toast);
export default {
  name: "search",
  data() {
    return {
      searchVal: '',
      clear: require('@/assets/images/clear.png'),
      historyList: localStorage.getItem('queryHistory') ? localStorage.getItem('queryHistory').split(',') : []
    };
  },
  components: {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      let historyStr = localStorage.getItem('queryHistory')
      if (historyStr) {
        const arr = historyStr.split(',')
        let isOnly = true
        arr.forEach(item => {
          if (item === this.searchVal) {
            isOnly = false
          }
        })
        if (isOnly) {
          historyStr = historyStr + ',' +  this.searchVal
        }
        localStorage.setItem('queryHistory', historyStr)
      } else {
        localStorage.setItem('queryHistory', this.searchVal)
      }
      if (this.searchVal === '') {
        Toast('请输入要搜索的内容')
      } else {
        this.$store.commit(types.RECORD_BOOK_QUERYNAME, this.searchVal)
        this.$router.push({ name: 'searchResult' })
      }
    },
    clickHistoryItem(item) {
      this.$store.commit(types.RECORD_BOOK_QUERYNAME, item)
      this.$router.push({ name: 'searchResult' })
    },
    clearHistory() {
      Dialog.confirm({
        title: '提示',
        message: '是否要删除所有历史搜索记录'
      }).then(() => {
        localStorage.setItem('queryHistory', '')
        this.historyList = ''
      }).catch(() => {
        // on cancel
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  background: #fff;
  padding-bottom: 1200px;
  .search-header {
    width: 750px;
    margin: 0 auto;
    .van-nav-bar__title {
      position: relative;
      top: 10px;
      left: 20px;
    }
    .van-search {
      padding: 0;
    }
  }
  .history-cell {
    width: 750px;
    margin: 0 auto;
    position: relative;
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    box-sizing: border-box;
    .title {
      font-size: 28px;
      color: #666;
    }
    .clear {
      display: inline-block;
      width: 50px;
      height: 50px;
      position: absolute;
      right: 10px;
      top: 13px;
    }
  }
  .history-content {
    width: 750px;
    margin: 0 auto;
    .item {
      width: auto;
      height: 50px;
      line-height: 50px;
      text-align: center;
      padding: 0 15px;
      background: #ddd;
      border-radius: 3px; 
      color: #333;
      font-size: 26px;
      display: inline-block;
      margin: 10px; 
    }
  }
}
</style>
