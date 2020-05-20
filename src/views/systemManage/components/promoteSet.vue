<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="couponLevelName" label="等级" align="center" width="150" />
      <el-table-column prop="commissionRatio" label="达成条件" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.commissionRatio.注册">注册：{{ scope.row.commissionRatio.注册 }}</p>
          <p v-if="scope.row.commissionRatio.直推有效人数">直推有效人数：{{ scope.row.commissionRatio.直推有效人数 }}人</p>
          <p v-if="scope.row.commissionRatio.间接直推有效人数">间接直推有效人数：{{ scope.row.commissionRatio.间接直推有效人数 }}人</p>
          <p v-if="scope.row.commissionRatio.直推掌柜人数"> 直推掌柜人数：{{ scope.row.commissionRatio.直推掌柜人数 }}人</p>
          <p v-if="scope.row.commissionRatio.下级团队总订单数">下级团队总订单数：{{ scope.row.commissionRatio.下级团队总订单数 }}</p>
          <p v-if="scope.row.commissionRatio.个人累计收益"> 个人累计收益：{{ scope.row.commissionRatio.个人累计收益 }}元</p>
          <p v-if="scope.row.commissionRatio.近30天已完成的订单返利金额"> 近30天已完成的订单返利金额：{{ scope.row.commissionRatio.近30天已完成的订单返利金额 }}元</p>
        </template>
      </el-table-column>
      <el-table-column prop="selfCommissionRatio" label="自购佣金" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.selfCommissionRatio.平台补贴">平台补贴:{{ scope.row.selfCommissionRatio.平台补贴 |changeString }}</p>
          <p v-if="scope.row.selfCommissionRatio.基础佣金">基础佣金:{{ scope.row.selfCommissionRatio.基础佣金 |changeString }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="condition" label="团队佣金" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.teamCommissionRatio['享受一级 用户（VIP） 基础佣金']">享受一级 用户（VIP） 基础佣金：{{ scope.row.teamCommissionRatio['享受一级 用户（VIP） 基础佣金']|changeString }}</p>
          <p v-if="scope.row.teamCommissionRatio['享受二级 用户（VIP） 基础佣金']">享受二级 用户（VIP） 基础佣金：{{ scope.row.teamCommissionRatio['享受二级 用户（VIP） 基础佣金']|changeString }}</p>
          <p v-if="scope.row.teamCommissionRatio['享受二级外 用户（VIP） 基础佣金']">享受二级外 用户（VIP） 基础佣金：{{ scope.row.teamCommissionRatio['享受二级外 用户（VIP） 基础佣金']|changeString }}</p>
          <p v-if="scope.row.teamCommissionRatio['享受一级掌柜无限级团队']">享受一级掌柜无限级团队：{{ scope.row.teamCommissionRatio['享受一级掌柜无限级团队']|changeString }}</p>
          <p v-if="scope.row.teamCommissionRatio['培养下级高级掌柜享受其团队奖励权重']">培养下级高级掌柜享受其团队奖励权重：{{ scope.row.teamCommissionRatio['培养下级高级掌柜享受其团队奖励权重']|changeString }}</p>
          <p v-if="scope.row.teamCommissionRatio['培养二级掌柜享受其团队奖励权重']">培养二级掌柜享受其团队奖励权重：{{ scope.row.teamCommissionRatio['培养二级掌柜享受其团队奖励权重']|changeString }}</p>
          <p v-if="scope.row.teamCommissionRatio['培养一级掌柜享受其团队奖励权重']">培养一级掌柜享受其团队奖励权重：{{ scope.row.teamCommissionRatio['培养一级掌柜享受其团队奖励权重']|changeString }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" :width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="`${title}用户佣金设置`" :visible.sync="dialogVisible" width="800px" destroy-on-close>
      <el-form ref="ruleForm" hide-required-asterisk :model="ruleForm" :rules="rules" label-width="130px" label-position="top">
        <h4>达成条件</h4>
        <el-row :gutter="20">
          <el-col v-if="flag==='1'" :span="3">
            <el-form-item label="注册" label-width="105px" />
          </el-col>
          <el-col v-if="flag==='2'" :span="8">
            <el-form-item label="直推有效人数：" label-width="105px" prop="directNum">
              <el-input
                v-model="ruleForm.directNum"
                placeholder="请输入"
                type="number"
              >
                <span slot="suffix" class="suffix">人</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='2'" :span="8">
            <el-form-item label="间接直推有效人数：" prop="indirectNum">
              <el-input
                v-model="ruleForm.indirectNum"
                placeholder="请输入"
                type="number"
              >
                <span slot="suffix" class="suffix">人</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='2'" :span="8">
            <el-form-item label="近30日完成订单佣金：" label-width="145px" prop="reachIncomeAmountAMonth">
              <el-input
                v-model="ruleForm.reachIncomeAmountAMonth"
                placeholder="请输入"
                type="number"
              >
                <span slot="suffix" class="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='3'" :span="8">
            <el-form-item label="直推有效掌柜：" label-width="145px" prop="reachFirstLevelEffectiveNum">
              <el-input
                v-model="ruleForm.reachFirstLevelEffectiveNum"
                placeholder="请输入"
                type="number"
              >
                <span slot="suffix" class="suffix">人</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='3'" :span="8">
            <el-form-item label="团队总订单：" label-width="145px" prop="reachTotalOrderNum">
              <el-input
                v-model="ruleForm.reachTotalOrderNum"
                placeholder="请输入"
                type="number"
              >
                <span slot="suffix" class="suffix">单</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='3'" :span="8">
            <el-form-item label="个人累计收益：" label-width="145px" prop="reachCumulativeIncome">
              <el-input
                v-model="ruleForm.reachCumulativeIncome"
                placeholder="请输入"
                type="number"
              >
                <span slot="suffix" class="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='3'" :span="8">
            <el-form-item label="近三月中的任意一月月收入：" label-width="195px" prop="reachOneMonthIncome">
              <el-input
                v-model="ruleForm.reachOneMonthIncome"
                placeholder="请输入"
                type="number"
              >
                <span slot="suffix" class="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>自购佣金</h4>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="commissionRatio1" label="基础佣金比例：">
              <el-input v-model="ruleForm.commissionRatio1" type="number" class="input" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="commissionRatio2" label="平台补贴比例：">
              <el-input v-model="ruleForm.commissionRatio2" type="number" class="input" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>团队佣金</h4>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="commissionRatio3" label="享受一级VIP佣金：">
              <el-input v-model="ruleForm.commissionRatio3" type="number" class="input" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="commissionRatio4" label="享受二级VIP佣金：">
              <el-input v-model="ruleForm.commissionRatio4" class="input" type="number" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='2'||flag==='3'" :span="8">
            <el-form-item prop="commissionRatio5" label="享受二级外VIP佣金：" label-width="145px">
              <el-input v-model="ruleForm.commissionRatio5" class="input" type="number" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='2'" :span="8">
            <el-form-item prop="commissionRatio6" label="培养一级掌柜享受其团队奖励：" label-width="200px">
              <el-input v-model="ruleForm.commissionRatio6" class="input" type="number" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='2'" :span="8">
            <el-form-item prop="commissionRatio7" label="培养二级掌柜享受其团队奖励：" label-width="200px">
              <el-input v-model="ruleForm.commissionRatio7" class="input" type="number" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='3'" :span="8">
            <el-form-item prop="commissionRatio8" label="享受无限级掌柜团队奖励：" label-width="200px">
              <el-input v-model="ruleForm.commissionRatio8" class="input" type="number" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flag==='3'" :span="8">
            <el-form-item prop="commissionRatio9" label="培养下级高级掌柜享受其团队奖励：" label-width="230px">
              <el-input v-model="ruleForm.commissionRatio9" class="input" type="number" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <p class="infoshow">• 自购佣金=基础佣金×（基础佣金比例+平台补贴）</p>
      <p class="infoshow">• 团队奖励具体佣金数＝团队奖励基数×团队奖励权重</p>
      <p class="infoshow">• 团队奖励基数＝100%基础佣金×10%</p>
      <p class="infoshow">• 直推有效：是指邀请注册的下一级用户，并且有完成过订单的用户</p>
      <p class="infoshow">• 简介有效：除一级外的有效用户</p>
      <p class="infoshow">• 近30天已完成订单返利金额：是指在近30天个人自购订单，并且状态已完成所得到的的佣金</p>
      <p class="infoshow">• 近三月中的一个月的月收益：查看近三个月每个月结算金额，只要其中一个月达标即可</p>
      <p class="infoshow">• 有效会员才能获得下级佣金</p>
    </div>
  </div>
</template>

<script>
import { facade, option_detail, update } from '@/api/promoteSet'
import { changeNumber } from '@/utils/changFloat'
export default {
  components: {},
  filters: {
    changeString(d) {
      const str = d.split('-').map(item => {
        return item.slice(0, -1) * 1 + '%'
      })
      return str.join('-')
    }
  },
  data() {
    return {
      title: '',
      dialogVisible: false,
      tableData: [],
      input3: '',
      ruleForm: {
      },
      flag: '',
      rules: {
        directNum: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        indirectNum: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        reachIncomeAmountAMonth: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        reachFirstLevelEffectiveNum: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        reachTotalOrderNum: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        reachCumulativeIncome: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        reachOneMonthIncome: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio1: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio2: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio3: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio4: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio5: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio6: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio7: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio8: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        commissionRatio9: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      facade().then(res => {
        const { midMap, vipMap, highMap } = res.object
        this.tableData = []
        this.tableData.unshift(vipMap, midMap, highMap)
      })
    },
    changeNum(value) {
      for (const key in this.ruleForm) {
        if (key !== 'reachRegist' && key !== 'directNum' && key !== 'indirectNum' && key !== 'reachIncomeAmountAMonth' && key !== 'reachRegistName' && key !== 'reachTotalOrderNum' && key !== 'reachCumulativeIncome' && key !== 'reachOneMonthIncome' && key !== 'id') {
          this.ruleForm[key] = changeNumber(this.ruleForm[key], value)
        }
      }
    },
    handleClick(value) {
      const {
        couponLevel,
        couponLevelName
      } = value
      option_detail({ idStr: value.idStr }).then(res => {
        this.ruleForm = res.object
        delete this.ruleForm.idStr
        delete this.ruleForm.deleted
        delete this.ruleForm.rawAddTime
        delete this.ruleForm.id
        delete this.ruleForm.couponLevelName
        delete this.ruleForm.couponLevelName
        delete this.ruleForm.rawAddTimeStr
        delete this.ruleForm.rawUpdateTime
        delete this.ruleForm.rawUpdateTimeStr
        this.changeNum(true)
        this.ruleForm.id = value.idStr
      })
      this.flag = couponLevel
      this.title = couponLevelName
      this.dialogVisible = true
    },
    changedata() {
      this.dialogVisible = false
      this.changeNum(false)
      update({ ...this.ruleForm }).then(res => {
        this.$message.success('编辑成功')
        this.getdata()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changedata()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import url('./shellSet.scss');
.el-col{
  // text-align: right;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  padding: 0;
}
.el-dialog {
  /deep/ &__body {
    padding: 10px 20px;
  }
}
.suffix {
  padding-right: 5px;
  line-height: 40px;
}
.input{
  max-width: 180px;
}
</style>
