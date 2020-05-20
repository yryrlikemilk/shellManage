<template>
  <div>
    <div class="box">
      <thedivider title="基础拥佣金系数" icon="question" />
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p>• 基础佣金=返利佣金比例 / 基础佣金系数</p>
        </el-col>
      </el-row>
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p class="changefont">• 基础佣金系数：{{ form.baseCommissionCoefficient }}</p>
        </el-col>
        <el-col :span="6">
          <p class="showbutton" @click="getinfo(form.idStr);dialogVisible = true">编辑数值</p>
        </el-col>
      </el-row>
      <el-dialog
        title="基础佣金系数"
        :visible.sync="dialogVisible"
        width="30%"
        destroy-on-close
      >
        <el-form ref="ruleForm" hide-required-asterisk :model="ruleForm" :rules="rules" label-width="0px">
          <el-form-item prop="baseCommissionCoefficient" label="">
            <el-input v-model="ruleForm.baseCommissionCoefficient" type="number" class="input" placeholder="请输入" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="box">
      <thedivider title="团队奖励基数设置" />
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p>• 团队奖励=团队奖励基数 * 团队奖励比例</p>
        </el-col>
      </el-row>
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p class="changefont">• 团队奖励基数=100%基础佣金*{{ form.groupRewardProportion*100 }}%</p>
        </el-col>
        <el-col :span="6">
          <p class="showbutton" @click="getinfo(form.idStr);dialogVisible1 = true">编辑数值</p>
        </el-col>
      </el-row>
      <el-dialog
        title="团队奖励基数比例设置"
        :visible.sync="dialogVisible1"
        width="30%"
        destroy-on-close
      >
        <el-form ref="ruleForm" hide-required-asterisk :model="ruleForm" :rules="rules" label-width="0">
          <el-form-item prop="groupRewardProportion" label="">
            <el-input v-model="ruleForm.groupRewardProportion" type="number" class="input" placeholder="请输入">
              <span slot="suffix" class="suffix">%</span>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="box">
      <thedivider title="高级展柜成长基数" />
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p>培养一名掌柜可享受：</p>
        </el-col>
        <el-col :span="6">
          <p class="showbutton" @click="getinfo(form.idStr);dialogVisible2 = true">编辑数值</p>
        </el-col>
      </el-row>
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p class="changefont">• 佣金增长：{{ form.commissionImproveProportion*100 }}%&#12288;&#12288;最高增长：{{ form.commissionImproveProportionMax*100 }}%</p>
        </el-col>
      </el-row>
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p class="changefont">• 团队奖励：{{ form.teamImproveProportion*100 }}%&#12288;&#12288;最高增长：{{ form.teamImproveProportionMax*100 }}%</p>
        </el-col>
      </el-row>
      <el-dialog
        title="高级展柜成长基数"
        :visible.sync="dialogVisible2"
        width="30%"
        destroy-on-close
      >
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" hide-required-asterisk>
          <p style="margin-bottom:20px">培养一名总管可享受：</p>
          <el-form-item prop="commissionImproveProportion" label="佣金增长：" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.commissionImproveProportion" type="number">
              <span slot="suffix" class="suffix"> % </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="teamImproveProportion" label="团队奖励：" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.teamImproveProportion" type="number">
              <span slot="suffix" class="suffix"> % </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="improveProportionMax" label="增长峰值数：" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.improveProportionMax" type="number">
              <span slot="suffix" class="suffix"> 个 </span>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="box">
      <thedivider title="高级掌柜交易分红" icon="question" content="是指商城返利佣金的百分比" />
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p>交易分红=（平台佣金*分红比例）/ 高级掌柜比例</p>
        </el-col>
      </el-row>
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p class="changefont">• 全分红比例：{{ form.fullDividendProportion*100 }}%</p>
        </el-col>
        <el-col :span="6">
          <p class="showbutton" @click="getinfo(form.idStr);dialogVisible3 = true">编辑数值</p>
        </el-col>
      </el-row>
      <el-dialog
        title="高级展柜成长基数"
        :visible.sync="dialogVisible3"
        width="30%"
        destroy-on-close
      >
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" hide-required-asterisk>
          <p style="margin-bottom:20px">所有掌柜平分订单佣金比例</p>
          <el-form-item label="" prop="fullDividendProportion">
            <el-input v-model="ruleForm.fullDividendProportion" class="input" type="number">
              <span slot="suffix" class="suffix"> % </span>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="infoshow">• 自购佣金=基础佣金×（基础佣金比例+平台补贴）</div>
    <div class="infoshow">• 团队奖励具体佣金数＝团队奖励基数×团队奖励权重</div>
    <div class="infoshow">• 团队奖励基数＝100%基础佣金×10%</div>
    <div class="infoshow">• 直推有效：是指邀请注册的下一级用户，并且有完成过订单的用户</div>
    <div class="infoshow">• 简介有效：除一级外的有效用户</div>
    <div class="infoshow">• 近30天已完成订单返利金额：是指在近30天个人自购订单，并且状态已完成所得到的的佣金</div>
    <div class="infoshow">• 近三月中的一个月的月收益：查看近三个月每个月结算金额，只要其中一个月达标即可</div>
  </div>
