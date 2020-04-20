<template>
  <div class="book-detail">
    <div class="container">
      <app-header :title="title"></app-header>
      <div class="user-info" @click="goToUserInfoPage">
        <img :src="userInfo.image" alt="" class="user-img">
        <div class="user-name">
          <img :src="userInfo.sex === '男' ? require('@/assets/images/man-icon.png') : require('@/assets/images/woman-icon.png')" alt="" class="sex">
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="school">{{ userInfo.school }}</div>
      </div>
      <div class="price"><span>￥</span>{{ price }}</div>
      <span class="label">{{ bookType }}</span>
      <div class="book-info">
        <div class="item">
          <span class="name">书籍名称</span>
          {{ bookName }}
        </div>
        <div class="item">
          <span class="name">作者</span>
          {{ author }}
        </div>
        <div class="item">
          <span class="name">出版社</span>
          {{ press }}
        </div>
      </div>
      <div class="desc-box">
        <span class="title">书籍描述</span>
        <div class="desc">{{ desc }}</div>
      </div>
      <div class="image-box">
        <img v-for="(item, index) in bookImgList"
          :key="index"
          :src="item"
          @click="getImg(bookImgList, index)" class="book-img">
      </div>
      <p class="look-info">
        浏览{{ lookNum }}
      </p>
      <div class="wall"></div>
      <div class="comment-box">
        <div class="header">
          全部留言 · <span>{{ commentNum }}</span>
        </div>
        <div class="coment-item-content">
          <div class="outside-comment" v-for="(item, index) in commentList" :key="index" >
            <div class="one-comment" @click="commentUser(item, item._id, index)">
              <div class="user-box">
                <img :src="item.from.image" alt="" class="user-img">
                <span class="user-name">{{ item.from.name }}</span>
              </div>
              <div class="comment-content">{{ item.content }}</div>
              <div class="time">{{ item.create_time }}</div>
            </div> 
            <div class="children-comment" v-for="(_item, _index) in item.items" :key="_index" @click="commentUser(_item, item._id, index)">
              <div class="user-box">
                <img :src="_item.from.image" alt="" class="user-img">
                <span class="user-name">{{ _item.from.name }}</span>
              </div>
              <div class="comment-content">回复@{{ _item.to.name }}:{{ _item.content }}</div>
              <div class="time">{{ _item.create_time }}</div>
            </div>
          </div> 
        </div>
        <div v-if="commentList.length === 0" class="tip-text">暂无此类书籍~</div>
        <p v-if="isMore && commentList.length > 0" class="footer-text" @click="lookMore">查看更多<img class="icon" :src="require('@/assets/images/look-more.png')" alt=""></p>
        <p v-if="!isMore && commentList.length > 0" class="footer-text">没有更多了</p>
      </div>
    </div>
    <div class="bottom-fixed-box" v-show="!isShowKeyBorad" v-if="isShowFixed">
      <div class="left-box">
        <div class="item" v-for="(item, index) in fixedItemList" :key="index" @click="clickFixedItem(item)">
          <img :src="isStar ? item.icon2 : item.icon1" alt="" class="icon" v-if="item.sign === 'star'">
          <img :src="item.icon" alt="" class="icon" v-if="item.sign === 'comment'">
          <img :src="isCollection ? item.icon2 : item.icon1" alt="" class="icon" v-if="item.sign === 'collection'">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="right-box" v-if="hasBuy">
        <div class="item car" @click="addCar">加入购物车</div>
        <div class="item buy" @click="goToBuy">立即购买</div>
      </div>
    </div>
    <div class="comment-input-box" v-show="isShowKeyBorad">
      <img :src="require('@/assets/images/keyboard-icon.png')" alt="" class="keyboard-icon">
      <img :src="info.image" alt="" class="user-img">
      <input type="text" class="input" ref="commentInput" :placeholder="placeholderVal" v-model="commentVal">
      <div class="send" @click.stop="comment">发送</div>
    </div>
    <div class="model" v-show="isShowKeyBorad" @click="isShowKeyBorad = false"></div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import * as time from '@/utils/time'
