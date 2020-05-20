<template>
  <div class="shellPartner">
    <TheDivider class="shellPartner-title" />
    <div class="shellPartner-city">
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p>合伙人权益设置</p>
        </el-col>
        <el-col :span="6">
          <p class="shellPartner-button" @click="showdata">编辑数值</p>
        </el-col>
      </el-row>
      <div class="shellPartner-city-info">
        <p>• 享受全球交易手续费分红：{{ form.shellCityTransactionRate *100 }}%</p>
        <p>• 赠送复投等级：{{ form.shellCityReinvestmentCodeName }}</p>
      </div>
      <el-dialog title="市级返佣比例" :visible.sync="dialogVisible" width="30%">
        <el-form
          v-if="dialogVisible"
          ref="dynamicValidateForm"
          :model="dynamicValidateForm"
          label-width="150px"
          class="demo-dynamic"
        >
          <el-form-item
            prop="shellCityTransactionRate"
            label="交易手续费分红："
            :rules="[
              { required: true, message: '请输入内容', trigger: 'blur' }
            ]"
          >
            <div class="dialoginput">
              <el-input v-model="dynamicValidateForm.shellCityTransactionRate" type="number" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item
            prop="shellCityReinvestmentCode"
            label="赠送复投贝壳："
            :rules="[
              { required:true, message: '请选择', trigger: 'change' }
            ]"
          >
            <div class="dialoginput">
              <el-select v-model="dynamicValidateForm.shellCityReinvestmentCode" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <p>赠送对应的复投等级的活跃度和珍珠</p>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <TheDivider class="shellPartner-title1" title="区县级合伙人" />
    <div class="shellPartner-city">
      <el-row type="flex" align="center">
        <el-col :span="6">
          <p>合伙人权益设置</p>
        </el-col>
        <el-col :span="6">
          <p class="shellPartner-button" @click="showdata1">编辑数值</p>
        </el-col>
      </el-row>
      <div class="shellPartner-city-info">
        <p>• 享受全球交易手续费分红：{{ form.shellCountyTransactionRate *100 }}%</p>
        <p>• 赠送复投等级：{{ form.shellCountyReinvestmentCodeName }}</p>
      </div>
      <el-dialog title="贝壳-区县级合伙人" :visible.sync="dialogVisible1" width="30%">
        <el-form
          v-if="dialogVisible1"
          ref="dynamicValidateForm1"
          :model="dynamicValidateForm1"
          label-width="150px"
          class="demo-dynamic"
        >
          <el-form-item
            prop="shellCountyTransactionRate"
            label="交易手续费分红："
            :rules="[
              { required: true, message: '请输入内容', trigger: 'blur' }
            ]"
          >
            <div class="dialoginput">
              <el-input v-model="dynamicValidateForm1.shellCountyTransactionRate" type="number" placeholder="请输入">
                <span slot="suffix" class="suffix">%</span>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item
            prop="shellCountyReinvestmentCode"
            label="赠送复投贝壳："
            :rules="[
              { required:true, message: '请选择', trigger: 'change' }
            ]"
          >
            <div class="dialoginput">
              <el-select v-model="dynamicValidateForm1.shellCountyReinvestmentCode" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <p>赠送对应的复投等级的活跃度和珍珠</p>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm1('dynamicValidateForm1')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
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
      form: {
        id: '',
        shellCountyTransactionRate: '',
        shellCountyReinvestmentCodeName: '',
        shellCountyReinvestmentCode: '',
        shellCityReinvestmentCode: '1',
        shellCityReinvestmentCodeName: '',
        shellCityTransactionRate: 0
      },

      value: '',
      dynamicValidateForm1: {
        id: '',
        shellCountyTransactionRate: '',
        shellCountyReinvestmentCode: ''
      },
      dynamicValidateForm: {
        id: '',
        shellCityTransactionRate: '',
        shellCityReinvestmentCode: ''
      },
      options: [
        { value: '1', label: '南海1号' },
        { value: '2', label: '南海2号' },
        { value: '3', label: '南海3号' },
        { value: '4', label: '南海4号' },
        { value: '5', label: '南海5号' },
        { value: '6', label: '南海6号' },
        { value: '7', label: '南海7号' },
        { value: '8', label: '南海8号' },
        { value: '9', label: '南海9号' },
        { value: '10', label: '南海10号' }
      ],
      input3: '',
      dialogVisible1: false,
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    changedata() {
      this.dialogVisible = false
      this.dynamicValidateForm.shellCityTransactionRate /= 100
      update({ ...this.dynamicValidateForm }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getdata()
      })
    },
    changedata1() {
      this.dialogVisible1 = false
      this.dynamicValidateForm1.shellCountyTransactionRate /= 100
      update({ ...this.dynamicValidateForm1 }).then(res => {
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
          this.changedata()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changedata1()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showdata1() {
      var { id, shellCountyTransactionRate, shellCountyReinvestmentCode } = this.form
      shellCountyTransactionRate *= 100
      this.dynamicValidateForm1 = { id, shellCountyTransactionRate, shellCountyReinvestmentCode }
      this.dialogVisible1 = true
    },
    showdata() {
      var { id, shellCityTransactionRate, shellCityReinvestmentCode } = this.form
      shellCityTransactionRate *= 100
      this.dynamicValidateForm = { id, shellCityTransactionRate, shellCityReinvestmentCode }
      this.dialogVisible = true
    },
    getdata() {
      facade().then(res => {
        const {
          idStr: id,
          shellCountyTransactionRate,
          shellCountyReinvestmentCodeName,
          shellCountyReinvestmentCode,
          shellCityReinvestmentCode,
          shellCityReinvestmentCodeName,
          shellCityTransactionRate
        } = res.object[0]
        this.form = {
          id,
          shellCountyTransactionRate,
          shellCountyReinvestmentCodeName,
          shellCountyReinvestmentCode,
          shellCityReinvestmentCode,
          shellCityReinvestmentCodeName,
          shellCityTransactionRate
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.shellPartner {
  &-title {
    margin-top: 20px;
  }
  &-button {
    color: #409eff;
    cursor: pointer;
  }
  &-city {
    padding: 20px 0;
    &-info {
      p {
        font-weight: bold;
        padding-top: 20px;
      }
    }
    p {
      font-size: 13px;
    }
  }
  &-title1 {
    margin-top: 100px;
  }
  .dialoginput {
    max-width: 200px;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 0px;
    .suffix {
      line-height: 40px;
      padding-right: 5px;
    }
    p {
      white-space: nowrap;
    }
  }
}
.el-form-item {
}
</style>
