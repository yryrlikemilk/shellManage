<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="shellGradeCodeName"
        label="等级"
        align="center"
        width="150"
      />
      <el-table-column
        prop="upgradeShellGradeCodeName"
        label="升级对象"
        align="center"
      />
      <el-table-column
        prop="conditionOneUpLevel"
        label="升级条件1"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.upgradeShellGradeCodeName!=='未认证'">
            向上{{ scope.row.conditionOneUpLevel }}层打赏{{ scope.row.conditionOneRewardPearl }}颗珍珠
          </span>
          <span v-else>
            实名认证
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="condition"
        label="升级条件2"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.conditionTwoShellGradeCodeName">
            向上最近{{ scope.row.conditionTwoShellGradeCodeName }}打赏{{ scope.row.conditionTwoRewardPearl }}颗珍珠
          </span>
          <span v-else>
            无
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="condition"
        label="手续费"
        align="center"
      >
        <template slot-scope="scope">
          <div style="color:#409eff">
            {{ scope.row.rewardRate*100 }}%
          </div>
        </template>
      </el-table-column>
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
    <div class="infoshow">
      • 团队是向下树形结构，但是向上是一条直线结构，向上几层的意思是用户A向上第几层的用户
    </div>
    <div class="infoshow">
      • 如打赏向上层数不够，直接打赏给平台
    </div>
    <div class="infoshow">
      • 如果您最高持有3等贝壳，而直推的会员中有一个升5等贝壳，那么你此时获得珍珠直推打赏计算：实际应得5颗珍珠的50%=2.5，而等级不够只得3颗珍珠50%=1.5（烧伤）
    </div>
    <div class="infoshow">
      • 当您最高持有5等贝壳时，而此时可以拿到直推会员升5等贝壳获得珍珠直推打赏计算：5颗珍珠的50%=3（不烧伤）
    </div>
    <el-dialog
      :title="dialogtitle"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div v-if="dialogVisible">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="200px" class="demo-ruleForm">
          <el-form-item label="打赏手续费：" prop="rewardRate">
            <el-input v-model="ruleForm.rewardRate" type="number">
              <span slot="suffix" class="unit"> % </span>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <div slot="label" class="labeltitle">
              达成条件&nbsp;&nbsp;
            </div>
          </el-form-item>
          <div v-if="dialogtitle!=='0等贝壳'">
            <el-form-item :label="lable" prop="conditionOneRewardPearl">
              <el-input v-model="ruleForm.conditionOneRewardPearl" type="number">
                <span slot="suffix" class="unit"> 个 </span>
              </el-input>
            </el-form-item>
            <el-form-item v-if="conditionTwoShellGradeCodeName" :label="lableTwo" prop="conditionTwoRewardPearl">
              <el-input v-model="ruleForm.conditionTwoRewardPearl" type="number">
                <span slot="suffix" class="unit"> 个 </span>
              </el-input>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item label="">
              实名认证
            </el-form-item>
          </div>

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
import { levelShellList, levelShellUpdate } from '@/api/shellSet'
export default {
  components: {},
  data() {
    return {
      conditionTwoShellGradeCodeName: '',
      lable: '',
      lableTwo: '最近5等贝壳打赏珍珠：',
      dialogtitle: '1等贝壳编辑',
      ruleForm: {
        rewardRate: '',
        conditionOneRewardPearl: '',
        conditionTwoRewardPearl: '',
        id: ''
      }, rules: {
        rewardRate: [
          { required: true, message: '请输入打赏手续费', trigger: 'blur' }
        ],
        conditionOneRewardPearl: [
          { required: true, message: '请输入同时拥有', trigger: 'blur' }
        ],
        conditionTwoRewardPearl: [
          { required: true, message: '请输入内容：', trigger: 'blur' }
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
      levelShellList().then(res => {
        this.tableData = res.object
      })
    },
    changedata() {
      this.ruleForm.rewardRate /= 100
      levelShellUpdate({ ...this.ruleForm }).then(res => {
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
      const { idStr: id, rewardRate, upgradeShellGradeCodeName, conditionOneUpLevel, conditionOneRewardPearl, conditionTwoRewardPearl, shellGradeCodeName, conditionTwoShellGradeCodeName } = val
      this.lable = `${upgradeShellGradeCodeName}向上${conditionOneUpLevel}层打赏珍珠：`
      this.lableTwo = ` 最近${conditionTwoShellGradeCodeName}层打赏珍珠`
      this.dialogtitle = shellGradeCodeName
      this.conditionTwoShellGradeCodeName = conditionTwoShellGradeCodeName
      this.ruleForm = { id, rewardRate: 100 * rewardRate, conditionOneRewardPearl, conditionTwoRewardPearl }
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
</style>
