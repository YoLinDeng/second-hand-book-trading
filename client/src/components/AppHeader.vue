<template>
  <div class="app-header">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";

Vue.use(NavBar);
export default {
  name: "app-header",
  props: ['title', 'rightText'],
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$emit('clickRightBtn')
    }
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  .van-nav-bar {
    width: 750px;
    height: 80px;
    line-height: 80px;
    position: relative;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: linear-gradient(#87CEFA, #1E90FF);
    .van-nav-bar__left {
      font-size: 26px;
      .van-nav-bar__arrow {
        font-size: 26px;
        line-height: 80px;
        color: #fff;
      }
      .van-nav-bar__text {
        color: #fff;
      }
    }
    .van-nav-bar__right {
      .van-nav-bar__text {
        font-size: 26px;
        color: #fff;
      }
    }
    .van-nav-bar__title {
      text-align: center;
      color: #fff;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>
