<template>
  <div class="publish-wrapper"> 
    <app-header :title="title"></app-header>
    <textarea 
      class="desc" 
      maxlength="150" 
      placeholder="请介绍你想要发布的书籍详情，如新旧程度，入手渠道，转手原因等"
      v-model="desc"
    ></textarea>
    <van-uploader 
      v-model="fileList" 
      :after-read="afterRead" 
      :before-read="beforeRead" 
      @delete="deleteBookImage"
      multiple  
      :max-count="3"/>
    <van-cell-group>
      <van-field v-model="name" placeholder="请输入书籍名称" label="书名"/>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="press" placeholder="请输入出版社" label="出版社"/>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="author" placeholder="请输入作者" label="作者"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell 
        title="价格" 
        is-link 
        :value="price" 
        icon="gold-coin" 
        @click="changePrice" 
        :class="{ 'is-price': priceVal !== ''}"/>
      <van-cell title="书籍类型" icon="setting">
        <template slot="right-icon">
          <van-dropdown-menu>
            <van-dropdown-item v-model="dropDownValue" :options="option1" />
          </van-dropdown-menu>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="publish-btn" @click="publish">发布</div>
    <van-number-keyboard
      :show="showKeyBoard"
      theme="custom"
      extra-key="."
      v-model="priceVal"
      close-button-text="完成"
      @blur="showKeyBoard = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { Button, Uploader, Toast, NumberKeyboard, DropdownMenu, DropdownItem, Dialog, Field  } from 'vant';
import { mapState } from "vuex";
import AppHeader from "@/components/AppHeader";
Vue.use(Button);
Vue.use(Uploader);
Vue.use(NumberKeyboard);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Field);
export default {
  name: "publish",
  data() {
    return {
      title: '发布书籍',
       fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
      ],
      showKeyBoard: false,
      priceVal: '',
      dropDownValue: '',
      option1: [],
      imageArr: [],
      desc: '',
      name: '',
      press: '',
      author: '',
      id: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.token) {
        vm.API.getBookClassify().then(res => {
          const data = res.records
          data.forEach(item => {
            vm.option1.push({ text: item.name, value: item._id })
          })
        })
        if (to.query.id) {
          vm.id = to.query.id
          vm.API.getBookInfo({
            id: to.query.id
          }).then(res => {
            const data = res.records[0]
            vm.priceVal = data.price
            vm.dropDownValue = data.book_type._id
            vm.imageArr = JSON.parse(JSON.stringify(data.image))
            res.base64Arr.forEach(item => {
              vm.fileList.push({
                content: item
              })
            })
            vm.desc = data.desc
            vm.name = data.name
            vm.author = data.author
            vm.press = data.press
          })
        }
      } else {
        Dialog.alert({
          title: '提示',
          message: '请先登录后再发布书籍'
        }).then(() => {
          vm.$router.push('/login')
        });
      }
      
    })
  },
  computed: {
    price() {
      return this.priceVal === '' ? '开个价' : `￥${this.priceVal}`
    },
    ...mapState({
      info: state => state.user.info,
      token: state => state.user.token
    })
  },
  components: {
    AppHeader,
    [Dialog.Component.name]: Dialog.Component
  },
  methods: {
    publish() {
      if (this.desc === '') {
        Toast('请输入书籍描述')
      } else if (this.imageArr.length === 0) {
        Toast('请上传书籍图片')
      } else if (this.priceVal === '') {
        Toast('请输入书籍价格')
      } else if (this.dropDownValue === '') {
        Toast('请选择书籍分类')
      } else if (this.name === '') {
        Toast('请输入书籍名称')
      } else if (this.press === '') {
        Toast('请输入出版社')
      } else if (this.author === '') {
        Toast('请输入作者')
      } else {
        if (this.id) {
          this.API.publish({
            id: this.id,
            desc: this.desc,
            name: this.name,
            press: this.press,
            author: this.author,
            imageArr: this.imageArr,
            price: this.priceVal,
            type: this.dropDownValue,
            userId: this.info._id
          }).then(res => {
            if (res.success) {
              Toast(res.message)
              this.$router.push('/home')
            }
          })
        } else {
          this.API.publish({
            desc: this.desc,
            name: this.name,
            press: this.press,
            author: this.author,
            imageArr: this.imageArr,
            price: this.priceVal,
            type: this.dropDownValue,
            userId: this.info._id
          }).then(res => {
            if (res.success) {
              Toast(res.message)
              this.$router.push('/home')
            }
          })
        }
      }
    },
    beforeRead(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        Toast('请上传 jpg 或png格式图片');
        return false;
      }
      return true;
    },
    afterRead(file) {
      let formData = new FormData()
      formData.append('img', file.file)
      this.API.bookImageUpload(formData).then(res => {
        this.imageArr.push(res.path)
      })
      console.log(this.fileList)
    },
    onInput(value) {
      console.log(value)
    },
    onDelete(value) {
      console.log(value)
    },
    changePrice() {
      this.showKeyBoard = true
    },
    deleteBookImage(file, info) {
      this.imageArr.splice(info.index, 1)
    }
  }
};
</script>

<style lang="scss">
.publish-wrapper {
  width: 750px;
  margin: 0 auto;
  overflow-x: hidden;
  background: #fff;
  .desc {
    width: 700px;
    height: 200px;
    display: block;
    margin: 0 auto;
    border: none;
    resize: none;
    font-size: 28px;
    margin-top: 10px;
  }
  .van-cell-group {
    width: 750px;
    .is-price {
      .van-cell__value {
        color: red;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
  .publish-btn {
    width: 750px;
    height: 100px;
    margin: 0 auto;
    line-height: 100px;
    background: linear-gradient(#87CEFA, #1E90FF);
    text-align: center;
    position: fixed;
    bottom: 0;
    font-size: 30px;
    color: #fff;
  }
  .van-dropdown-menu {
    width: auto;
    height: 40px;
    line-height: 40px;
    border: none;
    &::after {
      border: 0;
    }
    .van-popup--top {
      position: absolute;
      top: 19px;
    }
    .van-overlay {
      top: 20px;
    }
    .van-ellipsis {
      text-overflow: initial;
    }
  }
  .van-uploader {
    padding: 0 20px;
  }
}
</style>
