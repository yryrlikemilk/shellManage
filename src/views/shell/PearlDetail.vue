<template>
  <div class="PearlDetail">
    <breadnar title="珍珠明细" />
    <div class="PearlDetail-search">
      <p>时间：</p>
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="时间"
          align="center"
        />
        <el-table-column
          prop="name"
          label="市面总珍珠数"
          align="center"
        />
        <el-table-column
          prop="name"
          label="任务日产释放珍珠"
          align="center"
        />
        <el-table-column
          prop="date"
          label="任务复投失去珍珠"
          align="center"
        />
        <el-table-column
          prop="name"
          label="冻结中珍珠数"
          align="center"
        />
        <el-table-column
          prop="name"
          label="当日冻结珍珠"
          align="center"
        />
        <el-table-column
          prop="date"
          label="交易买入所得"
          align="center"
        />
        <el-table-column
          prop="name"
          label="交易卖出"
          align="center"
        />
        <el-table-column
          prop="name"
          label="等贝壳获得打赏珍珠"
          align="center"
        />
        <el-table-column
          prop="date"
          label="等贝壳打赏出珍珠"
          align="center"
        />
        <el-table-column
          prop="name"
          label="小视频获得打赏珍珠"
          align="center"
        />
        <el-table-column
          prop="name"
          label="小视频打赏出珍珠"
          align="center"
        />
        <el-table-column
          prop="name"
          label="分红"
          align="center"
        />
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
    <div class="PearlDetail-info">
      <p>今日市面总珍珠数=昨日总珍珠数+今日任务日常市场珍珠+今日交易买入+今日等别克获得打赏珍珠+今日小视频获得打赏珍珠+今日分红-今日复投任务失去珍珠-今日交易卖出珍珠-今日等贝壳打赏出珍珠-今日小视频打赏出珍珠</p>
    </div>
    <div class="PearlDetail-info">
      <p>• 市面总珍珠：当日所有用户账户的所有珍珠余额总和</p>
      <p>• 任务日产市场珍珠：当日通过任务释放的所有珍珠数总和</p>
      <p>• 任务复投失去珍珠：当日通过参与复投失去的珍珠是</p>
      <p>• 冻结中的珍珠数：当日还在冻结中的总珍珠数</p>
      <p>• 当日冻结珍珠数：通过当日产生的任务冻结的总珍珠数</p>
      <p>• 日交易买入所得：当日通过交易所得到的总珍珠数</p>
      <p>• 日交易卖出：当日通过交易卖出去失去的总珍珠数</p>
      <p>• 等贝壳获得打赏收入珍珠：当日获得下级等贝壳升级到账的总珍珠数</p>
      <p>• 等贝壳打赏出珍珠：当日所有升级等贝壳打赏出去的总珍珠数</p>
      <p>• 小视频获得打赏珍珠：当日通过小视频获得的打赏的总珍珠数</p>
      <p>• 小时打赏出珍珠：当日小视频打赏出去的总珍珠数</p>
      <p>• 分红：每日通过分红获得总珍珠数（城市合伙人、海洋星达人等）</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentPage2: 1,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      value1: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
<style lang='scss' scoped>
.PearlDetail{
  padding: 20px;
  &-search{
    margin: 10px 0;
    display: flex;
    font-size: 14px;
    align-items: center;
  }

  &-info{
    font-size: 13px;
    margin-top: 20px;
    p{
      padding-top:3px;
    }
  }
}
.el-pagination{
  // float:right;
  text-align: right;
  margin-top: 20px;
}
</style>
