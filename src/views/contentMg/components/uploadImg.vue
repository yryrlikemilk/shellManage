<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-change="success"
      :on-remove="handleRemove"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :show-file-list="true"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body width="40%">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: undefined,
      required: true
    }
  },
  data() {
    return {
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
    // getdata(file) {
    //   this.$emit('input', file)
    // },
    success(response, fileList) {
      this.$emit('input', fileList)
    },
    handleRemove(file, fileList) {
      this.$emit('input', fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
