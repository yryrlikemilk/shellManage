<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="level" label="会员等级" align="center" width="150">
        <template slot-scope="scope">
          <span>LV{{ scope.row.seq }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="needShellGradeName" label="等贝壳登记" align="center" />
      <el-table-column prop="transactionRate" label="交易手续费" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.transactionRate }}%</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="infoshow">• 每直推且实名认证1人 增加经验值+50</div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
      <div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          hide-required-asterisk
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="会员等级：">
            <div class="trans-content">
              <el-input v-model="dialoginput1" placeholder="请输入内容" :disabled="true" />
            </div>
          </el-form-item>
          <el-form-item label="等贝壳：">
            <div class="trans-content">
              <el-input v-model="dialoginput2" placeholder="请输入内容" :disabled="true" />
            </div>
          </el-form-item>
          <el-form-item label="交易手续费：" prop="transactionRate">
            <div class="trans-content">
              <el-input v-model="ruleForm.transactionRate" type="number" placeholder="请输入内容">
                <span slot="suffix"> % </span>
              </el-input>
            </div>
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
import { transactionRulesList, transactionRulesUpdate } from '@/api/shellSet'
export default {
  components: {},
  data() {
    return {
      input: '',
      dialoginput1: '',
      dialoginput2: '',
      ruleForm: {
        transactionRate: '',
        id: ''
      },
      rules: {
        transactionRate: [
          { required: true, message: '请输入交易手续费', trigger: 'blur' }
        ]
      },
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
      transactionRulesList().then(res => {
        this.tableData = res.object
      })
    },
    changedata() {
      transactionRulesUpdate({ ...this.ruleForm }).then(res => {
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
      const { idStr: id, seq, needShellGradeName, transactionRate } = val
      this.ruleForm = { id, transactionRate }
      this.dialoginput1 = 'LV' + seq
      this.dialoginput2 = needShellGradeName
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
