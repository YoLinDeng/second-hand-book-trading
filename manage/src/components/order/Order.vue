<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入订单编号"
            v-model="queryInfo.query"
            clearable
            @clear="getOrderList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList"
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
      </el-row>
      <!-- 订单列表数据 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="_id"></el-table-column>
        <el-table-column label="卖家" prop="seller.name"></el-table-column>
        <el-table-column label="买家" prop="buyer.name"></el-table-column>
        <el-table-column label="书籍名称" prop="book.name"></el-table-column>
        <el-table-column label="书籍价格" prop="book.price"></el-table-column>
        <el-table-column label="订单状态" prop="status">
          <template slot-scope="scope"
            ><el-tag type="" v-if="scope.row.status==='1'">已下单</el-tag>
            <el-tag type="danger" v-if="scope.row.status==='2'">已取消</el-tag>
            <el-tag type="success" v-if="scope.row.status==='3'">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="create_time"></el-table-column>
        <!-- <el-table-column label="操作"> -->
          <!-- <template slot-scope="scope"> -->
            <!-- <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showBox(scope.row)"
              >修改价格</el-button
            > -->
            <!-- 删除按钮 @click="removeById(scope.row.goods_id)"-->
            <!-- <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeById()"
            ></el-button> -->
          <!-- </template> -->
        <!-- </el-table-column> -->
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
    <!-- 修改地址对话框 -->
    <el-dialog title="修改价格" :visible.sync="addressVisible" width="50%">
      <el-form
        :model="priceForm"
        :rules="priceFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="价格" prop="price1">
          <el-input v-model="priceForm.price1"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false"
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
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 5,
      status: '',
      options: [
        {
          value: '1',
          label: '已下单'
        },
        {
          value: '2',
          label: '已取消'
        },
        {
          value: '3',
          label: '已完成'
        }
      ],
      orderlist: [
      ],
      addressVisible: false,
      priceForm: {
        price1: ''
      },
      priceFormRules: {
        price1: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      this.API.orderList({
        id: this.queryInfo.query,
        page: this.queryInfo.pagenum,
        pageSize: this.queryInfo.pagesize,
        status: this.status
      }).then(res =>{
        this.orderlist = res.bean.records
        this.total = res.bean.total
      })
      // const { data: res } = await this.$http.get('order', {
      //   params: this.query
      // })
      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取订单列表失败')
      // }
      // this.$message.success('获取订单列表成功')
      // this.orderlist = res.data.goods
      // this.total = res.data.total
    },
     //   监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    // 删除商品
    // async removeById(id) {
    //   const confirmResult = await this.$confirm(
    //     '此操作将永久删除该商品, 是否继续?',
    //     '提示',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   ).catch(err => err)
    //   console.log(confirmResult)
    //   if (confirmResult !== 'confirm') {
    //     return this.$message.info('已取消删除')
    //   }
    //   const { data: res } = this.$http.delete('users/' + id)
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('删除商品失败')
    //   }
    //   this.$message.success('删除商品成功')
    //   this.getUserList()
    // },
    // 展示修改地址对话框
    showBox(row) {
      this.priceForm.price1 = row.book.price
      this.addressVisible = true
    },
    changeStatus() {
      this.getOrderList()
    }
  }
}
</script>
<style lang="less" scoped></style>
