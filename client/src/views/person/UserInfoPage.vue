<template>
  <div class="user-info-page">
    <app-header :title="title"></app-header>
    <div class="content">
      <div class="btn-box">
        <van-button type="info" size="small" icon="star-o" v-if="!isFollow" @click="follow">关注</van-button>
        <van-button type="default" size="small" v-else @click="follow">已关注</van-button>
      </div>
      <img :src="userInfo.image" alt="" class="user-img">
      <div class="user-info">
        <div class="name-box">
          <img
            :src="sex === 1 ? require('@/assets/images/man-icon.png') : require('@/assets/images/woman-icon.png') "
            alt="性别"
            class="sex"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="address">{{ userInfo.address || '用户很懒未填写地址~'}}</div>
      </div>
      <div class="desc">来自{{ userInfo.school }}的同学，{{ userInfo.birthday }}出生的{{ userInfo.sex }}生，他/她的联系方式是：{{ userInfo.phone }}, 他/她的个性签名是：{{ userInfo.sign }}</div>
      <div class="statistics">
        <div class="item" v-for="(item, index) in statisticsList" :key="index">
          {{ item.num }} {{ item.text }}
        </div>
      </div>
    </div>
    <section class="user-publish">
      <p class="title">TA的发布</p>
      <div class="search-item" v-for="(item, index) in publishList" :key="index" @click="goToBookDetail(item)">
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
      <look-more :list="publishList" :more="isMore" :tip="tip" :size="pageSize" @lookMore="lookMore"></look-more>
    </section>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import { mapState } from "vuex";
import LookMore from "@/components/LookMore";
export default {
  name: 'user-info-page',
  data() {
    return {
      title: '用户资料',
      sex: 1,
      isFollow: false,
      userInfo: {},
      publishList: [],
      isMore: true,
      page: 1,
      pageSize: 6,
      tip: 'TA还没有发布的书籍哦~',
      statisticsList: [
        {
          num: '',
          text: '超赞'
        },
        {
          num: '',
          text: '关注'
        },
        {
          num: '',
          text: '粉丝'
        }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      Promise.all([
        vm.API.userIsFollow({
          user: vm.info._id,
          fUser: to.query.id
        }),
        vm.API.getUserInfoById({
          id: to.query.id
        }),
        vm.API.findBook({
          page: vm.page,
          pageSize: vm.pageSize,
          userId: to.query.id,
          status: 1
        })
      ]).then(([isFollowRes, userInfoRes, findBookRes]) => {
        vm.userInfo = userInfoRes.bean[0]
        vm.statisticsList[0].num = userInfoRes.starNum
        vm.statisticsList[1].num = userInfoRes.followNum
        vm.statisticsList[2].num = userInfoRes.fansNum
        vm.isFollow = isFollowRes.bean.length > 0 ? true : false
        vm.publishList = findBookRes.bean.records
      })
    })
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    }),
  },
  components: {
    AppHeader,
    LookMore
  },
  methods: {
    follow() {
      if (this.isFollow) {
        this.API.cancelFollowUser({
          user: this.info._id,
          fUser: this.userInfo._id
        }).then(res => {
          console.log(res)
        })
        this.isFollow = false
      } else {
        this.API.followUser({
          user: this.info._id,
          fUser: this.userInfo._id
        }).then(res => {
          console.log(res)
        })
        this.isFollow = true
      }
    },
    goToBookDetail (item) {
      this.$router.push({ path: '/bookDetail', query: {
        id: item._id
      }})
    },
    lookMore() {
      this.page = this.page + 1
      this.API.findBook({page: this.page, pageSize: this.pageSize, user: this.userInfo._id }).then(res => {
        const data = res.bean
         if (data.length > 0) {
           data.forEach(item => {
             this.publishList.push(item)
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
.user-info-page {
  background: #f5f5f5;
  padding-bottom: 20px;
  .content {
    background: #fff;
    position: relative;
    padding-bottom: 30px;
    .btn-box {
      position: absolute;
      right: 50px;
      top: 20px;
    }
    .user-img {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      display: inline-block;
      margin-top: 20px;
      margin-left: 20px;
    }
    .user-info {
      position: absolute;
      left: 160px;
      top: 20px;
      .name-box {
        .sex {
          width: 35px;
          height: 35px;
          position: relative;
          top: 3px;
        }
        .name {
          display: inline-block;
          font-size: 36px;
          color: #333;
          margin-left: 10px;
          font-weight: bold;
        }
      }
      .address {
        font-size: 28px;
        color: #333;
        margin-top: 10px;
        margin-left: 5px;
      }
    }
    .desc {
      font-size: 28px;
      width: 690px;
      margin: 10px auto;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #333;
    }
  }
  .statistics {
    width: 500px;
    margin-top: 20px; 
    display: flex;
    text-align: center;
    color: #333;
    font-size: 30px;
    font-weight: bold;
    .item {
      flex: 1;
    }
  }
  .user-publish {
    margin-top: 40px;
    .title {
      font-size: 32px;
      font-weight: bolder;
      margin: 0 15px;
    }
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
