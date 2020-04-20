<template>
  <div class="edit-news">
    <el-dialog
      :title="title || '新建资讯'"
      :visible.sync="visible"
      width="50%"
    >
      <!-- 添加分类弹框内容 -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="图片上传">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="httpRequest"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="data.image" :src="data.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="链接路径">
          <el-input v-model="data.link"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'edit-news',
  data () {
    return {
      // 添加图片对话框默认关闭
      visible: false,
      imageUrl: '',
      link: '',
      form: {
      }
    }
  },
  props: ['title', 'data'],
  methods: {
    handleAvatarSuccess(res, file) {
      let formData = new FormData()
      formData.append('img', file.file)
      this.API.uploadImage(formData).then(res => {
        this.data.image = res.path
      })
    },
    beforeAvatarUpload() {

    },
    httpRequest(data) {
      let formData = new FormData()
      formData.append('img', data.file)
      this.API.uploadImage(formData).then(res => {
        this.data.image = res.path
      })
    },
    confirm() {
      if (this.data._id) {
        this.API.editNews({
          id: this.data._id,
          image: this.data.image,
          link: this.data.link
        }).then(res => {
          if (res.success) {
            this.visible = false
            this.$emit('add')
          }
        })
      } else {
        this.API.addNews({
          image: this.data.image,
          link: this.data.link
        }).then(res => {
          if (res.success) {
            this.visible = false
            this.$emit('add')
          }
        })
      }   
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
