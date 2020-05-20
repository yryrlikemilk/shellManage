<template>
  <div class="advertising">
    <breadnar title="常见问题" />
    <div class="advertising-head">
      <div class="advertising-head-left">
        <div>
          <label for="input">搜索：</label>
          <el-input v-model="roulsForm.criteria" placeholder="搜索问题和回答" style="width:200px" />
        </div>
        <div>
          <el-button size="medium" @click="getlist">确定</el-button>
        </div>
        <div>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </div>
      <div class="advertising-head-right">
        <el-button size="medium" @click="dialogshow()">新增</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="idStr" label="ID" align="center" />
        <el-table-column prop="question" label="问题" align="center" />
        <el-table-column prop="answer" label="回答" align="center" />
        <el-table-column prop="modifyTime" label="更新时间" align="center" />
        <el-table-column prop="realName" label="创建人" align="center" />
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
              @click.native.prevent="open(scope.row.idStr)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page.sync="roulsForm.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="roulsForm.pageSize"
        layout="sizes, prev, pager, next,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="新增消息" :visible.sync="dialogFormVisible" width="850px">
      <el-form :model="form" :rules="rules">
        <el-form-item label="问题：" :label-width="formLabelWidth" prop="question">
          <el-input
            v-model="form.question"
            autocomplete="off"
            type="textarea"
            :rows="2"
            style="max-width:400px"
          />
        </el-form-item>

        <el-form-item label="回答：" :label-width="formLabelWidth" prop="answer">
          <!-- <el-input
            v-model="form.answer"
            type="textarea"
            :rows="6"
            style="max-width:400px"
            placeholder="请输入内容"
          /> -->
          <wangeditor v-model="form.answer" :initial="form.answer" />
        </el-form-item>
        <el-form-item label="排序：" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form.sort" autocomplete="off" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changedata">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import wangeditor from '@/components/wangeditor/index'
import { facade, questionDel, questionChg } from '@/api/commonQuestion'
export default {
  components: {
    wangeditor
  },
  data() {
    return {
      textarea: '',
      value1: '',
      status: '',
      total: 0,
      img: [],
      rules: {
        question: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ] },
      roulsForm: {
        pageSize: 10,
        currentPage: 1,
        criteria: ''
      },
      currentPage2: 1,
      tableData: [],
      value: '',
      dialogFormVisible: false,
      form: {
        id: '',
        question: '',
        answer: '',
        sort: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getlist()
  },
  methods: {
    changedata() {
      const name = this.form.id ? '编辑' : '新增'
      questionChg({ ...this.form }).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: `${name}成功!`
          })
        }
        this.getlist()
        this.dialogFormVisible = false
      })
    },
    reset() {
      this.roulsForm = {}
      this.getlist()
    },
    getlist() {
      facade({ ...this.roulsForm }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
      })
    },
    open(val) {
      this.$confirm('是否继续删除?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionDel({ id: val }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    dialogshow(val = {}) {
      const { idStr: id, question, answer, sort } = val
      this.form = { id, question, answer, sort }
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      this.roulsForm.pageSize = val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.roulsForm.currentPage = val
      this.getlist()
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
    align-items: center;
    &-left{
    display: flex;
    align-items: center;
    margin: 20px 0;
    div{
      margin-right: 10px;
    }
    }

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
  // width: 60%;
}

</style>
