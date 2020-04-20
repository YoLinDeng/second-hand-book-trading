<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <!-- 搜索区域 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入书籍名称"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-select v-model="status" placeholder="请选择" @change="changeStatus">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!-- 添加书籍区域 待定，不知道要不要-->
        <!-- <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加书籍</el-button
          >
        </el-col> -->
      </el-row>
      <!-- 书籍列表区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="书籍名称"
          prop="name"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="书籍图片"
          prop="image[0]"
          width="120px"
        >
          <template slot-scope="scope">
            <img :src="scope.row.image[0]" min-width="50" height="50" />
          </template>
        </el-table-column>
        <el-table-column
          label="书籍价格（元）"
          prop="price"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="书籍类型"
          prop="book_type.name"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="书籍描述"
          width="150px"
          show-overflow-tooltip
          prop="desc"
        ></el-table-column>
        <el-table-column
          label="作者"
          prop="author"
        ></el-table-column>
        <el-table-column
          label="出版社"
          width="100px"
          show-overflow-tooltip
          prop="press"
        ></el-table-column>
        <el-table-column label="书籍状态" prop="status">
          <template slot-scope="scope"
            ><el-tag type="danger" v-if="scope.row.status ==='1'">未购买</el-tag>
            <el-tag type="success" v-if="scope.row.status ==='2'">已购买</el-tag></template
          >
        </el-table-column>
        <!-- 操作区 -->
        <el-table-column label="操作" width="100px">
          <!-- 编辑按钮 -->
          <template slot-scope="scope">
            <!-- <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="booklistDialog(scope.row)"
            ></el-button> -->
            <!-- 删除按钮 @click="removeById(scope.row.goods_id)"-->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeById(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 只用了组件-->
            <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改书籍信息对话框 -->
    <el-dialog
      title="修改书籍信息"
      :visible.sync="bookDialogVisible"
      width="50%"
    >
      <el-form
        :model="editBookForm"
        :rules="editBookFormRules"
        ref="editBookFormRef"
        label-width="100px"
      >
        <el-form-item label="书籍名称" prop="goods_name">
          <el-input v-model="editBookForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="书籍价格" prop="goods_price">
          <el-input v-model="editBookForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="书籍类型" prop="goods_type">
          <el-input v-model="editBookForm.goods_type"></el-input>
        </el-form-item>
        <el-form-item label="书籍详情" prop="goods_details">
          <el-input
            v-model="editBookForm.goods_details"
          ></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bookDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bookDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加书籍对话框 -->
    <!-- <el-dialog
      title="添加书籍"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="书籍名称" prop="goods_name">
          <el-input v-model="ruleForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="书籍价格" prop="goods_price">
          <el-input v-model="ruleForm.goods_price"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      options: [
        {
          value: '1',
          label: '待购买'
        },
        {
          value: '2',
          label: '已购买'
        }
      ],
      status: '',
      // 添加书籍
      // ruleForm: {
      //   goods_name: '',
      //   goods_price: ''
      // },
      // rules: {
      //   goods_name: [
      //     { required: true, message: '请输入书籍名称', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   goods_price: [
      //     { required: true, message: '请输入价格', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ]
      // },
      // 商品列表
      goodslist: [
      ],
      total: 0,
      bookDialogVisible: false,
      editBookForm: {
        goods_name: '',
        goods_price: '',
        goods_type: '',
        goods_details: ''
      },
      editBookFormRules: {
        goods_name: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        goods_type: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        goods_details: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodList() {
      this.API.bookList({
        desc: this.queryInfo.query,
        page: this.queryInfo.pagenum,
        pageSize: this.queryInfo.pagesize,
        status: this.status
      }).then(res => {
        this.goodslist = res.bean.records
        this.total = res.bean.total
      })
    },
    // 删除商品
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.API.deleteBook({
        id
      }).then(res => {
        if (res.success) {
          this.getGoodList()
        }
      })
    },
    // 展示修改书籍信息对话框
    booklistDialog(row) {
      // console.log(row)
      this.editBookForm = JSON.parse(JSON.stringify(row))
      this.bookDialogVisible = true
    },
    //   监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getGoodList()
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getGoodList()
    },
    changeStatus() {
      this.getGoodList()
    }
  }
}
</script>
<style lang="less" scoped></style>
