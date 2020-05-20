<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="reinvestmentName"
        label="名称"
        align="center"
        width="150"
      />
      <el-table-column
        prop="reinvestmentPearl"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.reinvestmentName==='起源贝壳'">实名认证</span>
          <span v-else>复投{{ scope.row.reinvestmentPearl }}颗珍珠</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="bothHave"
        label="同时拥有（次）"
        align="center"
      />
      <el-table-column
        prop="activityNum"
        label="活跃度"
        align="center"
      >
        <template slot-scope="scope">
          <span>活跃度+{{ scope.row.activityNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="condition"
        label="额外赠送"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.extraPearl }}珍珠</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="condition"
        label="冻结珍珠"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.freezePearl }}珍珠</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="infoshow">
      • 每增加1的活跃度赠送冻结12颗珍珠，30日释放之后活跃度对应的扣取
    </div> -->
    <div class="infoshow">
      • 30天除不尽的情况下，除不尽保留小数点后四位然后乘以30，和原来的总数差额加到最后一天即可（参考花呗分期）
    </div>
    <div class="infoshow">
      • 一次性复投对等数量才可升级成为对应的复投等级
    </div>
    <el-dialog
      :title="dialogtitle"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div>
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item v-if="dialogCode!=='0'" label="复投珍珠数：" prop="reinvestmentPearl">
            <el-input v-model="ruleForm.reinvestmentPearl" type="number">
              <span slot="suffix" class="unit"> 颗 </span>
            </el-input>
          </el-form-item>
          <el-form-item v-if="dialogCode!=='0'" label="同时拥有：" prop="bothHave">
            <el-input v-model="ruleForm.bothHave" type="number">
              <span slot="suffix" class="unit"> 次 </span>
            </el-input>
          </el-form-item>
          <el-form-item label="额外赠送珍珠：" prop="extraPearl">
            <el-input v-model="ruleForm.extraPearl" type="number">
              <span slot="suffix" class="unit"> 颗 </span>
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
import { ComplexRulesList, ComplexRulesUpdate } from '@/api/shellSet'
export default {
  components: {},
  data() {
    return {
      dialogtitle: '南海1号贝壳编辑',
      dialogCode: '',
      ruleForm: {
        reinvestmentPearl: '',
        bothHave: '',
        extraPearl: '',
        id: ''
      }, rules: {
        reinvestmentPearl: [
          { required: true, message: '请输入复投珍珠数', trigger: 'blur' }
        ],
        bothHave: [
          { required: true, message: '请输入同时拥有', trigger: 'blur' }
        ],
        extraPearl: [
          { required: true, message: '请输入额外赠送珍珠：', trigger: 'blur' }
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
    changeData() {
      ComplexRulesUpdate({ ...this.ruleForm }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    getList() {
      ComplexRulesList().then(res => {
        this.tableData = res.object
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.changeData()
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
      const { idStr: id, reinvestmentPearl, bothHave, extraPearl, reinvestmentName, reinvestmentCode } = val
      this.ruleForm = { id, reinvestmentPearl, bothHave, extraPearl }
      this.dialogtitle = reinvestmentName
      this.dialogCode = reinvestmentCode
      this.dialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
@import url('./shellSet.scss');
.unit{
  padding-right: 10px;
  color: #000;
}
</style>
