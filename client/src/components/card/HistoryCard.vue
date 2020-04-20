<template>
  <div class="history-card">
    <div class="goods-item" v-for="(item, index) in list" :key="index" @click="goToBookDetail(item._id)">
      <img :src="item.image[0]" alt="" class="goods-img">
      <span class="price">￥{{ item.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history-card',
  data() {
    return {
    };
  },
  props: ['list'],
  methods: {
    goToBookDetail(id) {
      this.$router.push({ path: '/bookDetail', query: {
        id
      }})
    }
  },
};
</script>

<style lang='scss' scoped>
.history-card {
  width: 750px;
  margin: 0 auto;
  .goods-item {
    display: inline-block;
    margin: 0 10px;
    position: relative;
    margin-bottom: 20px; 
    margin-top: 10px;
    height: 280px;
    .goods-img {
      width: 230px;
      height: 210px;
      display: inline-block;
      background: #ccc;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
    .price {
      height: 70px;
      line-height: 70px;
      font-size: 28px;
      background: #fff;
      width: 230px;
      position: absolute;
      left: 0;
      bottom: 0;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      color: red;
      text-indent: 5px;
    }
  }
}
</style>
