<template>
  <div>
    <el-button class="addbutton" @click="handleClick()">新增</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="idStr"
        label="ID"
      />
      <el-table-column
        prop="name"
        label="类别名称"
        align="center"
      />
      <el-table-column
        prop="keywords"
        label="类别关键词"
        align="center"
      />
      <el-table-column
        prop="rawAddTime"
        label="更新时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.rawAddTime|settime }}</span>
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
    <founddialog v-if="dialogFormVisible" v-model="dialogFormVisible" :aditerdata="form" />
  </div>
</template>

<script>
import founddialog from './founddialog'
import { findType } from '@/api/discoverCommodity'
import { parseTime } from '@/utils/index'
export default {
  filters: {
    settime(d) {
      return parseTime(d)
    }
  },
  components: {
    founddialog
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {

      },
      formLabelWidth: '120px',
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
      findType().then(res => {
        this.tableData = res.object
      })
    },
    handleClick(row = {}) {
      var { idStr: id, name, keywords: times } = row
      if (times) {
        this.form = { id, name, times: [] }
        times.split(';').forEach(element => {
          this.form.times.push({ value: element })
        })
      } else {
        this.form = { id, name, times: [{ value: '' }] }
      }

      this.dialogFormVisible = true
    }
  }
}
</script>
<style scoped>
.addbutton{
  float: right;
  margin-bottom: 15px;
}
</style>
