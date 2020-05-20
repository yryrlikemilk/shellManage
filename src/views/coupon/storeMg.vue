<template>
  <div class="content">
    <div class="storeManage-title">
      <breadnar title="商城管理" />
    </div>
    <div class="storeManage-body">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="idStr" label="ID" align="center" />
        <el-table-column prop="name" label="商城" align="center" />
        <el-table-column label="每日商品更新时间" align="center" width="280">
          <template slot-scope="scope">
            <el-row :gutter="20">
              <el-col v-for="(item,index) in scope.row.timeList" :key="index" :span="8">
                <p>{{ item.updateTimeStr }}</p>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="baseCommissionRate" label="佣金设置" align="center">
          <template slot-scope="scope">
            <span>平台分佣比例：{{ scope.row.baseCommissionRate * 100 }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==='0'">无效</span>
            <span v-else>有效</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="footer">
      <el-pagination
        :current-page.sync="currentPage2"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        background
        layout="sizes, prev, pager, next,total"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>-->

    <storeDialog v-if="show" v-model="show" :formdata="formdata" />
  </div>
</template>

<script>
import { facade } from '@/api/storeMg'
import storeDialog from './components/storeDialog'
export default {
  components: {
    storeDialog
  },
  data() {
    return {
      currentPage2: 5,
      show: false,
      tableData: [],
      formdata: {}
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
      facade().then(res => {
        this.tableData = res.object
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleClick(row) {
      const { idStr: id, baseCommissionRate, code, name, timeList, status } = row
      this.formdata = { id, baseCommissionRate, code, name, timeList: [], status }
      timeList.forEach(element => {
        const { mallIdStr: mallId, updateTimeStr: updateTime } = element
        this.formdata.timeList.push({ mallId, updateTime })
      })
      this.show = true
    }
  }
}
</script>
<style lang='scss' scoped>
.storeManage {
  &-body {
    padding: 0 20px;
  }
  &-title {
    padding: 20px;
  }
}
.content {
  padding-bottom: 50px;
}
.footer {
  z-index: 100;
  position: fixed;
  bottom: 20px;
  right: 20px;

}
</style>
