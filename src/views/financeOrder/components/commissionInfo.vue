<template>
  <div class="orderInfo">
    <breadnar title="佣金明细" title1="佣金详情" />
    <div class="orderInfo-list">
      <infolist :title-open="true" title="订单信息" title1="订单金额" content1="100.00元" title2="推广用户" content2="用户：xxxx（123XXX）" title3="实际返利" content3="8.40元">
        <template slot="title">
          <div class="orderInfo-list-title">
            <div class="orderInfo-list-title-left">
              <p>订单号：1001010291</p>
              <el-button size="small">查看订单详情</el-button>
            </div>
            <div class="orderInfo-list-title-right">
              <p>状态： <span style="color:red">待结算</span></p>
            </div>
          </div>
        </template>
      </infolist>
      <infolist title1="商城返利比例" content1="10%（10.00元）" title2="用户等级" content2="VIP" title3="团队佣金" content3="8.40元" />
      <infolist title1="平台返佣比例" content1="70%（7.00元）" title2="基础佣金" content2="10元" title3="分红金额" content3="0.31元" />
      <infolist title1="基础佣金系数" content1="1.871" title2="平台补贴" content2="1.40元（20%）" title3="平台剩余收益" content3="0.31元" />
    </div>
    <div class="orderInfo-table">
      <fenggeline title="用户归属及佣金计算" />
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="返佣用户"
          width="180"
        />
        <el-table-column
          prop="name"
          label="用户等级"
          width="180"
        />
        <el-table-column
          prop="address"
          label="享受佣金权限"
        />
        <el-table-column
          prop="address"
          label="预估佣金"
        />
      </el-table>
    </div>
    <div class="orderInfo-table">
      <fenggeline title="分红用户" />
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="分红用户"
          width="180"
        />
        <el-table-column
          prop="name"
          label="分红方式"
          width="180"
        />
        <el-table-column
          prop="address"
          label="平分分红比例"
        />
        <el-table-column
          prop="address"
          label="预估佣金"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import fenggeline from '@/components/TheDivider/index'
import infolist from '@/views/coupon/components/infoList'
export default {
  components: {
    infolist,
    fenggeline
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.orderInfo{
  padding: 20px;
  &-table{
    margin-top: 30px;
    .el-table{
      margin-top: 20px;
    }
  }
  &-list{
    margin-top: 50px;
    &-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-left{
        display: flex;
        align-items: center;
        .el-button{
          margin-left: 10px;
        }
      }
      &-right{

      }
    }
    &-content1{
      display: flex;
      p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .el-link{
        margin-left: 10px;
      }
    }
  }
  .el-steps{
    margin-top: 50px;
  }
}
</style>
