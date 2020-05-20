<template>
  <div class="orderInfo">
    <breadnar title="订单明细" />
    <div class="firstCearch">
      <div>
        <svg-icon icon-class="shaixuan" class-name="shaixuan" />
        <span>筛选</span>
      </div>
      <el-button size="mini" @click="show2 = !show2">{{ show2?'收起':'展开' }}</el-button>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="show2" class="transition-box">
        <div class="search">
          <classify :classify-data="table1" title="订单状态：" />
        </div>
        <div class="search">
          <classify :classify-data="table1" :title="'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+'商城：'" />
        </div>
        <div class="commodity">
          <classify title="订单时间：">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button type="primary" size="medium" style="margin-left:10px">确定</el-button>
          </classify>
        </div>
        <div class="commodity">
          <classify title="完成时间：">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button type="primary" size="medium" style="margin-left:10px">确定</el-button>
          </classify>
        </div>
        <div class="commodity">
          <classify title="结算时间：">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button type="primary" size="medium" style="margin-left:10px">确定</el-button>
          </classify>
        </div>
        <div class="searchInfo">
          <span class="searchInfo-title">
            搜索：
          </span>
          <el-input v-model="input" class="searchInput" placeholder="商品名称" />
          <el-button type="primary" size="medium" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" size="medium">
            <svg-icon icon-class="shaixuan" />
            筛选
          </el-button>
          <el-button type="primary" size="medium">全部重置</el-button>
        </div>
      </div>
    </transition>
    <div class="orderInfo-number">
      <!-- <p>• 订单数：{{statistics.}}</p>
      <p>• 已完成：{{statistics.}}</p>
      <p>• 已结算：{{statistics.}}</p> -->
    </div>
    <div>
      <div class="orderInfo-table">
        <el-button size="medium">导出</el-button>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        />
        <el-table-column
          prop="date"
          label="订单号"
          align="center"
          width="180"
        />
        <el-table-column
          prop="name"
          label="商品信息"
          align="center"
          width="180"
        />
        <el-table-column
          prop="address"
          label="订单金额"
          align="center"
        />
        <el-table-column
          prop="address"
          label="推广用户"
          align="center"
        />
        <el-table-column
          prop="address"
          label="时间"
          align="center"
        />
        <el-table-column
          prop="address"
          label="订单状态"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope">已付款</span>
            <span v-else-if="scope">已完成</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope"
              type="text"
              size="small"
              @click="test"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import { facade } from '@/api/orderInfo'
import { pickerOptions } from '@/utils/getDate'
import classify from '@/views/coupon/components/classify'
export default {
  components: {
    classify
  },
  data() {
    return {
      tableData: [],
      statistics: {},
      input: '',
      total: 0,
      pickerOptions,
      value1: '',
      value2: '',
      show2: false,
      table1: [
        { name: '全部' },
        { name: '已付款' },
        { name: '已完成' },
        { name: '已结算' },
        { name: '已失效' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getdata() {
      facade({}).then(res => {
        this.tableData = res.object.page.list
        this.total = res.object.page.total
        this.statistics = res.object.statistics
      })
    },
    test() {
      this.$router.push('orderdata')
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang='scss' scoped>
.el-pagination{
  text-align: right;
  margin-top: 20px;
}
.searchInput{
  width: 400px;
  margin-right: 10px;
}
.searchInfo{
  padding: 10px 0;
  border-bottom: solid 2px #f2f2f2;
  display: flex;
  white-space: nowrap;
  align-items: center;
  &-title{
    text-indent: 28px;
    font-size: 14px;
  }
}
.commodity{
  display: flex;
  align-items: center;
}
.firstCearch{
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  align-items: center;
  margin-top: 10px;
  padding: 5px 5px;
}
.orderInfo{
  padding: 20px;
  &-table{
    text-align: right;
    padding: 10px 0;
  }
  &-number{
    display: flex;
    margin-top: 10px;
    p{
      margin-right: 20px;
      color: #409eff;
      font-size: 14px;
    }
  }
}
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  color: #000;
  padding: 10px 0px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
