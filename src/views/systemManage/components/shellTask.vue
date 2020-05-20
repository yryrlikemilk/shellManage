<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="taskName"
        label="任务名称"
        align="center"
        width="150"
      />
      <el-table-column
        prop="completeValue"
        label="内容"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.taskCode==='1'">{{ scope.row.completeValue }}次</span>
          <span v-else-if="scope.row.taskCode==='2'">{{ scope.row.completeValue }}个</span>
          <span v-else>{{ scope.row.completeValue }}分钟</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status==='1'" style="color:#409eff">启用</span>
          <span v-else style="color:red">禁用</span>
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
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="infoshow">
      • 冻结珍珠，每日完成任务张工的其中1个即可释放当日珍珠
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div v-if="dialogVisible">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="0" class="demo-ruleForm">
          <el-form-item prop="completeValue">
            <el-input v-model="ruleForm.completeValue" type="number" placeholder="请输入内容">
              <span slot="suffix">{{ danwei }}</span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="dialogStatus">
              <p>状态：</p>
              <switchel v-model="ruleForm.status" activetext="启用" inactivetext="禁用" />
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
import switchel from '@/components/switchel/index'
import { shellTaskList, shellTaskUpdate } from '@/api/shellSet'
export default {
  components: {
    switchel
  },
  data() {
    return {
      title: '',
      danwei: '次',
      status: 1,
      input: '',
      ruleForm: {
        id: '',
        completeValue: '',
        status: ''
      }, rules: {
        completeValue: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
      shellTaskList().then(res => {
        this.tableData = res.object
      })
    },
    changedata() {
      shellTaskUpdate({ ...this.ruleForm }).then(res => {
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
          this.changedata()
          this.dialogVisible = false
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
      const { idStr: id, completeValue, status, taskCode, taskName } = val
      this.ruleForm = { id, completeValue, status }
      this.title = taskName
      switch (taskCode) {
        case '1':
          this.danwei = '次'
          break
        case '2':
          this.danwei = '个'
          break
        case '3':
          this.danwei = '分钟'
      }
      this.dialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
@import './shellSet.scss';
.unit{
  padding-right: 10px;
  color: #000;
}
.labeltitle{
  text-align: right;
}
.dialogStatus{
  display:flex;
  justify-items: center;
  align-items: center;
}
</style>
