<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
      <el-breadcrumb-item>校园快讯</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showEditNews"
            >添加快讯</el-button
          ></el-col
        ></el-row
      >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="image" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" min-width="50" height="50" />
          </template>
        </el-table-column>
        <el-table-column prop="link" label="链接"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格区域 -->
      <!-- <tree-table
        :data="photolist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      > -->
      <!-- 操作 -->
      <!-- <template slot="opt"> -->
      <!-- <template slot-scope="scope"> @click="showEditDialog(scope.row.id)"传id再加上去-->
      <!-- <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="showCateEditDialog"
            >更换</el-button
          > -->
      <!-- 删除按钮 @click="removeUserById(scope.row, id)" -->
      <!-- <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="removeCateById"
            >删除</el-button
          >
        </template>
      </tree-table> -->
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加图片对话框 -->
    <EditNews ref="editNews" :title="title" :data="rowData" @add="addNews"></EditNews>
  </div>
</template>

<script>
import EditNews from './EditNews'
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: 5,
      //   为table制定列的定义
      tableData: [
      ],
      // 商品分类的数据列表，默认为空
      photolist: [
        {
          picture: '图片1',
          cat_level: 0
        },
        {
          picture: '图片2',
          cat_level: 0
        },
        {
          picture: '图片3',
          cat_level: 0
        }
      ],
      rowData: {},
      title: ''
    }
  },
  components: {
    EditNews
  },
  created() {
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      this.API.newsList({
        name: this.queryInfo.query,
        page: this.queryInfo.pagenum,
        pageSize: this.queryInfo.pagesize
      }).then(res => {
        this.tableData = res.bean.records
        this.total = res.bean.total
      })
    },
    addNews() {
      this.getNewsList()
    },
    handleEdit(index, row) {
      this.title = '编辑资讯'
      this.$refs.editNews.visible = true
      console.log(row)
      this.rowData = JSON.parse(JSON.stringify(row))
    },
    handleDelete(index, row) {
      this.$confirm('是否删除该项数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.API.deleteNews({
            id: row._id
          }).then(res => {
            if(res.success) {
              this.getNewsList()
            }
          })
        })
        .catch(() => {})
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    showEditNews() {
      this.title = ''
      this.rowData = {
        image: '',
        link: ''
      }
      this.$refs.editNews.visible = true
    },
    showCateEditDialog(item) {
      console.log(item)
      this.$refs.editNews.visible = true
    },
    //   监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getNewsList()
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getNewsList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  .el-button {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
}
</style>
