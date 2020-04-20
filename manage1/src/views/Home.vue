<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="logo"><img src="../assets/school.jpg" alt="" /></div>
      <span class="title">校园二手书后台管理系统</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="#2b4b6b"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :router="true"
          :default-active="$router.path"
        >
          <!-- 用户管理 -->
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-user-solid"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="users"
              ><template slot="title">
                <!-- 图标 -->
                <!-- <i class="el-icon-menu"></i> -->
                <!-- 文本 -->
                <span>用户列表</span>
              </template></el-menu-item
            >
              <el-menu-item index="administrators"
              ><template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <span>管理员列表</span>
              </template></el-menu-item
            >
          </el-submenu>
          <!-- 商品管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="bookList"
              ><template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <span>书籍列表</span>
              </template></el-menu-item
            >
            <el-menu-item index="categories"
              ><template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <span>书籍分类</span>
              </template></el-menu-item
            >
          </el-submenu>
          <!-- 订单管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="Order"
              ><template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <span>订单列表</span>
              </template></el-menu-item
            >
          </el-submenu>
          <!-- 留言管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-comment"></i>
              <span>留言管理</span>
            </template>
            <el-menu-item index="evaluationList"
              ><template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <span>留言列表</span>
              </template></el-menu-item
            >
          </el-submenu>
            <!-- 订单管理 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>资讯管理</span>
            </template>
            <el-menu-item index="News"
              ><template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <span>校园快讯</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <!-- 路由站位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
  .logo {
    img {
      width: 50px;
      height: auto;
      border-radius: 50%;
    }
  }
}
.el-header {
  height: 80px !important;
  background-color: #2b4b6b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  padding-left: 10px;
  position: relative;
  .title {
    position: absolute;
    left: 70px;
    top: 24px;
  }
  // 纵向居中对齐
  // > div{
  //   display: flex;
  //   align-items: center;
  //   span {
  //     margin-left: 15px;
  //   }
  // }
}
.el-aside {
  background-color: #2b4b6b;
}
.el-main {
  background-color: #eaedf1;
}
</style>
