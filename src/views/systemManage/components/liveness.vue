<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="activityName" label="活跃度类型" align="center" width="150" />
      <el-table-column prop="actionCodeName" label="动作" align="center" />
      <el-table-column prop="activity" label="活跃度" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.actionCode==='1'||scope.row.actionCode==='3'||scope.row.actionCode==='5'">{{ scope.row.activity }}</span>
          <span v-else>复投数*{{ scope.row.activity }}*100%</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="infoshow">• 所有活跃增加都是要在实名认证的情况加增加</div>
    <el-dialog title="活跃度编辑" :visible.sync="dialogVisible" width="40%">
      <div v-if="dialogVisible">
        <el-form
          ref="ruleForm"
          hide-required-asterisk
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item>
            <breadnar :title="title1" title1 :title2="title2" :leftline="false" />
          </el-form-item>
          <el-form-item v-if="actionCode==='1'||actionCode==='3'||actionCode==='5'" prop="activity">
            <el-input v-model="ruleForm.activity" type="text" placeholder="请输入" />
          </el-form-item>
          <el-form-item v-else prop="activity" label="复投数乘以" label-width="100px">
            <el-input v-model="ruleForm.activity" type="text" placeholder="请输入">
              <span slot="suffix">乘以100%</span>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { livenessList, livenessUpdate } from '@/api/shellSet'
export default {
  components: {},
  data() {
    return {
      actionCode: '',
      title1: '',
      title2: '',
      ruleForm: {
        activity: '',
        id: ''
      },
      rules: {
        activity: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ] },
      tableData: [],
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      livenessList().then(res => {
        this.tableData = res.object
      })
    },
    changedata() {
      livenessUpdate({ ...this.ruleForm }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          this.changedata()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClick(val) {
      const {
        idStr: id,
        activityName,
        actionCode,
        actionCodeName,
        activity
      } = val
      this.ruleForm = { id, activity }
      this.title1 = activityName
      this.title2 = actionCodeName
      this.actionCode = actionCode
      this.dialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./shellSet.scss";
.unit {
  padding-right: 10px;
  color: #000;
}
.labeltitle {
  text-align: right;
}
</style>
