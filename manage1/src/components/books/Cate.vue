<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="AddCateDialog = true"
            >添加分类</el-button
          ></el-col
        ></el-row
      >
      <!-- 表格区域 -->
      <el-table :data="catelist" border stripe>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="分类名称"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间"> 
          <template slot-scope="scope">
            {{ timeFormatter(scope.row.create_time, 'Y-M-D h:m:s') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
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
      <!-- <tree-table
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      > -->
      <!-- 操作 -->
      <!-- <template slot-scope="scope"> -->
      <!-- <template slot="opt"> -->
      <!-- <template slot-scope="scope"> @click="showEditDialog(scope.row.id)"传id再加上去-->
      <!-- <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="showCateEditDialog(scope.row)"
            >编辑</el-button
          > -->
      <!-- 删除按钮 @click="removeUserById(scope.row, id)" -->
      <!-- <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="removeCateById"
            >删除</el-button
          > -->
      <!-- </template>
      </tree-table> -->

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="AddCateDialog"
      width="50%"
      @close="AddCateDialogClosed"
    >
      <!-- 添加分类弹框内容 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cate_name">
          <el-input v-model="addCateForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddCateDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="confirmAdd"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 书籍分类编辑对话框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editCateDialogVisible"
      width="50%"
    >
      <el-form
        :model="editCateForm"
        :rules="editCateFormRules"
        ref="editCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cate_name">
          <el-input v-model="editCateForm.name"></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBookClassify"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      AddCateDialog: false,
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },

      // 商品分类的数据列表，默认为空
      catelist: [
      ],
      //   总数据条数
      total: 0,
      //   为table制定列的定义
      // columns: [
      //   {
      //     label: '分类名称',
      //     prop: 'cat_name',
      //     minWidth: '50px'
      //   },
      //   {
      //     label: '操作',
      //     type: 'template',
      //     template: 'scope'
      //   }
      // ],
      //   添加分类表单的数据对象
      addCateForm: {
        name: ''
      },
      addCateFormRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      //   父级分类的列表，自动获取到的，下列是假数据
      ParentCateList: [
        { id: 0, name: '计算机类' },
        { id: 1, name: '语言类' },
        { id: 2, name: '医药类' }
      ],

      // 控制编辑分类对话框的显示与隐藏
      editCateDialogVisible: false,
      editCateForm: {
        name: ''
      },
      editCateFormRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCatelist()
  },
  methods: {
    //   获取商品分类的数据
    async getCatelist() {
      this.API.bookClassifyList({
        desc: this.queryInfo.query,
        page: this.queryInfo.pagenum,
        pageSize: this.queryInfo.pagesize
      }).then(res => {
        this.catelist = res.bean.records
        this.total = res.bean.total
      })
    },
    // 监听pagesize改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      this.getCatelist()
    },
    // 监听当前页面
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getCatelist()
    },
    // 点击按钮时显示对话框
    showAddCateDialog() {
      this.addCateDialogVisible = true
    },
    showAddCateDialogClosed() {},
    // 监听添加分类对话框的关闭事件，重置表单(选择器中未生效)
    AddCateDialogClosed() {
      this.$refs.addCateFormRules.resetFields()
      // this.addCateForm = []
    },
    editBookClassify() {
      this.API.editBookClassify({
        id: this.editCateForm._id,
        name: this.editCateForm.name
      }).then(res => {
        if (res.success) {
          this.getCatelist()
          this.editCateDialogVisible = false
        }
      }) 
    },
    // 展示分类编辑对话框
    handleEdit(row) {
      console.log(row)
      this.editCateForm = JSON.parse(JSON.stringify(row))
      // console.log(id)传id时再加
      // const { data: res } = this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败')
      // }
      // this.editForm = res.data
      this.editCateDialogVisible = true
    },
    // 根据id删除分类
    async removeCateById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该分类, 是否继续?',
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
      this.API.deleteBookClassify({
        id
      }).then(res => {
        if (res.success) {
          this.getCatelist()
        }
      })   
    },
    confirmAdd() {
      this.API.addBookClassify(this.addCateForm).then(res => {
        if (res.success) {
          this.getCatelist()
          this.AddCateDialog = false
        }
      }).catch(() => {
        this.getCatelist()
        this.AddCateDialog = false
      })
    },
    timeFormatter(number, format) {
      let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
      let returnArr = [];
      let date = new Date(number * 1000);
      if (typeof (number) == 'object') {
        date = new Date();
      }
      returnArr.push(date.getFullYear());
      returnArr.push(this.formatNumber(date.getMonth() + 1));
      returnArr.push(this.formatNumber(date.getDate()));
      returnArr.push(this.formatNumber(date.getHours()));
      returnArr.push(this.formatNumber(date.getMinutes()));
      returnArr.push(this.formatNumber(date.getSeconds()));
      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    },
   formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
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
.el-select {
  width: 100%;
}
</style>
