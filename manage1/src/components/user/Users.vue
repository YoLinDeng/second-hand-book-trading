<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row>
        <el-col :span="7">
          <el-input placeholder="请输入用户手机号" v-model="queryInfo.query" clearable @click="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button> -->
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="用户名" width="100px"></el-table-column>
        <el-table-column prop="image" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.image" min-width="50" height="50" />
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120px"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80px"></el-table-column>
        <el-table-column prop="birthday" label="生日" width="120px"></el-table-column>
        <el-table-column prop="school" label="学校"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="sign" label="个性签名"></el-table-column>
        <el-table-column label="操作" width="160px">
          <!-- <template slot-scope="scope"> @click="showEditDialog(scope.row.id)"传id再加上去-->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 @click="removeUserById(scope.row, id)" -->
            <el-button type="danger" icon="el-icon-delete" size="small" @click="removeUserById(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 添加用户内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone" maxlength="11"></el-input>
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
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.name" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="editForm.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy年M月d日"
          >
          </el-date-picker>
        </el-form-item>-->
        <el-form-item label="学校" prop="school">
          <el-input v-model="editForm.school" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="editForm.sign" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
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
        pagesize: 5
      },
      userList: [],
      total: 5,
      // 控制添加对话框的显示和隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        name: '',
        phone: '',
        password: ''
      },
      // 添加用户的表单验证规则
      addFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
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
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '手机号格式错误' }
        ]
      },
      // 控制修改用户对话框显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]{2,6}/,
            message: '必须是中文或英文或数字，长度2-6位字符'
          }
        ],
        school: [{ required: true, message: '请输入你的学校', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.API.userList({
        phone: this.queryInfo.query,
        pageNum: this.queryInfo.pagenum,
        pageSize: this.queryInfo.pagesize
      }).then(res => {
        this.userList = res.bean.records
        this.total = res.bean.total
      })
    },

    //   监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.vilidate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败')
        }
        this.$message.success('添加用户成功')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表
        this.getUserList()
      })
    },
    // 展示编辑用户对话框
    async showEditDialog(row) {
      this.editForm = JSON.parse(JSON.stringify(row))
      // console.log(id)传id时再加
      // const { data: res } = this.$http.get('users/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败')
      // }
      // this.editForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        this.API.updateUserInfo(this.editForm)
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
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        '是否永久删除该用户, 是否继续?',
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
      this.API.deleteUser({
        id
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
</style>
