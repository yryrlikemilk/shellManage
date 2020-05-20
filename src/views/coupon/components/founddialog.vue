<template>
  <div>
    <el-dialog title="发现类别" :visible.sync="dialogFormVisible" destroy-on-close>
      <el-form ref="ruleForm" hide-required-asterisk :model="form" :rules="rules">
        <el-form-item label="类别名称：" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" :maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="添加关键词：" :label-width="formLabelWidth" prop="times">
          <div v-for="(item,index) in form.times" :key="index+9" class="uptime">
            <el-input v-model="form.times[index].value" placeholder="请输入关键字" autocomplete="off" />
            <div class="uptimeadd">
              <i class="el-icon-circle-plus-outline" @click="uptimeadd" />
              <i v-show="form.times.length>1" class="el-icon-remove-outline" @click="uptimeMinus(index)" />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrUpdate } from '@/api/discoverCommodity'
export default {
  components: {
  },
  props: {
    aditerdata: {
      type: Object,
      default: undefined
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const timevaild = (rule, value, callback) => {
      value.map((element, index) => {
        if (!element.value) return callback(new Error(`请将${index + 1}行补充完整`))
      })
      callback()
    }
    return {
      rules: {
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ],
        times: [
          { validator: timevaild, trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px',
      dialogFormVisible: this.value,
      form: this.aditerdata,
      formid: this.aditerdata.id
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
  },
  methods: {
    getkeywords(value) {
      try {
        const str = value.map(ele => {
          return ele.value
        })
        return str.join(';')
      } catch (error) {
        return value
      }
    },
    changedata() {
      addOrUpdate({ name: this.form.name, id: this.formid, keywords: this.getkeywords(this.form.times) }).then(res => {
        this.$message({
          type: 'success',
          message: `${this.formid ? '编辑' : '新增'}成功`
        })
        this.formid = ''
        this.form = {}
        this.dialogFormVisible = false
        this.$parent.getdata()
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
    // changeValue(value) {
    //   if (this.form.times[value].value > 24) {
    //     this.form.times[value].value = 24
    //   } else if (this.form.times[value].value < 0) {
    //     this.form.times[value].value = 0
    //   } else {
    //     this.form.times[value].value = parseInt(this.form.times[value].value)
    //   }
    // },
    uptimeMinus(value) {
      this.form.times.splice(value, 1)
    },
    uptimeadd() {
      this.form.times.push({ value: '' })
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
  width: 80%;
}
.baseMoney{
  display: flex;
  justify-content: space-between;
}
.uptime{
  margin-bottom: 15px;
  display: flex;
  justify-content: center;

}
</style>
