<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="6">
        <div class="grid-content">
          <cityselect v-model="form.areaIdPath" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="grid-content">
          <p>加入时间时间：</p>
          <el-date-picker
            v-model="timevalue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="grid-content">
          <p>状态：</p>
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :xs="24" :sm="15" :md="15" :lg="10" :xl="6">
        <div class="grid-content">
          <el-input v-model="form.vague" placeholder="用户昵称/用户ID/手机号" style="margin-right:10px" />
          <!-- <el-button type="primary" icon="el-icon-search" style="margin-left:10px" @click="getdata">搜索</el-button> -->
          <el-button type="primary" @click="reset">全部重置</el-button>
        </div>
      </el-col>
    </el-row>
    <div>
      <div class="addpartner">
        <el-button size="mini" @click="addpartner()">添加合伙人</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="areaName" label="市/区县" align="center" />
        <el-table-column prop="cityGradeName" label="类型" align="center" />
        <el-table-column prop="userIdStr" label="ID" align="center" width="170" />
        <el-table-column prop="nickName" label="昵称" width="105" align="center" />
        <el-table-column prop="mobile" label="手机号" align="center" width="120" />
        <el-table-column prop="validityStartName" label="加入时间" width="160" align="center" />
        <el-table-column prop="validityEndName" label="截止时间" width="160" align="center" />
        <el-table-column prop="statusName" label="状态" width="120" align="center">
          <!-- <template slot-scope="scope">
            <span v-if="scope" style="color:#67C23A">有效</span>
            <span v-else-if="scope" style="color:#F56C6C">撤销</span>
            <span v-else-if="scope" style="color:#F56C6C">过期</span>
            <span v-else>-</span>
          </template>-->
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status!=='1'"
              type="text"
              size="small"
              @click="addpartner(scope.row)"
            >添加</el-button>
            <el-button v-else type="text" size="small" @click="handleClick(scope.row.idStr)">撤销</el-button>
            <el-button type="text" size="small" @click="jump(scope.row.userIdStr)">用户详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page.sync="form.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.pageSize"
        layout="sizes, prev, pager, next,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <p style="text-align: center;">是否要撤销当前城市合伙人</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialog">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="优惠券合伙人" :visible.sync="dialogVisible" width="50%">
      <div>
        <el-form
          v-if="dialogVisible"
          ref="ruleForm"
          hide-required-asterisk
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="合伙城市：" prop="areaId">
            <cityselect v-model="ruleForm.areaId" title :open-all="false" />
          </el-form-item>
          <el-form-item label="用户ID/手机号：" prop="userIdStri">
            <div class="ruleForminput">
              <el-input v-model="ruleForm.userIdStri" />
              <!-- <el-button type="primary" icon="el-icon-search">筛选</el-button> -->
            </div>
          </el-form-item>
          <div class="userinfo">
            <span v-if="findUserData.idStr">用户ID：{{ findUserData.idStr }}</span>
            <span v-if="findUserData.nickName">用户名：{{ findUserData.nickName }}</span>
          </div>
          <div class="userinfo">
            <span v-if="findUserData.mobile">注册手机号：{{ findUserData.mobile }}</span>
            <span v-if="findUserData.realName">实名认证：{{ findUserData.realName }}</span>
          </div>
          <el-form-item label="开始时间：">
            <!-- <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
            />-->
            <p class="startNow">立即开始</p>
          </el-form-item>
          <el-form-item label="结束时间：" prop="validityEnd">
            <el-date-picker
              v-model="ruleForm.validityEnd"
              type="datetime"
              value-format="yyyy/MM/dd HH:mm:ss"
              placeholder="选择日期时间"
              :picker-options="disPickerOptions"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialogadd-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="城市合伙人" :visible.sync="dialogVisibleAdd" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleAdd = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { disPickerOptions } from '@/utils/getDate'
