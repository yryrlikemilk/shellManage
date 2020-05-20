<template>
  <div>
    <el-button class="addbutton" @click="handleClick()">新增</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="idStr" label="编号" />
      <el-table-column prop="userImg" label="头像" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.userImgUrl"
            :preview-src-list="[scope.row.userImgUrl]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="名称" align="center" />
      <el-table-column prop="rawAddTimeStr" label="更新时间" align="center" />
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="发现类别" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form v-if="dialogFormVisible" ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="用户名称：" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="form.userName" style="max-width:250px" autocomplete="off" />
        </el-form-item>
        <el-form-item
          ref="headImgElement"
          label="头像："
          prop="uploadFile"
          :label-width="formLabelWidth"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarSuccess"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findUser, findUserAddOrUpdate } from '@/api/discoverCommodity'
export default {
  components: {},
  data() {
    return {
      rules: {
        userName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        uploadFile: [{ required: true, message: '请上传图片', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      tableData: [],
      imageUrl: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    handleClose() {
      this.form = {}
      this.imageUrl = ''
      this.dialogFormVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changedata()
        } else {
          if (this.form.uploadFile) {
            this.$refs['headImgElement'].clearValidate()
            this.form.userName ? this.changedata() : console.log('erorr')
          }
          return false
        }
      })
    },
    changedata() {
      findUserAddOrUpdate({ ...this.form }).then(res => {
        this.$message({
          message: `${this.form.id ? '编辑' : '新增'}成功`,
          type: 'success'
        })
        this.handleClose()
        this.getdata()
      })
    },
    getdata() {
      findUser().then(res => {
        this.tableData = res.object
      })
    },
    handleAvatarSuccess(file, fileList) {
      this.form.uploadFile = file.raw
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleClick(row = {}) {
      const { userName, idStr: id } = row
      this.form = { userName, id }
      this.dialogFormVisible = true
    }
  }
}
</script>
<style scoped>
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader /deep/ .el-upload:hover {
  border-color: #409eff;
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
.addbutton {
  float: right;
  margin-bottom: 15px;
}
</style>
