<template>
  <div class="PearlDetail">
    <breadnar title="珍珠明细" />
    <div class="PearlDetail-header">
      <el-row>
        <el-col :span="8">
          <p>状态：</p>
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <p>类型：</p>
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <p>时间：</p>
          <el-date-picker
            v-model="timeformat"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-col>
      </el-row>
      <el-row class="twoselect">
        <el-col :span="10">
          <el-input v-model="form.vague" placeholder="用户昵称/用户ID/手机号" />
          <el-button type="primary" icon="el-icon-search" style="margin-left:10px" @click="getdata">搜索</el-button>
          <el-button type="primary" @click="reset">全部重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="rawAddTimeStr" label="时间" align="center" />
        <el-table-column prop="userId" label="任务拥有人" align="center">
          <template slot-scope="scope">
            <span class="userId" @click="jump(scope.row.userIdStr)">{{ scope.row.userIdStr }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="类型" align="center" />
        <el-table-column prop="taskName" label="任务名" align="center" />
        <el-table-column prop="freezePearlNumTotal" label="冻结珍珠（颗）" align="center" />
        <el-table-column prop="releaseCycle" label="释放周期" align="center" />
        <el-table-column prop="releaseIndex" label="当前释放" align="center" />
        <el-table-column prop="statusName" label="状态" align="center" />
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="getuserPearlFreezeInfo(scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-dialog
      :title="title"
      :visible.sync="dialogTableVisible"
    >
      <div class="dialogtitle">
        <p>任务：{{ userPearlFreeze.taskName }}</p>
        <p>冻结珍珠：{{ userPearlFreeze.freezePearlNumTotal }}</p>
        <p>冻结周期：{{ userPearlFreeze.releaseIndex }}/{{ userPearlFreeze.releaseCycle }}</p>
        <p>冻结时间：{{ userPearlFreeze.rawAddTimeStr }}</p>
        <p>状态：{{ userPearlFreeze.statusName }}</p>
      </div>
      <el-table :data="gridData" border>
        <el-table-column property="seq" label="序列" width="150" align="center" />
        <el-table-column property="taskDayStr" label="任务时间" width="200" align="center" />
        <el-table-column property="releasePearlNum" label="释放珍珠" align="center" />
        <el-table-column property="statusName" label="状态" align="center" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { userPearlFreezeInfo } from '@/api/userMg'
import { pearlTask } from '@/api/pearltask'
export default {
  components: {},
  data() {
    return {
      title: '',
      total: 0,
      timeformat: [],
      form: {
        currentPage: 1,
        pageSize: 10,
        rawAddTimeMin: '',
        rawAddTimeMan: '',
        type: '',
        status: '',
        vague: ''
      },
      formLabelWidth: '120px',
      gridData: [],
      dialogTableVisible: false,
      input: '',
      options: [
        { value: '0', label: '结束' },
        { value: '1', label: '进行中' }
      ],
      options1: [
        { value: '1', label: '复投' },
        { value: '2', label: '赠送' }
      ],
      value: '',
      currentPage2: 1,
      tableData: [],
      value1: '',
      userPearlFreeze: {}
    }
  },
  computed: {},
  watch: {
    'form.status'() {
      this.getdata()
    },
    'form.type'() {
      this.getdata()
    },
    timeformat(val) {
      if (val === null) { val = new Array(2) }
      [this.form.rawAddTimeMin, this.form.rawAddTimeMan] = val
      this.getdata()
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    getuserPearlFreezeInfo(val) {
      userPearlFreezeInfo({ idStr: val.idStr }).then(res => {
        const { userPearlFreeze, detailList } = res.object
        this.gridData = detailList.object
        this.userPearlFreeze = userPearlFreeze
      })
      this.title = `用户：${val.idStr}`
      this.dialogTableVisible = true
    },
    reset() {
      location.reload()
    },
    jump(val) {
      this.$router.push({
        path: '/userManage/userInfo',
        query: {
          id: val
        }
      })
    },
    getdata() {
      pearlTask({ ...this.form }).then(res => {
        const { total, list } = res.object.pageForFreezePearl
        this.tableData = list
        this.total = total
      })
    },
    deleteRow(val) {
      this.dialogTableVisible = true
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
<style lang='scss' scoped>
.PearlDetail {
  padding: 20px;
  &-search {
    margin: 10px 0;
    display: flex;
    font-size: 14px;
    align-items: center;
  }
  &-header {
    .el-row {
      .el-col {
        white-space: nowrap;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }
}
.el-pagination {
  // float:right;
  text-align: right;
  margin-top: 20px;
}
.dialogtitle{
  display: flex;
  p{
    margin-right: 20px;
  }

  div{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right:30px;
  padding-bottom: 10px;
  }
}
.userId{
  color: #409eff;
  cursor: pointer;
}
</style>
