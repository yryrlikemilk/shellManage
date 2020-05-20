<template>
  <div class="version">
    <breadnar title="版本管理" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="安卓" name="first">
        <androidVersion ref="androidVersion" @userinfo="editor" />
      </el-tab-pane>
      <el-tab-pane label="IOS" name="second">
        <iosVersion ref="iosVersion" @userinfo="editor" />
      </el-tab-pane>
    </el-tabs>
    <el-button class="addversion" size="mini" @click="editor()">新增</el-button>
    <el-dialog title="新增版本" :visible.sync="dialogVisible" width="40%">
      <el-form
        v-if="dialogVisible"
        ref="ruleForm"
        :model="form"
        hide-required-asterisk
        :rules="rules"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="版本名称：" prop="type">
          <el-row>
            <el-col :span="14">
              <el-radio v-model="form.type" label="2" border size="medium">安卓</el-radio>
              <el-radio v-model="form.type" label="1" border size="medium">IOS</el-radio>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="版本号：" prop="versionCode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.versionCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="版本描述：" prop="describeInfo">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.describeInfo" type="textarea" :rows="5" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="上传地址：" prop="apk">
          <el-row>
            <el-col :span="16">
              <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload> -->
              <el-input v-model="form.apk" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateVersion, addVersion } from '@/api/versionMg'
import iosVersion from './components/iosVersion'
import androidVersion from './components/androidVersion'
export default {
  components: {
    androidVersion,
    iosVersion
  },
  data() {
    return {
      fileList: [],
      form: {
        id: '',
        versionCode: '',
        apk: '',
        describeInfo: '',
        type: ''

      },
      input: '',
      radio2: '1',
      rules: {
        versionCode: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        apk: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        describeInfo: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        type: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    editor(val = {}) {
      const { idStr: id, versionCode, apk, describeInfo, type } = val
      this.form = { id, versionCode, apk, describeInfo, type }
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changeData() {
      if (this.form.id) {
        this.updateData()
      } else {
        this.addData()
      }
    },
    addData() {
      this.dialogVisible = false
      addVersion({ ...this.form }).then(res => {
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        this.$refs['androidVersion'].getdata()
        this.$refs['iosVersion'].getdata()
      })
    },
    updateData() {
      this.dialogVisible = false
      updateVersion({ ...this.form }).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.$refs['androidVersion'].getdata()
        this.$refs['iosVersion'].getdata()
      })
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    }
  }
}
</script>
<style scoped>
.version {
  padding: 20px 20px 60px 20px;
  position: relative;
}
.addversion {
  position: absolute;
  top: 60px;
  right: 20px;
}
.radio {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
</style>
