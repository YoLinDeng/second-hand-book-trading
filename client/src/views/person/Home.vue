<template>
  <div class="home-swapper">
    <!-- 顶部用户信息 -->
    <section class="top" v-if="token">
      <img :src="userImg" alt="" class="tx" v-if="userImg" @click="goToUserInfo"/>
      <img
        :src="require('@/assets/images/unlogin-tx.png')"
        alt="默认头像"
        class="tx"
        @click="goToUserInfo"
        v-else
      />
      <div class="user-info" @click="goToUserInfo">
        <div class="name-box">
          <img
            :src="sex === '男' ? require('@/assets/images/man-icon.png') : require('@/assets/images/woman-icon.png') "
            alt="性别"
            class="sex"
          />
          <span class="name">{{ userName }}</span>
        </div>
        <div class="school">{{ school }}</div>
        <img :src="require('@/assets/images/right-jt.png')" alt="箭头" class="right-jt" />
      </div>
      <div class="desc">
        <p>
          <span>个性签名：</span>{{ sign }}
        </p>
      </div>
    </section>
    <section class="top" v-else>
      <img :src="require('@/assets/images/unlogin-tx.png')" alt="默认头像" class="tx" />
      <div class="user-info" @click="goToLogin">
        <p class="login">登录/注册></p>
      </div>
    </section>
    <!-- 点赞、关注、粉丝查看栏 -->
    <div class="star-box">
      <div class="flex-box" v-for="(item, index) in starList" :key="index" @click="goToStarListPage(item.sign)">
        <span class="num">{{ item.num }}</span>
        {{ item.name }}
      </div>
    </div>
    <!-- 卖在校园 -->
    <div class="sell-box">
      <div class="title">卖在校园</div>
      <div class="content-box">
        <div class="item" v-for="(item, index) in sellList" :key="index" @click="goSellInCampus(item.sign)">
          <img :src="item.icon" alt class="icon" />
          <p>
            {{ item.name }}
            <span class="num">{{ item.num }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 买在校园 -->
    <div class="buy-box">
      <div class="title">买在校园</div>
      <div class="content-box">
        <div class="item" v-for="(item, index) in buyList" :key="index" @click="goToBuyPage(item.sign)">
          <img :src="item.icon" alt class="icon" />
          <p>
            {{ item.name }}
            <span class="num">{{ item.num }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 校园快讯 -->
    <div class="news">
      <div class="title">校园快讯</div>
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(item, index) in newsList" :key="index">
          <img :src="item.image" class="swiper-img" @click="clickNews(item.link)">
        </van-swipe-item>
      </van-swipe>
    </div>
  
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter";
import Vue from "vue";
import { mapState } from "vuex";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe).use(SwipeItem);
export default {
  name: "home",
  data() {
    return {
      userName: '',
      userImg: '',
      school: '',
      sign: '',
      sex: '' /* 1为男，2为女 */,
      isLogin: true /* 是否已登录状态 */,
      starList: [
        {
          sign: "star",
          num: '',
          name: "超赞"
        },
        {
          sign: "follow",
          num: '',
          name: "关注"
        },
        {
          sign: "fans",
          num: '',
          name: "粉丝"
        }
      ],
      sellList: [
        {
          sign: "publish",
          icon: require("@/assets/images/home-publish.png"),
          name: "我发布的",
          num: ""
        },
        {
          sign: "sell",
          icon: require("@/assets/images/sell-icon.png"),
          name: "我卖出的",
          num: ""
        }
      ],
      buyList: [
        {
          sign: "buy",
          icon: require("@/assets/images/home-buy.png"),
          name: "我买到的",
          num: ""
        },
        {
          sign: "collection",
          icon: require("@/assets/images/home-collection.png"),
          name: "我收藏的",
          num: ""
        },
        {
          sign: "footer",
          icon: require("@/assets/images/home-footer.png"),
          name: "我的足迹"
        }
      ],
       newsList: []
    };
  },
  components: {
    AppFooter
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token) {
        Promise.all([
          vm.API.getUserInfo({ token: vm.token })
        ]).then(([infoRes]) => {
          vm.userImg = infoRes.bean.image
          vm.userName = infoRes.bean.name
          vm.school = infoRes.bean.school
          vm.sex = infoRes.bean.sex
          vm.sign = infoRes.bean.sign
          vm.starList[0].num = infoRes.starNum
          vm.starList[1].num = infoRes.followNum
          vm.starList[2].num = infoRes.fansNum
          vm.sellList[0].num = infoRes.publishNum
          vm.sellList[1].num = infoRes.sellNum
          vm.buyList[0].num = infoRes.buyNum
          vm.buyList[1].num = infoRes.collectNum
        }).catch(() => {})
      }
      vm.API.getNews().then(res => {
        const data = res.bean.records
        vm.newsList = data
      })   
    })
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
  methods: {
    clickNews(link) {
      window.location.href = link
    },
    goToUserInfo() {
      this.$router.push({ path: "/personInfo" });
    },
    goToLogin() {
      this.$router.push('/login')
    },
    goToStarListPage(sign) {
      if (sign === 'star') {
        this.$router.push({ path: '/superPraise'})
      } else if (sign === 'follow') {
        this.$router.push({ path: '/followPage'})
      } else if (sign === 'fans') {
        this.$router.push({ path: '/fansPage'})
      }
    },
    goSellInCampus(sign) {
      if (sign === 'publish') {
        this.$router.push({ path: '/myPublish'})
      }
      if (sign === 'sell') {
        this.$router.push({ path: '/mySell'})
      }
    },
    goToBuyPage(sign) {
      if (sign === 'buy') {
        this.$router.push({ path: '/myBuy'})
      }
      if (sign === 'collection') {
        this.$router.push({ path: '/collection'})
      }
      if (sign === 'footer') {
        this.$router.push({ path: '/lookHistory'})
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home-swapper {
  background: #f5f5f5;
  padding-bottom: 100px;
  overflow-x: hidden;
  .top {
    width: 750px;
    height: 300px;
    background: linear-gradient(#1e90ff, #87cefa);
    border-bottom-left-radius: 15%;
    border-bottom-right-radius: 15%;
    position: relative;
    margin: 0 auto;
    .tx {
      width: 120px;
      height: 120px;
      position: absolute;
      top: 50px;
      left: 50px;
      border-radius: 50%;
    }
    .user-info {
      width: 500px;
      position: absolute;
      top: 55px;
      left: 200px;
      .name-box {
        .sex {
          width: 30px;
          height: 30px;
        }
        .name {
          display: inline-block;
          font-size: 36px;
          color: #fff;
          margin-left: 10px;
        }
      }
      .school {
        color: #fff;
        margin-top: 10px;
        font-size: 28px;
      }
      .right-jt {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 0;
        top: 20px;
      }
      .login {
        font-size: 36px;
        color: #fff;
        position: relative;
        top: -10px;
      }
    }
    .desc {
      position: absolute;
      top: 170px;
      left: 80px;
      font-size: 26px;
      color: #fff;
    }
  }
  .star-box {
    width: 690px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    display: flex;
    text-align: center;
    background: #fff;
    border-radius: 20px;
    position: relative;
    top: -35px;
    font-size: 26px;
    .flex-box {
      flex: 1;
    }
  }
  .sell-box,
  .buy-box {
    width: 690px;
    height: 190px;
    background: #fff;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: -15px;
    .title {
      font-weight: 600;
      font-size: 28px;
      color: #333;
      position: relative;
      top: 15px;
      left: 20px;
    }
    .content-box {
      display: flex;
      text-align: center;
      position: relative;
      top: 40px;
      .item {
        flex: 1;
        .icon {
          width: 50px;
          height: 50px;
        }
        p {
          margin: 0;
          font-size: 24px;
          margin-top: 5px;
        }
      }
    }
  }
  .buy-box {
    margin-top: 20px;
    height: 200px;
    .content-box {
      .item {
        .icon {
          width: 65px;
          height: 65px;
        }
        p {
          margin: 0;
        }
      }
    }
  }
  .news {
    width: 750px;
    margin: 0 auto;
    .title {
      font-weight: 600;
      font-size: 28px;
      color: #333;
      position: relative;
      top: 30px;
      // left: 30px;
      text-align: center;
    }
    .van-swipe {
      width: 690px;
      margin: 50px auto;
      .van-swipe-item {
        width: 690px;
        .swiper-img {
          width: 690px;
          height: 200px;
        }
      }
    }
  }

}
</style>
