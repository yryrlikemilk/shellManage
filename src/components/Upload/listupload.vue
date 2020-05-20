<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :auto-upload="false"
      :show-file-list="showlist"
      :on-preview="handlePictureCardPreview"
      :on-success="success"
      :on-remove="handleRemove"
      :on-change="updata"
    >
      <img v-if="!showlist&&dialogImageUrl" :src="dialogImageUrl" class="avatar">
      <i v-else class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body width="40%">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/applyfor'
export default {
  components: {},
  props: {
    autoUpload: {
      type: Boolean,
      default: false
    },
    showlist: {
      type: Boolean,
      default: true
    },
    value: {
      type: undefined,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      fileList: this.value,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    success(response, file, fileList) {
      this.$emit('input', response)
    },
    handleRemove(file, fileList) {
      this.$emit('input', fileList)
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    updata(file, fileList) {
      if (!this.autoUpload) return
      var formdata = new FormData()
      formdata.append('file', file.raw)
      this.loading = true
      uploadImage(formdata).then(res => {
        this.dialogImageUrl = res.object.url
        this.$emit('input', res.object)
        this.loading = false
      })
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
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