</template>

<script>
import { option_detail, facade, update } from '@/api/couponMoreSet'
import thedivider from '@/components/TheDivider'
import { changeNumber } from '@/utils/changFloat'
export default {
  components: {
    thedivider
  },
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        baseCommissionCoefficient: [
          { required: true, message: '请输入基础佣金系数', trigger: 'blur' }
        ],
        groupRewardProportion: [
          { required: true, message: '请输入团队奖励基数比例', trigger: 'blur' }
        ],
        commissionImproveProportion: [
          { required: true, message: '请输入佣金增长', trigger: 'blur' }
        ],
        teamImproveProportion: [
          { required: true, message: '请输入团队奖励', trigger: 'blur' }
        ],
        improveProportionMax: [
          { required: true, message: '请输入增长峰值数', trigger: 'blur' }
        ],
        fullDividendProportion: [
          { required: true, message: '请输入所有掌柜平分订单佣金比例', trigger: 'blur' }
        ]
      },
      input3: '',
      formLabelWidth: '100px',
      form: {},
      input: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.dialogVisible1 = false
          this.dialogVisible2 = false
          this.dialogVisible3 = false
          this.changenum(false)
          this.changedata()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changenum(value) {
      for (const key in this.ruleForm) {
        if (key !== 'id' && key !== 'improveProportionMax' && key !== 'baseCommissionCoefficient') {
          this.ruleForm[key] = changeNumber(this.ruleForm[key], value)
        }
      }
    },
    changedata() {
      update({ ...this.ruleForm }).then(res => {
        this.$message.success('修改成功')
        this.getdata()
      })
    },
    getinfo(value) {
      option_detail({ idStr: value }).then(res => {
        this.ruleForm = res.object
        delete this.ruleForm.idStr
        delete this.ruleForm.rawUpdateTimeStr
        delete this.ruleForm.deleted
        delete this.ruleForm.rawUpdateTime
        delete this.ruleForm.rawAddTimeStr
        delete this.ruleForm.rawAddTime
        delete this.ruleForm.teamImproveProportionMax
        delete this.ruleForm.commissionImproveProportionMax
        this.ruleForm.id = value
        this.changenum()
      })
    },
    getdata() {
      facade().then(res => {
        this.form = res.object
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import url('./couponset.scss');
@import url('./shellSet.scss');
.el-col{
  padding: 20px 0 0 0;
}
.box{
  margin-top: 20px;
  margin-bottom: 100px;
}
.changefont{
  font-weight: bold;
}
.input{
  max-width: 300px;
}
</style>
