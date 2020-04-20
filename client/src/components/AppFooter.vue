<template>
  <div class="app-footer">
    <van-tabbar v-model="active" active-color="#1296db">
      <van-tabbar-item v-for="(item, index) in itemList" :to="{ name: item.name }" :key="index">
        <span>{{ item.desc }}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.icon.active : item.icon.normal"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar).use(TabbarItem);
export default {
  name: "app-footer",
  data() {
    return {
      itemList: [
        {
          name: "index",
          desc: "首页",
          icon: {
            normal: require("@/assets/images/index.png"),
            active: require("@/assets/images/check-index.png")
          }
        },
        {
          name: "search",
          desc: "搜索",
          icon: {
            normal: require("@/assets/images/search.png"),
            active: require("@/assets/images/check-search.png")
          }
        },
        {
          name: "publish",
          desc: "发布",
          icon: {
            normal: require("@/assets/images/publish.png"),
            active: require("@/assets/images/check-publish.png")
          }
        },
        {
          name: "car",
          desc: "购物车",
          icon: {
            normal: require("@/assets/images/car.png"),
            active: require("@/assets/images/check-car.png")
          }
        },
        {
          name: "home",
          desc: "个人中心",
          icon: {
            normal: require("@/assets/images/my.png"),
            active: require("@/assets/images/check-my.png")
          }
        }
      ]
    };
  },
  computed: {
    active: {
      get() {
        return this.itemList.findIndex(val => {
          return this.$route.name === val.name;
        });
      },
      set() {}
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  .van-tabbar { 
    border: 0 !important;
  }
}
.van-tabbar {
  width: 750px;
  height: 120px;
  position: fixed;
  bottom: -2px;
  left: 0;
  right: 0;
  margin: auto;
  border-left: 1px solid #ebedf0;
  border-right: 1px solid #ebedf0;
  .van-tabbar-item {
    font-size: 26px;
    .van-tabbar-item__icon {
      img {
        height: 50px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
