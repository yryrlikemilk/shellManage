<template>
  <div class="orderInfo">
    <breadnar title="订单明细" title1="订单详情" />
    <el-steps :active="2" align-center process-status="wait">
      <el-step title="已付款" icon="el-icon-location" description="这是一段很长很长很长的描述性文字">
        <template slot="description">
          <p>下单完成支付</p>
          <p>1970-01-01 08:00:00 </p>
        </template>
      </el-step>
      <el-step title="已完成" icon="el-icon-location" description="这是一段很长很长很长的描述性文字">
        <template slot="description">
          <p>订单已完成收货</p>
          <p>1970-01-01 08:00:00 </p>
        </template>
      </el-step>
      <el-step title="已结算" icon="el-icon-location" description="这是一段很长很长很长的描述性文字">
        <template slot="description">
          <p>等待结算</p>
          <!-- <p>1970-01-01 08:00:00 </p> -->
        </template>
      </el-step>
    </el-steps>
    <div class="orderInfo-list">
      <infolist :title-open="true" title="订单信息" title1="订单号" content1="订单号" title2="店铺" content2="订单号" link-content2="1231" link-name2="店铺链接" title3="订单金额" content3="订单号" />
      <infolist title1="平台" content1="订单号" title2="推广用户" content2="订单号" link-content2="1231" link-name2="店铺链接" title3="商城返佣比例" content3="订单号" />
      <infolist title1="商品名称" content1="订单号" title2="返佣" content2="" link-content2="1231" link-name2="查看返佣明细" title3="" content3="">
        <template slot="content1">
          <div class="orderInfo-list-content1">
            <p>银色星芒刺绣网纱底裤银色星芒刺绣网纱底裤</p>
            <el-link type="primary" href="#">商品详情</el-link>
            <el-link type="primary" href="#">商品链接</el-link>
          </div>

        </template>
      </infolist>
    </div>
  </div>
</template>

<script>
import infolist from '@/views/coupon/components/infoList'
export default {
  components: {
    infolist
  },
  data() {
    return {
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
  &-list{
    margin-top: 50px;
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
