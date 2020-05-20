<template>
  <div class="columnMg">
    <breadnar title="专栏管理" />
    <el-button class="addbutton" @click="handleClick()">新增</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="sequence"
        label="排序"
      />
      <el-table-column
        prop="imgUrl"
        label="图标"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt="" width="80%">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
      />
      <el-table-column
        prop="typeName"
        label="类型"
        align="center"
      />
      <el-table-column
        prop="province"
        label="设置"
        align="center"
        min-width="200"
      >
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.zoneSpreadCategorylist " :key="index">
            <span v-if="item.mallCatgoryName">{{ item.mallCodeName }}：{{ item.mallCatgoryName }}</span>
          </p>
          <p v-if="scope.row.externalUrl">链接地址：{{ scope.row.externalUrl }}</p>
          <p v-if="scope.row.type==='1'">内部跳转页面：{{ scope.row.mallCodeName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
      />
      <el-table-column
        prop="statusName"
        label="状态"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row.idStr)">编辑</el-button>
          <el-button type="text" size="small" @click="open(scope.row.idStr)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { facade, batchDelete } from '@/api/columnMg'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    open(value) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletedata(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deletedata(value) {
      batchDelete({ id: value }).then(res => {
        this.getdata()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      })
    },
    handleClick(value) {
      this.$router.push({
        path: 'columnMgadd',
        query: {
          id: value
        }
      })
    },
    getdata() {
      facade().then(res => {
        this.tableData = res.object
      })
    }
  }
}
</script>
<style scoped>
.columnMg{
  padding: 20px;
}
.addbutton{
  float: right;
  margin-bottom: 15px;
}
</style>
