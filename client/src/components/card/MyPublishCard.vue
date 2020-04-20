<template>
  <div class="my-publish-card">
    <img :src="item.image[0]" alt class="goods-img" />
    <div class="desc">{{ item.desc }}</div>
    <div class="price">￥{{ item.price }}</div>
    <div class="num-box">
      <!-- <div class="comment">留言 {{ item.comment }}</div> -->
      <div class="browse">浏览 {{ item.look || '0' }}</div>
    </div>
    <div class="btn-box">
      <van-button type="default" class="edit" @click="edit">编辑</van-button>
      <van-button type="danger" class="delete" @click="clickDelete">删除</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Dialog, Toast } from 'vant';
Vue.use(Dialog);
Vue.use(Toast);

export default {
  name: "my-publish-card",
  data() {
    return {};
  },
  props: ['item'],
  methods: {
    clickDelete() {
      Dialog.confirm({
        title: "提示",
        message: "确定要删除这个发布信息吗？"
      })
        .then(() => {
          this.API.deletePublish({
            id: this.item._id
          }).then(res => {
            if(res.success) {
              Toast('删除成功')
              this.$emit('delete')
            }
          })
        })
        .catch(() => {
        });
    },
    edit() {
      this.$router.push({ path: '/publish', query: {
        id: this.item._id
      }})
    }
  }
};
</script>

<style lang='scss' scoped>
.my-publish-card {
  width: 690px;
  height: 180px;
  margin: 15px auto;
  background: #fff;
  border-radius: 10px;
  position: relative;
  .goods-img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .desc {
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    left: 140px;
    top: 20px;
    color: #333;
  }
  .price {
    font-size: 26px;
    color: #ff0000;
    font-weight: bold;
    position: absolute;
    left: 140px;
    top: 60px;
  }
  .num-box {
    width: 200px;
    position: absolute;
    left: 140px;
    top: 100px;
    font-size: 24px;
    color: #666;
    display: flex;
    .comment {
      flex: 1;
    }
    .browse {
      flex: 1;
    }
  }
  .btn-box {
    position: absolute;
    bottom: 20px;
    right: 30px;
    .van-button {
      width: 120px;
      height: 43px;
      line-height: 43px;
    }
    .edit {
      border-radius: 20px;
      font-size: 24px;
      margin-right: 20px;
    }
    .delete {
      border-radius: 20px;
      font-size: 24px;
    }
  }
}
</style>
