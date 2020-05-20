<template>
  <div class="advertising">
    <breadnar title="消息设置" />
    <div class="advertising-head">
      <div>
        <label for="select">类型：</label>
        <el-select id="select" v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button size="medium" @click="dialogshow()">新增</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="idString" label="ID" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="explanation" label="消息描述" align="center" />
        <!-- <el-table-column prop="name" label="链接" align="center" /> -->
        <el-table-column prop="rawAddTimeStr" label="创建时间" align="center" />
        <el-table-column prop="sendTime" label="发送时间" align="center">
          <template slot-scope="scope">
            <span> {{ parstime(scope.row.sendTime) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="创建人" align="center" /> -->
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==='0'" style="color:#E6A23C">待发送</span>
            <span v-else style="color:#67C23A">已发送</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="dialogshow(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="open(scope.row.idString)"
            >删除</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="dialogForm" :rules="rules" hide-required-asterisk>
        <el-form-item label="消息名称：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="dialogForm.title" autocomplete="off" style="max-width:300px" />
        </el-form-item>
        <el-form-item label="发送时间：" :label-width="formLabelWidth" prop="sendTime">
          <el-date-picker
            v-model="dialogForm.sendTime"
            value-format="yyyy/MM/dd HH:mm:ss"
            style="min-width:300px"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="消息描述：" :label-width="formLabelWidth" prop="explanation">
          <el-input
            v-model="dialogForm.explanation"
            type="textarea"
            :rows="6"
            style="max-width:300px"
            placeholder="请输入内容"
          />
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
import { facade, addOrUpdate, batchDelete } from '@/api/messageMg'
export default {
  components: {

  },
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        sendTime: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        explanation: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      form: {
        currentPage: 1,
        pageSize: 10,
        status: ''
      },
      dialogForm: {
        title: '',
        sendTime: '',
        explanation: '',
        id: ''
      },
      textarea: '',
      value1: '',
      status: '',
      img: [],
      currentPage2: 1,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '待发送'
        },
        {
          value: '1',
          label: '已发送'
        }
      ],
      value: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      total: 0,
      title: '新增消息'
    }
  },
  computed: {},
  watch: {
    form: {
      handler(value) {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deleteData(value) {
      batchDelete({ idStr: value }).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getdata()
      })
    },
    addData() {
      this.dialogFormVisible = false
      addOrUpdate({ ...this.dialogForm }).then(res => {
        this.$message({
          message: `${this.title}成功`,
          type: 'success'
        })
        this.getdata()
      })
    },
    getdata() {
      facade({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
      })
    },
    open(value) {
      this.$confirm('是否继续删除?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteData(value)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    dialogshow(value = {}) {
      var { title, sendTime, explanation, idString: id } = value
      if (id) { this.title = '编辑消息' } else { this.title = '新增消息' }
      if (sendTime) {
        sendTime = this.parstime(sendTime, '{y}/{m}/{d} {h}:{i}:{s}')
      }
      this.dialogForm = { title, sendTime, explanation, id }
      this.dialogFormVisible = true
    },
    handleSizeChange(value) {
      this.form.pageSize = value
    },
    handleCurrentChange(value) {
      this.form.currentPage = value
    },
    deleteRow() {}
  }
}
</script>
<style lang='scss' scoped>
.advertising {
  padding: 20px;
  &-head {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
}
label {
  font-size: 14px;
  font-weight: 400;
}
.el-select {
  margin-right: 10px;
}
.el-pagination {
  float: right;
  margin: 20px 0;
}
.el-form {
  width: 60%;
}

</style>
