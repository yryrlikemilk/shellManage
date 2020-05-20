<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="rawAddTimeStr"
        label="上传时间"
        align="center"
      />
      <el-table-column
        prop="versionCode"
        align="center"
        label="版本号"
      />
      <el-table-column
        prop="describeInfo"
        align="center"
        label="版本描述"
      />
      <el-table-column
        prop="addPeople"
        align="center"
        label="添加人"
      />
      <!-- <el-table-column
        prop="apk"
        label="更新包"
        align="center"
      >
        <template slot-scope="scope">
          <el-link type="primary" :href="scope.row.apk">点击下载</el-link>
        </template>
      </el-table-column> -->
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
</template>

<script>
import { versionList } from '@/api/versionMg'
export default {
  components: {},
  data() {
    return {
      total: 0,
      currentPage2: 1,
      form: {
        type: '2',
        currentPage: 1,
        pageSize: 10
      },
      tableData: []
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
      versionList({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getdata()
    },
    handleCurrentChange(val) {
      this.form.currentPage = val
      this.getdata()
    },
    handleClick(row) {
      this.$emit('userinfo', row)
    }
  }
}
</script>
<style scoped>
.el-pagination{
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
