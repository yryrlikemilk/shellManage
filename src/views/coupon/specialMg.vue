<template>
  <div class="specialMg">
    <breadnar title="专题管理" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="专题内容" name="first" :lazy="true">
        <el-button class="addbutton" @click="Thematic()">新增</el-button>
        <el-table :data="thematicData" border style="width: 100%">
          <el-table-column prop="thematicTypeName" label="分类" align="center" />
          <el-table-column prop="thematicName" label="专题名称" align="center" />
          <!-- <el-table-column prop="explanation" label="描述" align="center" /> -->
          <el-table-column prop="imgUrl" label="图标" align="center">
            <template slot-scope="scope">
              <div class="imglist">
                <div v-for="(item,index) in scope.row.imgUrl" :key="index">
                  <img v-if="item" :src="item" alt width="60">
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="thematicSpreadCategoryList" label="设置" align="center">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.thematicSpreadCategoryList" :key="index">
                <p>{{ item }}</p>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="remark" label="备注" width="120" align="center" />
          <el-table-column prop="statusName" label="状态" width="120" align="center" />
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="Thematic(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="open(scope.row,true)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="分类管理" name="second">
        <el-button class="addbutton" @click="handleClick()">新增</el-button>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="idStr" label="ID" align="center" />
          <el-table-column prop="name" label="分类名称" align="center" />
          <el-table-column prop="rawUpdateTimeStr" label="更新时间" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.rawUpdateTimeStr">{{ scope.row.rawUpdateTimeStr }}</span>
              <span v-else>{{ parstime(scope.row.rawAddTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="open(scope.row,false)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page.sync="form.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="form.pageSize"
          background
          layout="sizes, prev, pager, next,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <el-dialog
          :title="ruleForm.id?'编辑分类':'新增分类'"
          :visible.sync="dialogFormVisible"
          width="30%"
          destroy-on-close
        >
          <el-form ref="ruleForm" :model="ruleForm">
            <el-form-item
              label
              prop="name"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '请输入分类名称', trigger: 'blur' }]"
            >
              <el-input v-model="ruleForm.name" placeholder="分类名称" autocomplete="off" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  facade,
  addOrUpdate,
  option_detail,
  batchDelete,
  thematicFacade,
  thematicBatchDelete
} from '@/api/specialMg'
export default {
  components: {},
  data() {
    return {
      form: {
        pageSize: 10,
        currentPage: 1
      },
      total: 0,
      ruleForm: {
        id: '',
        name: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '0px',
      activeName: 'first',
      tableData: [],
      thematicData: []
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
    this.getThematicFacade()
    this.getdata()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changedata()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changedata() {
      addOrUpdate({ ...this.ruleForm }).then(res => {
        this.$message({
          message: `${this.ruleForm.id ? '编辑' : '新增'}成功`,
          type: 'success'
        })
        this.getdata()
        this.dialogFormVisible = false
      })
    },
    getThematicFacade() {
      thematicFacade().then(res => {
        this.thematicData = res.object.filter(item => {
          item.imgUrl = item.imgUrl.split(';')
          return item.idStr
        })
        // console.log(this.thematicData)
      })
    },
    getdata() {
      facade({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
      })
    },
    handleSizeChange(value) {
      this.form.pageSize = value
    },
    handleCurrentChange(value) {
      this.form.currentPage = value
    },
    Thematic(value = {}) {
      this.$router.push({
        path: 'specialMgadd',
        query: {
          id: value.idStr
        }
      })
    },
    changeThematicBatchDelete(value) {
      thematicBatchDelete({ id: value.idStr }).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getThematicFacade()
      })
    },
    changeBatchDelete(value) {
      batchDelete({ id: value.idStr }).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getdata()
      })
    },
    open(value, flag) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (flag) {
            this.changeThematicBatchDelete(value)
          } else {
            this.changeBatchDelete(value)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleClick(row = {}) {
      if (row.idStr) {
        option_detail({ id: row.idStr }).then(res => {
          this.ruleForm.id = res.object.idStr
          this.ruleForm.name = res.object.name
        })
      } else {
        this.ruleForm = {}
      }
      this.dialogFormVisible = true
    }
  }
}
</script>
<style scoped>
.specialMg {
  padding: 20px;
}
.addbutton {
  float: right;
  margin-bottom: 20px;
}
.el-pagination {
  text-align: right;
  margin: 20px 0;
}
.imglist{
  display: flex;
  width: 50%;
  margin: 0 auto;
}
</style>
