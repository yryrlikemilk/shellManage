<template>
  <div class="citypartner">
    <TheDivider class="citypartner-title" />
    <p>• 享受城市的订单佣金返佣</p>
    <el-row type="flex" align="center">
      <el-col :span="6">
        <p>• 佣金返佣比例：{{ ruleForm.couponCityCommissionRate * 100 }}%</p>
      </el-col>
      <el-col :span="6">
        <p
          class="citypartner-button"
          @click="changedata(ruleForm.couponCityCommissionRate,'市')"
        >编辑数值</p>
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form
        v-if="dialogVisible"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="couponCityCommissionRate">
          <el-input v-model="form.couponCityCommissionRate" placeholder="请输入">
            <span slot="suffix" class="suffix">%</span>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <TheDivider class="citypartner-title1" title="区县级合伙人" />
    <p>• 享受城市的订单佣金返佣</p>
    <el-row type="flex" align="center">
      <el-col :span="6">
        <p>• 佣金返佣比例：{{ ruleForm.couponCountyCommissionRate * 100 }}%</p>
      </el-col>
      <el-col :span="6">
        <p class="citypartner-button" @click="changedata1">编辑数值</p>
      </el-col>
    </el-row>
    <el-dialog title="区县级合伙人" :visible.sync="dialogVisible1" width="30%">
      <el-form
        v-if="dialogVisible1"
        ref="ruleForm1"
        :model="form1"
        :rules="rules1"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="couponCountyCommissionRate">
          <el-input v-model="form1.couponCountyCommissionRate" placeholder="请输入">
            <span slot="suffix" class="suffix">%</span>
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm1('ruleForm1')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { facade, update } from '@/api/citypartner'
import TheDivider from '@/components/TheDivider'
export default {
  components: {
    TheDivider
  },
  data() {
    return {
      ruleForm: {
        id: '',
        couponCityCommissionRate: 0,
        couponCountyCommissionRate: 0
      },
      rules: {
        couponCityCommissionRate: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      rules1: {
        couponCountyCommissionRate: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      form: {
        id: '',
        couponCityCommissionRate: ''
      },
      form1: {
        couponCountyCommissionRate: ''
      },
      title: '',
      dialogVisible: false,
      dialogVisible1: false
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
        const {
          couponCityCommissionRate,
          couponCountyCommissionRate,
          idStr: id
        } = res.object[0]
        this.ruleForm = {
          couponCityCommissionRate,
          couponCountyCommissionRate,
          id
        }
        this.form.id = id
      })
    },
    changedata(val, val2) {
      this.form.couponCityCommissionRate = val * 100
      this.title = `${val2}级返佣比例`
      this.dialogVisible = true
    },
    changedata1() {
      this.form1.couponCountyCommissionRate = this.ruleForm.couponCountyCommissionRate * 100
      this.dialogVisible1 = true
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updatecou1()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updatecou()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updatecou() {
      this.dialogVisible = false
      this.form.couponCityCommissionRate /= 100
      update({ ...this.form }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })

        this.getdata()
      })
    },
    updatecou1() {
      this.dialogVisible1 = false
      this.form1.couponCountyCommissionRate /= 100
      update({ id: this.ruleForm.id, ...this.form1 }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getdata()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.citypartner {
  &-title {
    margin-top: 20px;
  }
  &-title1 {
    margin-top: 100px;
  }
  p {
    margin-top: 20px;
    font-size: 13px;
  }
  &-button {
    cursor: pointer;
    color: #409eff;
  }
}
.suffix {
  padding-right: 5px;
  line-height: 40px;
}
</style>
