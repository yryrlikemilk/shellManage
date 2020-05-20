<template>
  <div class="columnMgadd">
    <breadnar title="专题管理" :title1="title1" />
    <el-form ref="ruleForm" :model="ruleForm" hide-required-asterisk :rules="rules" label-width="130px" class="demo-ruleForm">
      <el-form-item label="选择分类：" prop="thematicTypeId">
        <el-select ref="thematicTypeId" v-model="ruleForm.thematicTypeId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模式：" prop="model">
        <el-radio-group v-model="ruleForm.model" size="small">
          <el-radio label="2" border>双图</el-radio>
          <el-radio label="1" border>单图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专题名称：" prop="thematicName">
        <el-input
          v-model="ruleForm.thematicName"
          maxlength="6"
          show-word-limit
          style="width:300px"
        />
      </el-form-item>
      <el-form-item ref="uploader" label="图标：" prop="uploader">
        <el-row type="flex" :gutter="20">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <el-col v-if="ruleForm.model==='2'" :span="6">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlTwo" :src="imageUrlTwo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-col>
        </el-row>

      </el-form-item>
      <el-form-item ref="thematicSpreadCategoryList" label="类型：" prop="thematicSpreadCategoryList" class="recommend">
        <p v-for="(item,index) in ruleForm.thematicSpreadCategoryList" :key="index">{{ item.mallCode|selectdata }} ： {{ item.mallCatgoryName }}</p>
        <el-button type="text" @click="dialogVisible=true">请选择类别</el-button>
      </el-form-item>
      <el-form-item label="备注（选填）：" prop="remark">
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          :rows="6"
          style="width:300px"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="排序：" prop="sequence">
        <el-input
          v-model="ruleForm.sequence"
          type="number"
          style="width:300px"
          placeholder="请输入排序"
        />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <switchel v-model="ruleForm.status" />
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button>返回</el-button>
      </el-form-item>

    </el-form>
    <el-dialog
      title="淘宝商品分类"
      :visible.sync="dialogVisible"
      width="50%"
      custom-class="specialMgaddDialog"
    >
      <div slot="title" class="dialogtitle">
        <h4> 推荐频道</h4> <span>勾选为显示</span>
      </div>
      <div class="dialogbody">
        <!-- <h4>淘宝</h4>
        <el-row>
          <el-col v-for="o in 20" :key="o" :span="4" style="margin-bottom:10px">
            <el-checkbox v-model="checked">备选项wer</el-checkbox>
          </el-col>
        </el-row> -->
        <h4>京东</h4>
        <div class="dialogbody">
          <el-checkbox-group v-model="checked" name="checkbox1" @change="changeChecked(checked)">
            <el-checkbox v-for="(item,index) in tabledata" :key="index" class="dialogch" :label="item.idStr">{{ item.mallChannelName }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- <el-row>
          <el-col v-for="(item,index) in tabledata" :key="index" :span="4" style="margin-bottom:10px">
            <el-checkbox v-model="checked">{{ item.mallChannelName }}</el-checkbox>
          </el-col>
        </el-row> -->
        <!-- <h4>拼多多</h4>
        <el-row>
          <el-col v-for="o in 20" :key="o" :span="4" style="margin-bottom:10px">
            <el-checkbox v-model="checked">备选项wer</el-checkbox>
          </el-col>
        </el-row> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import switchel from '@/components/switchel'
import { allowsformdata } from '@/utils/formdata'
import { channelJD, thematicOption_detail, thematicUpdate, thematicAdd, getTypeName } from '@/api/specialMg'
export default {
  components: {
    switchel
  },
  filters: {
    selectdata(d) {
      switch (d) {
        case '1':
          return '京东'
        case '2':
          return '淘宝'
        case '3':
          return '拼多多'
        default:
          break
      }
    }
  },
  data() {
    const validUploader = (rule, value, callback) => {
      if (this.ruleForm.model === '1') {
        if (this.ruleForm.uploadFile1 || this.imageUrl) {
          return callback()
        } else {
          return callback(new Error('请上传图片'))
        }
      } else {
        if ((this.ruleForm.uploadFile1 || this.imageUrl) && (this.ruleForm.uploadFile2 || this.imageUrlTwo)) {
          callback()
        } else {
          callback(new Error('请上传图片'))
        }
      }
    }
    const validThematicSpreadCategoryList = (rule, value, callback) => {
      if (this.ruleForm.thematicSpreadCategoryList === null || this.ruleForm.thematicSpreadCategoryList.length === 0) {
        return callback(new Error('请选择分类'))
      } else {
        callback()
      }
    }
    return {
      checked: [],
      dialogVisible: false,
      options: [],
      imageUrl: '',
      imageUrlTwo: '',
      title1: '新增',
      tabledata: [],
      ruleForm: {
        id: '',
        uploadFile1: undefined,
        uploadFile2: undefined,
        thematicTypeId: '',
        thematicName: '',
        remark: '',
        status: '1',
        model: '2',
        sequence: '',
        thematicSpreadCategoryList: []
      },
      rules: {
        thematicTypeId: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        model: [
          { required: true, message: '请选择模式', trigger: 'change' }
        ],
        thematicName: [
          { required: true, message: '请输入专题名称', trigger: 'blur' }
        ],
        uploader: [
          { required: true, validator: validUploader, trigger: 'change' }
        ],
        thematicSpreadCategoryList: [
          { required: true, validator: validThematicSpreadCategoryList, trigger: 'change' }
        ],
        sequence: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    'ruleForm.model'(value) {
      if (value === '1') {
        this.ruleForm.uploadFile2 = undefined
      }
    }
  },
  created() {},
  mounted() {
    this.ruleForm.id = this.$route.query.id
    this.getdata()
    this.getinfo()
  },
  methods: {
    // getThematicTypeName() {
    //   this.$nextTick(res => {
    //      this.$refs.thematicTypeId.selectedLabel
    //   })
    // },
    goback() {
      this.$router.push('specialMg')
    },
    getinfo() {
      if (!this.$route.query.id) return
      thematicOption_detail({ id: this.$route.query.id }).then(res => {
        var { thematicTypeId, imgUrl, model, thematicName, thematicSpreadCategoryList, remark, sequence, status } = res.object
        thematicSpreadCategoryList = thematicSpreadCategoryList.map(item => {
          this.checked.push(item.mallCatgoryId)
          return { mallCatgoryName: item.mallCatgoryName, mallCode: item.mallCode, mallCatgoryId: item.mallCatgoryId }
        })
        this.ruleForm = { thematicTypeId, model, thematicName, thematicSpreadCategoryList, remark, sequence, status, id: this.$route.query.id }
        imgUrl = imgUrl.split(';')
        this.imageUrl = imgUrl[0] || ''
        this.imageUrlTwo = imgUrl[1] || ''
      })
    },
    changeChecked(value) {
      this.ruleForm.thematicSpreadCategoryList = value.map(item => {
        let name = ''
        this.tabledata.forEach(ele => {
          if (ele.idStr === item) name = ele.mallChannelName
        })
        return { mallCode: '1', mallCatgoryId: item, mallCatgoryName: name }
      })
    },
    getdata() {
      channelJD().then(res => {
        this.tabledata = res.object
      })
      getTypeName().then(res => {
        this.options = res.object.map(item => {
          return { value: item.idStr, label: item.name }
        })
      })
    },
    handleAvatarSuccess(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.ruleForm.uploadFile1 = file.raw
    },
    handleAvatarSuccess2(file, fileList) {
      this.imageUrlTwo = URL.createObjectURL(file.raw)
      this.ruleForm.uploadFile2 = file.raw
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    changedata() {
      return allowsformdata(this.ruleForm)
    },
    editer() {
      const formdata = this.changedata()
      thematicUpdate(formdata).then(res => {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.goback()
      })
    },
    addData() {
      delete this.ruleForm.id
      const formdata = this.changedata()
      thematicAdd(formdata).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功'
        })
        this.goback()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$route.query.id ? this.editer() : this.addData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.recommend p{
  margin: 0;
}
.mydialog {
  padding: 0 20px;
}
.dialogch{
  float: left;
  margin: 0 20px 10px 0;
}
.dialogbody h4{
  margin-bottom: 10px;
}
.dialogbody{
  padding: 10px 0 20px 0;
  overflow: hidden;
}
.dialogtitle span{
  padding-left: 20px;
  color: #409eff;
  font-size: 14px;
}
.dialogtitle{
  display: flex;
  align-items: center;
}
.el-form{
  margin-top: 20px;
}
.columnMgadd{
  padding: 20px;
}
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
<style>
.specialMgaddDialog > .el-dialog__body,
.specialMgaddDialog > .el-dialog__header{
  padding: 0 20px;
}
</style>