import {
  facade,
  chooseCity,
  findUser,
  update,
  addPartner
} from '@/api/usercitypartner'
import cityselect from '@/components/selecty/cityselect'
const citytype = '2' // 合伙人类型 1-贝壳合伙人，2-优惠券合伙人
export default {
  components: {
    cityselect
  },
  data() {
    const validAreaId = (rule, value, callback) => {
      if (!value || value === null || value.length === 0) {
        return callback(new Error('内容不能为空'))
      } else if (value.length === 1) {
        return callback(new Error('一级目录不支持'))
      } else {
        chooseCity({ type: citytype, areaIdPath: value.join('_') }).then(
          res => {
            if (res.code === 0) {
              callback()
            } else {
              callback(new Error(res.message))
            }
          }
        )
      }
    }
    const validID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('内容不能为空'))
      } else {
        findUser({ vague: value }).then(res => {
          if (res.code === 0) {
            this.findUserData = res.object
            callback()
          } else {
            callback(new Error(res.message))
          }
        })
      }
    }
    return {
      findUserData: {},
      disPickerOptions,
      form: {
        pageSize: 10,
        currentPage: 1,
        validityStartMin: '',
        validityStartMax: '',
        validityEndMin: '',
        validityEndMax: '',
        status: '',
        type: citytype,
        vague: '',
        areaIdPath: ''
      },
      value1: '',
      timevalue: [],
      ruleForm: {
        userIdStri: '',
        type: citytype,
        validityEnd: undefined,
        areaId: []
      },
      rules: {
        validityEnd: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        userIdStri: [{ validator: validID, trigger: ['blur', 'change'] }],
        areaId: [{ validator: validAreaId, trigger: ['blur', 'change'] }]
      },
      dialogVisible: false,
      dialogVisibleAdd: false,
      centerDialogVisible: false,
      currentPage2: 1,
      tableData: [{}],
      input: '',
      options: [
        { value: '', label: '全部' },
        { value: '1', label: '有效' },
        { value: '2', label: '撤销' },
        { value: '3', label: '过期' }
      ],
      value: '',
      value2: '',
      total: 0,
      id: ''
    }
  },
  computed: {},
  watch: {
    form: {
      handler() {
        this.getdata()
      },
      deep: true
    },
    timevalue(value) {
      if (value === null) {
        value = new Array(2)
      }
      [this.form.validityStartMin, this.form.validityStartMax] = value
    },
    dialogVisible() {
      this.findUserData = {}
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    centerDialog() {
      update({ id: this.id }).then(res => {
        this.$message({
          message: '撤销成功',
          type: 'success'
        })
      })
      this.getdata()
      this.centerDialogVisible = false
    },
    jump(val) {
      this.$router.push({
        path: 'userInfo',
        query: {
          id: val
        }
      })
    },
    addpartner(value = {}) {
      var {
        userIdStr: userIdStri, validityEnd, areaIdPath: areaId } = value
      areaId = areaId ? areaId.split('_') : ''
      validityEnd = ''
      this.ruleForm = { userIdStri, type: citytype, validityEnd, areaId }
      this.dialogVisible = true
    },
    addData() {
      this.dialogVisible = false
      this.ruleForm.areaId = this.ruleForm.areaId[this.ruleForm.areaId.length - 1]
      this.ruleForm.userIdStri = this.findUserData.idStr
      addPartner({ ...this.ruleForm }).then(res => {
        this.getdata()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      })
    },
    reset() {
      location.reload()
    },
    getdata() {
      if (this.form.areaIdPath && typeof this.form.areaIdPath === 'object') {
        this.form.areaIdPath = this.form.areaIdPath.join('_')
      }
      facade({ ...this.form }).then(res => {
        const { list, total } = res.object
        this.tableData = list
        this.total = total
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange(value) {
      this.form.pageSize = value
    },
    handleCurrentChange(value) {
      this.form.currentPage = value
    },
    handleClick(value) {
      this.id = value
      this.centerDialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
.ruleForminput {
  display: flex;
  .el-input {
    max-width: 230px;
    padding-right: 10px;
  }
}
.dialog-footer {
  display: flex;
  .el-button {
    width: 100%;
  }
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
.grid-content {
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  font-size: 14px;
  white-space: nowrap;
  align-items: center;
}
.addpartner {
  text-align: right;
  padding: 10px 0;
}
.startNow {
  margin: 0;
}
.userinfo {
  text-align: left;
  margin: 5px auto;
  width: 80%;
  span {
    white-space: nowrap;
    margin: 0px 10px;
  }
}
</style>
