<template>
  <div>
    <el-dialog :title="formdata.name" :visible.sync="dialogFormVisible">
      <el-form ref="formdata" :model="formdata" :rules="rules" hide-required-asterisk>
        <el-form-item label="商城名称" :label-width="formLabelWidth">
          <el-input v-model="formdata.name" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="基础佣金设置" :label-width="formLabelWidth" prop="baseCommissionRate">
          <div class="baseMoney">
            <el-input v-model="formdata.baseCommissionRate" type="number" placeholder="请输入">
              <span slot="suffix" style="padding-right:10px;color:#000">
                %
              </span>
            </el-input>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">平台获取到电商平台的佣金，<br>设置一定比例作为基础佣金返利给用户</div>
              <el-button round type="text" style="color:#000">
                <i class="el-icon-question" />
              </el-button>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="每日更新时段" :label-width="formLabelWidth" prop="timeList">
          <div v-for="(item,index) in formdata.timeList" :key="index+9" class="uptime">
            <el-time-picker
              v-model="formdata.timeList[index].updateTime"
              value-format="HH:mm:ss"
              placeholder="任意时间点"
            />
            <!-- <el-input v-model="form.timeList[index].updateTime" :maxlength="2" :max="24" :min="0" type="number" placeholder="请选择日期" autocomplete="off" @change="changeValue(index)" /> -->
            <div class="uptimeadd">
              <i class="el-icon-circle-plus-outline" @click="uptimeadd" />
              <i v-show="formdata.timeList.length>1" class="el-icon-remove-outline" @click="uptimeMinus(index)" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <switchel v-model="formdata.status" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formdata')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrUpdate } from '@/api/storeMg'
import switchel from '@/components/switchel'
export default {
  components: {
    switchel
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    formdata: {
      type: Object,
      default: undefined
    }
  },
  data() {
    const validatetimeList = (rule, value, callback) => {
      value.map((element, index) => {
        if (!element.updateTime) {
          return callback(new Error(`请输入${index + 1}列时段`))
        }
      })
      callback()
    }
    return {
      rules: {
        baseCommissionRate: [
          { required: true, message: '请输入基础佣金设置', trigger: 'blur' }
        ],
        timeList: [
          { validator: validatetimeList, trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px',
      dialogFormVisible: this.value
      // form: this.formdata
    }
  },
  computed: {},
  watch: {
    dialogFormVisible(val) {
      this.$emit('input', val)
    }
  },
  created() {},
  mounted() {
    if (this.formdata.timeList === null || this.formdata.timeList.length === 0) {
      this.formdata.timeList.push({ mallId: this.formdata.id, updateTime: '' })
    }
    this.formdata.baseCommissionRate *= 100
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Update()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Update() {
      this.dialogFormVisible = false
      this.formdata.baseCommissionRate /= 100
      addOrUpdate({ ...this.formdata }).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.$parent.getdata()
      })
    },
    uptimeMinus(value) {
      this.formdata.timeList.splice(value, 1)
    },
    uptimeadd() {
      this.formdata.timeList.push({ mallId: this.formdata.id, updateTime: '' })
    }
  }
}
</script>
<style lang='scss' scoped>
.uptimeadd{
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  i{
    cursor: pointer;
    color: #409eff;
    padding: 0 0 0 15px;
  }
}
.el-form-item {
  width: 500px;
}
.baseMoney{
  display: flex;
  justify-content: space-between;
}
.uptime{
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;

}
</style>