import Vue from 'vue';
import { mapState } from "vuex";
import { ImagePreview } from 'vant';
import { Dialog, Toast} from 'vant';
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(ImagePreview);
export default {
  name: 'book-detail',
  data() {
    return {
      title: '书籍详情',
      userInfo: {},
      desc: '',
      bookType: '',
      price: '',
      userImg: '',
      show: false,
      index: 0,
      isStar: false,
      isCollection: false,
      isShowKeyBorad: false,
      placeholderVal: '',
      commentVal: '',
      isShowFixed: true,
      bookId: '',
      lookNum: 0,
      commentNum: 0,
      isMore: true,
      page: 1,
      pageSize: 5,
      hearMan: '',
      hearName: '',
      parentId: '',
      activeIndex: '',
      hasBuy: true,
      bookName: '',
      press: '',
      author: '',
      fixedItemList: [
        { 
          sign:'star',
          icon1: require('@/assets/images/star-icon.png'),
          icon2: require('@/assets/images/is-star-icon.png'),
          name: '超赞'
        },
        {
          sign:'comment',
          icon: require('@/assets/images/comment-icon.png'),
          name: '留言'
        },
        {
          sign:'collection',
          icon1: require('@/assets/images/collection-icon.png'),
          icon2: require('@/assets/images/is-collection-icon.png'),
          name: '收藏'
        }
      ],
      bookImgList: [],
      commentList: [
      ]
    };
  },
  components: {
    AppHeader
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.bookId = to.query.id
      Promise.all([
        vm.API.getBookInfo({
          id: to.query.id
        }),
        vm.API.findComment({
          book: to.query.id,
          page: 1,
          pageSize: 5
        }),
        vm.API.lookBook({
          id: vm.bookId
        })
      ]).then(([bookInfoRes, commentRes, lookBookRes]) => {
          const data = bookInfoRes.records[0]
          vm.desc = data.desc
          vm.bookType = data.book_type.name
          vm.price = data.price
          vm.userInfo = data.user
          vm.bookImgList = data.image
          vm.bookName = data.name
          vm.author = data.author
          vm.press = data.press
          vm.lookNum = data.look ? data.look : 0
          vm.hasBuy = data.status === '1' ? true : false
          if (data.user._id === vm.info._id) {
            vm.isShowFixed = false
          }
          const list = commentRes.bean.records
          list.forEach(item => {
            item.create_time = time.getUpdateTime(item.create_time)
            item.items.forEach(_item => {
              _item.create_time = time.getUpdateTime(_item.create_time)
            })
          })
          vm.commentList = commentRes.bean.records
          vm.commentNum = commentRes.bean.total
          console.log(lookBookRes)
      })
      if (vm.token) {
        Promise.all([
          vm.API.isStar({
            book: to.query.id,
            user: vm.info._id
          }),
          vm.API.isCollect({
              book: to.query.id,
              user: vm.info._id
            }),
          vm.API.createHistory({
            book: to.query.id,
            user: vm.info._id
          })
        ]).then(([isStarRes, isCollectRes, createHistoryRes]) => {
          if (isStarRes.bean.length > 0) {
            vm.isStar = true
          }
          if (isCollectRes.bean.length > 0) {
            vm.isCollection = true
          }
          console.log(createHistoryRes)
        })
      }
    })
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    }),
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    // 查看图片
    getImg (images, index) {
      ImagePreview({
        images: images,
        showIndex: true,
        loop: false,
        startPosition: index
      })
    },
    clickFixedItem(item) {
      const sign = item.sign
      switch(sign) {
        case 'star':
          if (this.token) {
            if (this.isStar) {
              this.API.cancelStar({
                user: this.info._id,
                book: this.bookId
              }).then(res => {
                console.log(res)
              })
            } else {
              this.API.starBook({
                user: this.info._id,
                book: this.bookId,
                seller: this.userInfo._id
              }).then(res => {
                console.log(res)
              })
            }
            this.isStar = !this.isStar
          } else {
            Dialog.alert({
              title: '提示',
              message: '请先登录后才可点赞'
            }).then(() => {
              this.$router.push('/login')
            });
          }    
          break
        case 'comment':
          this.isShowKeyBorad = true 
          this.$nextTick(() => {
            this.placeholderVal = '看对眼就留言，问问更多细节~'
            this.$refs.commentInput.focus()
            this.hearMan = ''
          })
          break
        case 'collection':
          if (this.token) {
            if (this.isCollection) {
              this.API.cancelCollect({
                user: this.info._id,
                book: this.bookId
              }).then(res => {
                console.log(res)
              })
            } else {
              this.API.collectBook({
                user: this.info._id,
                book: this.bookId,
                seller: this.userInfo._id
              }).then(res => {
                console.log(res)
              })
            }
            this.isCollection = !this.isCollection
          } else {
            Dialog.alert({
              title: '提示',
              message: '请先登录后才可收藏'
            }).then(() => {
              this.$router.push('/login')
            });
          }
          break
      }
    },
    addCar() {
      Dialog.confirm({
        title: "提示",
        message: "确定要将该书籍加入购物车吗？"
      }).then(() => {
        this.API.addCar({
          user: this.info._id,
          seller: this.userInfo._id,
          book: this.bookId,
        }).then(res => {
          if (res.success) {
             Toast('已添加至购物车')
          }
        })
        }).catch(() => {
        });
    },
    goToBuy() {
      Dialog.confirm({
        title: "提示",
        message: "确定要下单购买该书籍吗？"
      }).then(() => {
          if (this.token) {
            this.$router.push({ path: '/confirmOrder', query: {
              id: this.bookId
            }})
          } else {
            Dialog.alert({
              title: '提示',
              message: '请先登录后才可购买书籍'
            }).then(() => {
              this.$router.push('/login')
            });
          }
        })
    },
    comment() {
      if (this.token) {
        if (this.commentVal === '') {
          Toast('评论内容不能为空')
        } else if (this.hearMan || this.hearName) {
          if (this.hearMan === this.info._id || this.hearName === this.info.name) {
            Toast('不能评论自己')
            this.commentVal = ''
            this.hearName = ''
            this.hearMan = ''
            this.isShowKeyBorad = false
          } else {
            this.API.createComment({
              from: this.info._id,
              to: this.hearMan,
              content: this.commentVal,
              book: this.bookId,
              parentId: this.parentId
            }).then(res => {
              if (res.success) {
                this.commentList[this.activeIndex].items.push({
                  from: {
                    name: this.info.name,
                    image: this.info.image
                  },
                  to: {
                    name: this.hearName,
                  },
                  content: this.commentVal,
                  create_time: '刚刚'
                })
                this.commentVal = ''
                this.isShowKeyBorad = false
              }
            })
          }
        } else {
          this.API.createComment({
            from: this.info._id,
            to: this.userInfo._id,
            content: this.commentVal,
            book: this.bookId
          }).then(res => {
            if (res.success) {
              this.isShowKeyBorad = false
              this.commentList.push({
                from: {
                  name: this.info.name,
                  image: this.info.image
                },
                content: this.commentVal,
                create_time: '刚刚'
              })
              this.commentNum = this.commentNum + 1
            }
            this.commentVal = ''
          })
        }
      } else {
         Dialog.alert({
          title: '提示',
          message: '请先登录后评论'
        }).then(() => {
          this.$router.push('/login')
        });
      } 
    },
    commentUser(item, parentId, index) {
      console.log(item)
      this.isShowKeyBorad = true
      this.placeholderVal = `回复@${item.from.name}`
      this.$refs.commentInput.focus()
      this.hearMan = item.from._id
      this.hearName = item.from.name
      this.parentId = parentId
      this.activeIndex = index
    },
    lookMore() {
      this.page = this.page + 1
      this.API.findComment({ page: this.page, pageSize: this.pageSize, book: this.bookId }).then(res => {
        const data = res.bean.records
         if (data.length > 0) {
           data.forEach(item => {
             item.create_time = time.getUpdateTime(item.create_time)
             this.commentList.push(item)
           })
         } else {
           this.isMore = false
         }
      })
    },
    goToUserInfoPage() {
      this.$router.push({ path: '/userInfoPage', query: {
        id: this.userInfo._id
      }})
    }
  },
};
</script>

