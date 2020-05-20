<template>
  <div class="version">
    <breadnar title="账号管理" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="账号管理" name="first">
        <el-table
          :data="fileList"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="loginName"
            label="账号"
          />
          <el-table-column
            prop="roleName"
            label="角色"
          />
          <el-table-column
            prop="rawAddTimeStr"
            label="添加时间"
          />
          <el-table-column
            prop="isOpen"
            label="状态"
          />
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { facade } from '@/api/account'
export default {
  components: {

  },
  data() {
    return {
      form: {
        pageSize: 10,
        currentPage: 1
      },
      total: 0,
      fileList: [],
      input: '',
      radio2: '1',
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      },
      ruleForm: {
        name: ''
      },
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      facade({ ...this.form }).then(res => {
        this.fileList = res.object.list
        this.total = res.object.total
      })
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getdata()
    },
    handleCurrentChange(val) {
      this.form.currentPage = val
      this.getdata()
    }
  }
}
</script>
<style scoped>
.version {
  padding: 20px 20px 60px 20px;
  position: relative;
}
.addversion {
  position: absolute;
  top: 60px;
  right: 20px;
}
.radio {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.el-pagination{
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
