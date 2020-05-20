<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="level" label="等级" align="center" width="150" />
      <el-table-column prop="condition" label="达成条件" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='LV1'">{{ scope.row.condition }}</span>
          <span v-else>经验值：{{ scope.row.condition }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="infoshow">• 每直推且实名认证1人 增加经验值+50</div>
    <el-dialog title="会员等级编辑" :before-close="dialogClose" :visible.sync="dialogVisible" width="40%">
      <div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="LV2经验值" prop="experienceLv2">
            <el-input v-model="ruleForm.experienceLv2" type="number" />
          </el-form-item>
          <el-form-item label="LV3经验值" prop="experienceLv3">
            <el-input v-model="ruleForm.experienceLv3" type="number" />
          </el-form-item>
          <el-form-item label="LV4经验值" prop="experienceLv4">
            <el-input v-model="ruleForm.experienceLv4" type="number" />
          </el-form-item>
          <el-form-item label="LV5经验值" prop="experienceLv5">
            <el-input v-model="ruleForm.experienceLv5" type="number" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose()">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { membershipList, membershipupdate } from '@/api/shellSet'
export default {
  components: {},
  data() {
    return {
      ruleForm: {
        id: '',
        experienceLv2: '',
        experienceLv3: '',
        experienceLv4: '',
        experienceLv5: ''
      }, rules: {
        experienceLv2: [
          { required: true, message: '请输入LV2经验值', trigger: 'blur' }
        ],
        experienceLv3: [
          { required: true, message: '请输入LV3经验值', trigger: 'blur' }
        ],
        experienceLv4: [
          { required: true, message: '请输入LV4经验值', trigger: 'blur' }
        ],
        experienceLv5: [
          { required: true, message: '请输入LV5经验值', trigger: 'blur' }
        ]
      },
      tableData: [
        { level: 'LV1', condition: '实名认证' },
        { level: 'LV2', condition: '' },
        { level: 'LV3', condition: '' },
        { level: 'LV4', condition: '' },
        { level: 'LV5', condition: '' }
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
    dialogClose(done) {
      this.getList()
      if (done) done()
      this.dialogVisible = false
    },
    changeLevel() {
      membershipupdate({ ...this.ruleForm }).then(res => {
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
      membershipList().then(res => {
        this.ruleForm.experienceLv2 = this.tableData[1].condition = res.object[0].shellMap.Lv2
        this.ruleForm.experienceLv3 = this.tableData[2].condition = res.object[0].shellMap.Lv3
        this.ruleForm.experienceLv4 = this.tableData[3].condition = res.object[0].shellMap.Lv4
        this.ruleForm.experienceLv5 = this.tableData[4].condition = res.object[0].shellMap.Lv5
        this.ruleForm.id = res.object[0].idStr
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.changeLevel()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClick() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
@import url("./shellSet.scss");
</style>
