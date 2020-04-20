<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row>
        <el-col :span="7"
          ><el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @click="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">
            添加管理员</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="账号" width="400px">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="400px">
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <!-- <template slot-scope="scope"> @click="showEditDialog(scope.row.id)"传id再加上去-->
          <!-- 修改按钮 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 @click="removeUserById(scope.row, id)" -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeUserById(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加管理员"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!-- 添加用户内容主体区域 -->
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="账号" prop="name">
            <el-input v-model="addForm.name" maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" maxlength="10"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改用户信息对话框 -->
      <el-dialog
        title="修改管理员信息"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="70px"
        >
          <el-form-item label="账号" prop="name">
            <el-input v-model="editForm.name" maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editForm.password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [
      ],
      total: 5,
      // 控制添加对话框的显示和隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        name: '',
        password: ''
      },
      // 添加用户的表单验证规则
      addFormRules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]{2,6}/,
            message: '必须是中文或英文或数字，长度2-6位字符'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /[a-zA-Z0-9]{6,10}/,
            message: '密码必须为数字或字母组合，长度6-10'
          }
        ]
      },
      // 控制修改用户对话框显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]{2,6}/,
            message: '必须是中文或英文或数字，长度2-6位字符'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.API.adminList({
        name: this.queryInfo.query,
        pageSize: this.queryInfo.pagesize,
        pageNum: this.queryInfo.pagenum
      }).then(res => {
        this.userList = res.bean.records
        this.total = res.bean.total
      })
    },

    //   监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        this.API.createAdmin(this.addForm).then(res => {
          if (res.success) {
            // 隐藏添加用户的对话框
            this.addDialogVisible = false
            // 重新获取用户列表
            this.getUserList()
          }
        }).catch(() => {
        // 隐藏添加用户的对话框
          this.addDialogVisible = false
          // 重新获取用户列表
          this.getUserList()
        }) 
      })
    },
    // 展示编辑用户对话框
    async showEditDialog(row) {
      console.log(row)
      this.editForm = JSON.parse(JSON.stringify(row)) // 深拷贝
      // console.log(id)传id时再加
      // const { data: res } = this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败')
      // }
      // this.editForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    // editDialogClosed() {
    //   this.$refs.editFormRef.resetFields()
    // },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
       this.API.updateAdminInfo(this.editForm)
          .then(res => {
            if (res.success) {
              // 关闭对话框
              this.editDialogVisible = false
              // 重新获取用户列表
              this.getUserList()
            }
          })
          .catch(err => {
            // 关闭对话框
            this.editDialogVisible = false
            // 重新获取用户列表
            this.getUserList()
          })
      })
    },
    // 根据id删除对应的用户信息
    async removeUserById(_id) {
      const confirmResult = await this.$confirm(
        '是否永久删除该管理员, 是否继续?',
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
      this.API.deleteAdmin({
        _id
      }).then(res => {
        if (res.success) {
          this.getUserList()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-select {
  width: 100%;
}
// .el-date-picker{
//   width: 100%;
// }
</style>
