<template>
  <div class="PearlDetail">
    <breadnar title="视频打赏" />
    <div class="PearlDetail-header">
      <el-row>
        <el-col :span="8">
          <p>状态：</p>
          <el-select v-model="value" placeholder="请选择">
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
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <p>时间：</p>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-col>
      </el-row>
      <el-row class="twoselect">
        <el-col :span="10">
          <el-input v-model="input" placeholder="实名ID/视频描述/用户昵称/用户ID" />
          <el-button type="primary" icon="el-icon-search" style="margin-left:10px">搜索</el-button>
          <el-button type="primary">全部重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="视频ID" align="center" />
        <el-table-column prop="name" label="视频描述" align="center" />
        <el-table-column prop="name" label="视频发布人" align="center" />
        <el-table-column prop="date" label="时间" align="center" />
        <el-table-column prop="name" label="打赏人" align="center" />
        <el-table-column prop="name" label="打赏珍珠数（颗）" align="center" />
        <el-table-column prop="date" label="手续费" align="center" />
        <el-table-column prop="name" label="发布人收入珍珠（颗）" width="180" align="center" />
      </el-table>
    </div>
    <el-pagination
      background
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next,total"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formLabelWidth: '120px',
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      input: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      currentPage2: 1,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      value1: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteRow() {
      this.dialogTableVisible = true
    },
    handleSizeChange() {},
    handleCurrentChange() {}
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

  div{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right:30px;
  padding-bottom: 10px;
  }
}
</style>
