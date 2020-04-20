<template>
  <div class="look-history">
    <app-header :title="title"></app-header>
    <section class="content">
      <div class="item" v-for="(item, index) in hostoryList" :key="index">
        <div class="date">
          <span>{{ item.date }}</span>
        </div>
        <history-card :list="item.cardList"></history-card>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import AppHeader from "@/components/AppHeader"
import HistoryCard from '@/components/card/HistoryCard'
import { mapState } from "vuex";
import { Dialog } from 'vant';
Vue.use(Dialog);

export default {
  name: 'look-history',
  data() {
    return {
      title: '我的足迹',
      hostoryList: [
      ]
    };
  },
  components: {
    AppHeader,
    HistoryCard
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    }),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token) {
        vm.API.findHistoryList({
          id: vm.info._id
        }).then(res => {
          const data = res.bean
          const teamArr = []
          data.forEach(item => {
            if (!teamArr.includes(item.create_time)) {
              vm.hostoryList.push({
                date: item.create_time,
                cardList: [{ ...item.book }]
              })
              teamArr.push(item.create_time)
            } else {
              vm.hostoryList.forEach(_item => {
                if (_item.date === item.create_time) {
                  _item.cardList.push(item.book)
                }
              })
            }
          })
        })
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后才查看足迹'
        }).then(() => {
          vm.$router.push('/login')
        });
      }
    })
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.look-history {
  .content {
    .date {
      width: 750px;
      height: 80px;
      line-height: 80px;
      font-size: 26px;
      color: #999;
      background: #fff;
      margin: 0 auto;
      span {
        margin-left: 20px;
      }
    }
  }
}
</style>
