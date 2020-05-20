<template>
  <div class="realtimeMg">
    <breadnar title="实时头条" />
    <el-button class="addbutton" @click="handleClick()">新增</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="userName"
        label="用户名"
        align="center"
      />
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
      />
      <el-table-column
        prop="commission"
        label="佣金"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.commission }}元</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rawAddTime"
        label="更新时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ parstime(scope.row.rawAddTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="类型"
        align="center"
      />
      <el-table-column
        label="操作"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getinfo(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="open(scope.row.idStr)">删除</el-button>
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
    <el-dialog title="实时头条" :visible.sync="dialogFormVisible" :before-close="handleClose" :destroy-on-close="true">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" hide-required-asterisk>
        <el-form-item label="用户名：" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off" style="max-width:300px" />
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="off" style="max-width:300px" />
        </el-form-item>
        <el-form-item label="佣金金额：" :label-width="formLabelWidth" prop="commission">
          <el-input v-model.number="ruleForm.commission" autocomplete="off" type="number" style="max-width:300px">
            <span slot="suffix" style="padding-right:5px;color:#000"> 元 </span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { facade, addOrUpdate, batchDelete, option_detail } from '@/api/realtimeMg'
export default {
  components: {},
  data() {
    return {
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        commission: [
          { required: true, message: '请输入佣金金额', trigger: 'blur' }
        ]
      },
      ruleForm: {
        id: '',
        userName: '',
        phone: '',
        commission: ''
      },
      dialogFormVisible: false,
      tableData: [],
      total: 0,
      form: {
        currentPage: 1,
        pageSize: 10
      },
      formLabelWidth: '120px'
    }
  },
  computed: {},
  watch: {
    form: {
      handler() {
        this.getdata()
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    changedata() {
      addOrUpdate({ ...this.ruleForm }).then(res => {
        this.$message({
          message: `${this.ruleForm.id ? '编辑' : '新增'}成功`,
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getdata()
      })
    },
    getinfo(value) {
      option_detail({ id: value.idStr }).then(res => {
        debugger
        const { idStr: id, userName, phone, commission } = res.object
        this.ruleForm = { id, userName, phone, commission }
      })
      this.dialogFormVisible = true
    },
    handleClose() {
      this.ruleForm = {}
      this.dialogFormVisible = false
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
    getdata() {
      facade({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
      })
    },
    open(value) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDelete({ id: value }).then(res => {
          this.getdata()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClick() {
      this.ruleForm = {}
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      this.form.pageSize = val
    },
    handleCurrentChange(val) {
      this.form.currentPage = val
    }
  }
}
</script>
<style scoped>
.realtimeMg{
  padding: 20px;
}
.el-pagination{
 text-align: right;
 margin: 20px 0;
}
.addbutton{
  float: right;
  margin-bottom: 20px;
}
</style>