<style lang='scss' scoped>
.book-detail {
  width: 750px;
  height: auto;
  margin: 0 auto;
  background: #fff;
  padding-bottom: 120px;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    height: 100%;
    overflow: auto;
  }
  .user-info {
    margin-top: 30px;
    margin-left: 30px;
    position: relative;
    .user-img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      display: inline-block;
    }
    .user-name {
      position: absolute;
      top: 0;
      left: 100px;
      .sex {
        width: 35px;
        height: 35px;
        position: relative;
        top: 6px;
      }
      .name {
        font-size: 28px;
        font-weight: bold;
        color: #333;
        margin-left: 5px;
      }
    }
    .school {
      font-size: 26px;
      color: #666;
      position: absolute;
      left: 105px;
      top: 45px;
    }
  }
  .price {
    color: red;
    font-size: 36px;
    font-weight: bold;
    margin-top: 30px;
    margin-left: 30px;
    display: inline-block;
    span {
      font-size: 28px;
    }
  }
  .label {
    padding: 5px;
    background: #1E90FF;
    border-radius: 5px;
    color: #fff;
    font-weight: 600;
    margin-left: 30px;
    margin-top: 10px;
    display: inline-block;
  }
  .desc-box {
    margin-top: 10px;
    font-size: 30px;
    color: #333;
    line-height: 55px;
    padding: 20px;
    font-weight: bold;
    .title {
      font-size: 34px;
    }
  }
  .book-info {
    margin-left: 20px;
    margin-top: 20px;
    .title {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      margin: 25px 20px;
    }
    .item {
      margin: 15px 0;
      font-size: 28px;
      color: #333;
      font-weight: bold;
      .name {
        margin-right: 10px;
        color: #666;
      }
    }
  }
  .image-box {
    margin-top: 20px;
    .book-img {
      width: 690px;
      height: auto;
      margin: 0 auto;
      display: block;
      margin-bottom: 30px;
    }
  }
  .look-info {
    font-size: 28px;
    color: #666;
    text-align: right;
    margin-right: 30px;
    margin-top: 30px;
  }
  .wall {
    width: 750px;
    height: 30px;
    margin: 0 auto;
    background: #f5f5f5;
  }
  .comment-box {
    position: relative;
    .header {
      font-size: 30px;
      color: #333;
      font-weight: bold;
      margin-left: 30px;
      height: 80px;
      line-height: 80px;
    }
    .coment-item-content {
      background: #fff;
      margin-top: 10px;
      .outside-comment{
        border-top: 1px solid #f5f5f5;
        // border-bottom: 1px solid #f5f5f5;
        margin-bottom: 20px;
        .comment-content {
          width: 620px;
        }
      }
      .children-comment {
        width: 90%;
        margin-left: 60px;
        border-top: 1px solid #f5f5f5;
        margin-top: 10px;
        .comment-content {
          width: 580px;
        }
      }
      .comment-content {
        font-size: 28px;
        color: #333;
        margin: 0px 0 0 80px;
        box-sizing: border-box;
      }
      .time {
        font-size: 26px;
        color: #999;
        margin-left: 80px;
        margin-top: 5px;
      }
      .user-box {
          .user-img {
            width: 50px;
            height: 50px;
            display: inline-block;
            border-radius: 5px;
            margin: 20px 0 0 20px;
          }
          .user-name {
            font-size: 28px;
            color: #333;
            font-weight: 600;
            position: relative;
            top: -15px;
            left: 15px;
          }
        }
    }
    .tip-text {
      text-align: center;
      position: absolute;
      top: 100px;
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
  .bottom-fixed-box {
    width: 750px;
    position: fixed;
    bottom: -3px;
    left: 0;
    right: 0;
    margin: auto;
    height: 105px;
    background: #fff;
    .left-box {
      width: 300px;
      display: flex;
      padding-top: 10px;
      box-sizing: border-box;
      .item {
        flex: 1;
        text-align: center;
        .icon {
          width: 40px;
          height: 40px;
        }
        span {
          font-size: 26px;
          display: block;
        }
      }
    }
    .right-box {
      width: 350px;
      height: 80px;
      line-height: 80px;
      font-size: 28px;
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
      text-align: center;
      display: flex;
      border-radius: 50px;
      overflow: hidden;
      color: #fff;
      font-weight: bold;
      .item {
        flex: 1;
      }
      .car {
        background: linear-gradient(to right,#FFD700, #FFA500);
      }
      .buy {
        background: #FF4500;
      }
    }
  }
  .comment-input-box {
    width: 750px;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: -3px;
    left: 0;
    right: 0;
    margin: auto;
    height: 100px;
    background: #fff;
    padding-top: 20px;
    box-sizing: border-box;
    z-index: 999;
    .keyboard-icon {
      width: 50px;
      height: 50px;
      display: inline-block;
      margin-left: 10px;
    }
    .user-img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      display: inline-block;
      margin: 0 15px;
      position: relative;
      top: 5px;
    }
    .input {
      outline: none;
      border: none;
      background: #D3D3D3;
      width: 420px;
      padding: 15px 25px;
      border-radius: 50px;
      position: relative;
      top: -10px;
    }
    .send {
      display: inline-block;
      width: 100px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 26px;
      background: #FFD700;
      margin-left: 20px;
      position: relative;
      top: -10px;
    }
  }
  .model {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    background: rgba(0,0,0,0);
  }
}
</style>
