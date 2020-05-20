<template>
  <div class="columnMgadd">
    <breadnar title="专栏管理" :title1="title1" />
    <el-form ref="ruleForm" :model="ruleForm" hide-required-asterisk :rules="rules" label-width="130px" class="demo-ruleForm">
      <el-form-item label="专栏名称：" prop="name">
        <el-input
          v-model="ruleForm.name"
          maxlength="6"
          show-word-limit
          style="width:300px"
        />
      </el-form-item>
      <el-form-item ref="imageUrl" label="图标：" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-radio-group v-model="ruleForm.type" size="small">
          <el-radio label="1" border>商城专区</el-radio>
          <el-radio label="2" border>推广专题</el-radio>
          <el-radio label="3" border>外链</el-radio>
          <el-radio label="4" border>待开发</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.type==='2'" ref="ZoneSpreadCategorylist" label="推广频道：" class="ZoneSpreadCategorylist" prop="ZoneSpreadCategorylist">
        <p v-for="(item,index) in ruleForm.ZoneSpreadCategorylist" :key="index">{{ item.mallCode|selectdata }} ： {{ item.mallCatgoryName }}</p>
        <!-- <el-input
          v-model="ruleForm.sequence"
          style="width:300px"
          placeholder="请输入内容"
        /> -->
        <el-button type="text" @click="dialogVisible = true">请选择推广类目</el-button>
      </el-form-item>
      <el-form-item v-if="ruleForm.type==='3'" label="外链地址：" prop="externalUrl">
        <el-input
          v-model="ruleForm.externalUrl"
          style="width:300px"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item v-if="ruleForm.type==='1'" label="内部跳转地址：" prop="mallCode">
        <el-select v-model="ruleForm.mallCode" placeholder="请选择" style="width:300px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注（选填）：">
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
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="状态：">
        <switchel v-model="ruleForm.status" />
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>

    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div slot="title" class="dialogtitle">
        <h4> 推荐频道</h4> <span>勾选为显示</span>
      </div>
      <div class="dialogbody">
        <el-checkbox-group v-model="checkbox" name="checkbox1" @change="ZoneSpreadCategorylist(checkbox)">
          <el-checkbox v-for="(item,index) in tabledata" :key="index" class="dialogch" :label="item.idStr">{{ item.mallChannelName }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { channelJD } from '@/api/specialMg'
import { allowsformdata } from '@/utils/formdata'
import { option_detail, addOrUpdate } from '@/api/columnMg'
// import { facade } from '@/api/InsideMg'
import switchel from '@/components/switchel/index'
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
    const ZoneSpreadCategorylistValid = (rule, value, callback) => {
      if (value.length >= 1) {
        callback()
      } else {
        callback(new Error('请至少选择一个推广频道'))
      }
    }
    return {
      options: [
        { label: '京东', value: '1' },
        { label: '淘宝', value: '2' },
        { label: '拼多多', value: '3' }
      ],
      dialogVisible: false,
      tabledata: [],
      textarea: '',
      radio3: '1',
      imageUrl: '',
      title1: '新增',
      ruleForm: {
        name: '',
        type: '1',
        status: '1',
        externalUrl: '',
        ZoneSpreadCategorylist: []
      },
      checkbox: [],
      rules: {
        ZoneSpreadCategorylist: [
          { validator: ZoneSpreadCategorylistValid, trigger: ['change', 'blur'] }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请上传图标', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        mallCode: [
          { required: true, message: '请输入内部跳转地址', trigger: 'change' }
        ],
        sequence: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    'ruleForm.type': {
      handler(value) {
        switch (value) {
          case '1':
            this.ruleForm.externalUrl = ''
            this.ruleForm.ZoneSpreadCategorylist = []
            break
          case '2':
            this.ruleForm.externalUrl = ''
            this.ruleForm.mallCode = ''
            break
          case '3':
            this.ruleForm.mallCode = ''
            this.ruleForm.ZoneSpreadCategorylist = []
            break
          default:
            break
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.ruleForm.id = this.$route.query.id
    this.$route.query.id ? this.title1 = '编辑' : this.title1 = '新增'
    this.getdata()
    this.dialogdata()
  },
  methods: {
    ZoneSpreadCategorylist(value) {
      this.ruleForm.ZoneSpreadCategorylist = value.map(element => {
        var mallCatgoryName = ''
        this.tabledata.map(elem => {
          if (elem.idStr === element) {
            mallCatgoryName = elem.mallChannelName
          }
        })
        return { mallCode: '1', mallCatgoryId: element, mallCatgoryName: mallCatgoryName }
      })
    },
    dialogdata() {
      channelJD().then(res => {
        this.tabledata = res.object
      })
    },
    checkboxdata(value) {
      value.forEach(element => {
        this.checkbox.push(element.mallCatgoryId.toString())
      })
    },
    getdata() {
      if (this.$route.query.id) {
        option_detail({ id: this.$route.query.id }).then(res => {
          this.$nextTick(() => {
            this.imageUrl = res.object.imgUrl
            var { zoneSpreadCategorylist: ZoneSpreadCategorylist, externalUrl, mallCode, name, type, status = '1', sequence, remark } = res.object
            ZoneSpreadCategorylist = ZoneSpreadCategorylist.map(element => {
              return { mallCode: element.mallCode, mallCatgoryName: element.mallCatgoryName, mallCatgoryId: element.mallCatgoryId }
            })
            this.ruleForm = { ZoneSpreadCategorylist, id: this.$route.query.id, externalUrl, mallCode, name, type, status, sequence, remark }
            this.checkboxdata(res.object.zoneSpreadCategorylist)
          })
        })
      }
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.uploadFile = res.raw
      this.imageUrl = URL.createObjectURL(res.raw)
    },
    changedata() {
      var uploaddata = allowsformdata(this.ruleForm)
      addOrUpdate(uploaddata).then(res => {
        this.$router.go(-1)
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, object) => {
        if (this.imageUrl) {
          this.$refs['imageUrl'].clearValidate()
        }
        if (this.ruleForm.type === '2' && this.ruleForm.ZoneSpreadCategorylist.length >= 1) {
          this.$refs['ZoneSpreadCategorylist'].clearValidate()
        }
        if (Object.keys(object).length <= 1 && this.imageUrl) {
          this.changedata()
        }
      })
    }
  }
}
</script>
<style scoped>
.ZoneSpreadCategorylist p{
  margin: 0;
}
.dialogch{
  float: left;
  margin: 0 20px 10px 0;
}
.dialogbody{
  /* text-align: center; */
  overflow: hidden;
}
.dialogtitle span{
  padding-left: 20px;
  color: #409eff;
  font-size: 14px;
}
.dialogtitle h4{
 margin: 5px 0;
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
