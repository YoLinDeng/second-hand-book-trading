<template>
  <div class="look-more">
    <div v-if="list.length === 0" class="tip-text">{{ tip }}</div>
    <p v-if="more && list.length >= size" class="footer-text" @click="lookMore">查看更多<img class="icon" :src="require('@/assets/images/look-more.png')" alt=""></p>
    <p v-if="!more || (list.length > 0 && list.length < size)" class="footer-text">没有更多了</p>
  </div>
</template>

<script>
export default {
  name: 'look-more',
  data() {
    return {
    };
  },
  props: ['more', 'list', 'tip', 'size'],
  methods: {
    lookMore() {
      this.$emit('lookMore')
    }
  },
};
</script>

<style lang='scss' scoped>
.tip-text {
  text-align: center;
  // position: absolute;
  // top: 300px;
  // left: 0;
  // right: 0;
  // margin: auto;
  margin-top: 50px;
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
