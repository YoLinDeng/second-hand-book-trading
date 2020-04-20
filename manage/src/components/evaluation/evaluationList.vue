<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <el-row>
        <el-col :span="8"
          ><el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getEvaList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getEvaList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4"></el-col>
      </el-row>

      <!-- 留言列表 -->
      <el-table :data="evalist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="书籍名称"
          prop="book.name"
          width="200px"
        ></el-table-column>
        <el-table-column
          label="留言人"
          prop="from.name"
          width="200px"
        ></el-table-column>
         <el-table-column
          label="被留言人"
          prop="to.name"
          width="200px"
        ></el-table-column>
        <el-table-column
          label="留言内容"
          prop="content"
          show-overflow-tooltip
          width="200px"
        ></el-table-column>
        <!-- 操作区 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 @click="removeById(scope.row.goods_id)"-->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeCateById(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 只用了组件-->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 5, //    每页的数据
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 评论列表
      evalist: [
      ],
      total: 0
    }
  },
  created() {
    this.getEvaList()
  },
  methods: {
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`)
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`)
    // },
    //   监听pagesize改变的事件
    // handleSizeChange(newSize) {
    //   console.log(newSize)
    //   this.queryInfo.pagesize = newSize
    //   this.getEvaList()
    // },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getEvaList()
    },
    // 根据分页获取对应的评价列表
    async getEvaList() {
      this.API.commentList({
        name: this.queryInfo.query,
        page: this.queryInfo.pagenum,
        pageSize: this.queryInfo.pagesize
      }).then(res => {
        this.evalist = res.bean.records
        this.total = res.bean.total
      })
    },
    // 根据id删除分类
    async removeCateById(id) {
      const confirmResult = await this.$confirm(
        '该操作将永久删除该评论, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.API.deleteComment({
        id
      }).then(res => {
        this.getEvaList()
      }) 
    }
  }
}
</script>
>
<style lang="less" scoped></style>
