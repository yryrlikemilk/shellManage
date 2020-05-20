<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="设置项目"
        align="center"
        width="150"
      />
      <el-table-column
        prop="content"
        label="内容"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div>
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="0" class="demo-ruleForm">
          <el-form-item>
            <p>{{ title }}</p>
          </el-form-item>
          <el-form-item v-if="title==='1个活跃度兑换珍珠'" prop="exchangePearlNum">
            <el-input v-model="ruleForm.exchangePearlNum" type="number">
              <span slot="suffix"> 颗 &nbsp; </span>
            </el-input>
          </el-form-item>
          <el-form-item v-else-if="title==='冻结周期'" prop="freezeCycle">
            <el-input v-model="ruleForm.freezeCycle" type="number">
              <span slot="suffix"> 日 &nbsp; </span>
            </el-input>
          </el-form-item>
          <el-form-item v-else prop="transactionRate">
            <el-input v-model="ruleForm.transactionRate" type="number">
              <span slot="suffix"> % &nbsp; </span>
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
import { shellMoreList, shellMoreUpdate } from '@/api/shellSet'
export default {
  components: {},
  data() {
    return {
      id: '',
      title: '',
      ruleForm: {
        id: '',
        transactionRate: '',
        exchangePearlNum: '',
        freezeCycle: ''
      }, rules: {
        transactionRate: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        exchangePearlNum: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        freezeCycle: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      tableData: [
        { name: '1个活跃度兑换珍珠', content: '' },
        { name: '冻结周期', content: '' },
        { name: '小视频手续费', content: '' }
      ],
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
      shellMoreList().then(res => {
        const { idStr: id, transactionRate, exchangePearlNum, freezeCycle } = res.object[0]
        this.tableData[0].content = exchangePearlNum + '颗'
        this.tableData[1].content = freezeCycle + '日'
        this.tableData[2].content = transactionRate + '%'
        this.ruleForm = { id, transactionRate, exchangePearlNum, freezeCycle }
      })
    },
    changedata() {
      shellMoreUpdate({ ...this.ruleForm }).then(res => {
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
      this.$refs[formName].validate((valid) => {
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
      this.title = val.name
      this.dialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
@import './shellSet.scss';

.labeltitle{
  text-align: right;
}
</style>
