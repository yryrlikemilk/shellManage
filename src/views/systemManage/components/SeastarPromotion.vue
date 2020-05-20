<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="talentCodeName" label="等级" align="center" width="150" />
      <el-table-column prop="condition" label="达成条件" align="center">
        <template slot-scope="scope">
          <div style="text-align: left;padding-left:30px">
            <p v-if="scope.row.userPearlNum">• 个人持有珍珠数：{{ scope.row.userPearlNum }}个</p>
            <p v-if="scope.row.userShellGradeName">• 等贝壳等级：{{ scope.row.userShellGradeName }}</p>
            <p v-if="scope.row.firstLevelRealnameNum">• 直推实名且个人活跃度大于1人数：{{ scope.row.firstLevelRealnameNum }}人</p>
            <p v-if="scope.row.firstLevelTalentNum">• 直推达人数：{{ scope.row.firstLevelTalentNum }}</p>
            <p v-if="scope.row.teamAllActivity">• 团队活跃度：{{ scope.row.teamAllActivity }}</p>
            <p v-if="scope.row.bigAreaAllActivity">• 大区活跃度：{{ scope.row.bigAreaAllActivity }}</p>
            <p v-if="scope.row.smallAreaAllActivity">• 小区活跃度：{{ scope.row.smallAreaAllActivity }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="transactionRate" label="全球分红" align="center">
        <template slot-scope="scope">
          <p>• 每日全球交易手续费·分红：{{ scope.row.transactionRate *100 }}%</p>
        </template>
      </el-table-column>
      <el-table-column prop="condition" label="赠送" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.reinvestmentCodeName }}*{{ scope.row.giveAwayTimes }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="ruleForm.talentCodeName" :visible.sync="dialogVisible" width="60%">
      <div v-if="dialogVisible">
        <el-form ref="ruleForm" :model="ruleForm" :hide-required-asterisk="true" :rules="rules" class="demo-ruleForm">
          <h3>达成条件</h3>
          <el-row type="flex" align="center" :gutter="20">
            <el-col :span="8">
              <el-form-item label="个人持有珍珠数：" prop="userPearlNum">
                <el-input v-model="ruleForm.userPearlNum">
                  <span slot="suffix" class="unit"> 颗 </span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="等贝壳等级：" prop="userShellGrade">
                <el-input v-model="ruleForm.userShellGrade" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直推实名且个人活跃度大于1人数：" prop="firstLevelRealnameNum">
                <el-input v-model="ruleForm.firstLevelRealnameNum">
                  <span slot="suffix" class="unit"> 人 </span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" align="center" :gutter="20">
            <el-col :span="8">
              <el-form-item label="团队活跃度：" prop="teamAllActivity">
                <el-input v-model="ruleForm.teamAllActivity" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="大区活跃度：" prop="bigAreaAllActivity">
                <el-input v-model="ruleForm.bigAreaAllActivity" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小区活跃度：" prop="smallAreaAllActivity">
                <el-input v-model="ruleForm.smallAreaAllActivity" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" align="center" :gutter="20">
            <el-col :span="16" class="Directdrive">
              <el-form-item label="直推人达到条件：" prop="firstLevelTalentCode">
                <div class="Directdrive">
                  <el-select v-model="ruleForm.firstLevelTalentCode" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in seastar"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="firstLevelTalentNum">
                <el-input v-model="ruleForm.firstLevelTalentNum" class="Directdriveperson">
                  <span slot="suffix" class="unit"> 名 </span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h3 class="ruleFormtitle">交易分红</h3>
          <el-row type="flex" align="center" :gutter="20">
            <el-col :span="8">
              <el-form-item label="交易分红：" prop="transactionRate">
                <el-input v-model="ruleForm.transactionRate">
                  <span slot="suffix" class="unit"> % </span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h3 class="ruleFormtitle">平台赠送</h3>
          <el-row type="flex" align="center" :gutter="20">
            <el-col :span="16" class="Directdrive">
              <el-form-item label="南海星：" prop="reinvestmentCode">
                <div class="Directdrive">
                  <el-select v-model="ruleForm.reinvestmentCode" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in Nanhaitar"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="giveAwayTimes">
                <el-input v-model="ruleForm.giveAwayTimes" class="Directdriveperson">
                  <span slot="suffix" class="unit"> 个 </span>
                </el-input>
              </el-form-item>
            </el-col>

          </el-row>
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
import { seastar, Nanhaitar } from '@/utils/selectdata'
import { facade, update } from '@/api/SeastarPromotion'
export default {
  components: {},
  data() {
    return {
      ruleForm: {
      },
      rules: {
        userPearlNum: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        userShellGrade: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        firstLevelRealnameNum: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        teamAllActivity: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        bigAreaAllActivity: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        smallAreaAllActivity: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        firstLevelTalentCode: [
          { required: true, message: '请选择内容', trigger: 'change' }
        ],
        firstLevelTalentNum: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        transactionRate: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        reinvestmentCode: [
          { required: true, message: '请选择内容', trigger: 'change' }
        ],
        giveAwayTimes: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]

      },
      input: '',
      seastar,
      Nanhaitar,
      dialogVisible: false,
      tableData: [{}]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    changeData() {
      this.dialogVisible = false
      this.ruleForm.transactionRate /= 100
      update({ ...this.ruleForm }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getdata()
      })
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
    getdata() {
      facade().then(res => {
        this.tableData = res.object
      })
    },
    handleClick(value) {
      const { idStr: id, userPearlNum, userShellGrade, firstLevelRealnameNum, teamAllActivity,
        bigAreaAllActivity,
        smallAreaAllActivity,
        firstLevelTalentCode,
        firstLevelTalentNum,
        transactionRate,
        reinvestmentCode,
        giveAwayTimes
      } = value
      this.ruleForm = { id, userPearlNum, userShellGrade, firstLevelRealnameNum, teamAllActivity,
        bigAreaAllActivity,
        smallAreaAllActivity,
        firstLevelTalentCode,
        firstLevelTalentNum,
        transactionRate,
        reinvestmentCode,
        giveAwayTimes
      }
      this.ruleForm.transactionRate *= 100
      this.dialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
@import './shellSet.scss';
.dialogtitle{
  position: relative;
  &-info{
    width: 100%;
    padding: 10px 0;
    // position:absolute;
    // top: 50%;
    // right: 30%;
    // transform: translate(50%,-50%);
  }
}
.el-row{
  margin-bottom: 10px;
.suffix{
    padding: 10px 5px;
    color: #000;
  }
}
.el-form-item{
  margin-bottom: 0;
}
.Directdrive{
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: flex-end;
  .el-form-item{
    margin-right: 20px;
  }
}
.Directdriveperson{
  max-width:200px ;
}
.ruleFormtitle{
  margin-top: 20px;
}
</style>
