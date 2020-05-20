<template>
  <div class="userInfoCoupon">
    <el-row>
      <el-col :span="24">
        <h4>用户信息</h4>
        <div class="userInfoCoupon-user">
          <p>用户等级： <span class="userInfoCoupon-user-data">{{ userMap.userCouponLevelName }}</span></p>
          <p>账户余额： <span class="userInfoCoupon-user-data">{{ userMap.balance }}</span><span>元</span></p>
          <p>已提现： <span class="userInfoCoupon-user-data">{{ userMap.withdrawAmount }}</span><span>元</span></p>
          <p>累计收益： <span class="userInfoCoupon-user-data">{{ userMap.incomeAmount }}</span><span>元</span></p>
          <p>个人订单数： <span class="userInfoCoupon-user-data">{{ userMap.userOrderNum }}</span><span>单</span></p>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <h4>享受福利</h4>
        <div class="userInfoCoupon-user">
          <p>自购佣金： <span class="userInfoCoupon-user-data">VIP</span><span>%</span></p>
          <p>享受一级VIP佣金： <span class="userInfoCoupon-user-data">1000.00</span><span>%</span></p>
          <p>享受二级VIP佣金： <span class="userInfoCoupon-user-data">1212</span><span>%</span></p>
          <p>二级外VIP佣金： <span class="userInfoCoupon-user-data">111</span><span>%</span></p>
          <p>一级掌柜无限极其团队奖励群众： <span class="userInfoCoupon-user-data">111</span><span>%</span></p>
          <p>一级高级展柜其团队奖励权重： <span class="userInfoCoupon-user-data">VIP</span><span>%</span></p>
          <p>高级掌柜分红： <span class="userInfoCoupon-user-data">1000.00</span><span>%</span></p>
          <p>市级合伙人： <span class="userInfoCoupon-user-data">1212</span><span>%</span></p>
        </div>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="24">
        <h4>团队信息</h4>
        <div class="userInfoCoupon-user">
          <p>团队粉丝： <span class="userInfoCoupon-user-data">{{ welfareMap.teamFansNum }}</span><span>人</span></p>
          <p>有效用户： <span class="userInfoCoupon-user-data">{{ welfareMap.teamEffectiveNum }}</span><span>人</span></p>
          <p>团队订单数： <span class="userInfoCoupon-user-data">{{ welfareMap.teamOrderNum }}</span><span>单</span></p>
          <p>一级粉丝： <span class="userInfoCoupon-user-data">{{ welfareMap.firstLevelFansNum }}</span><span>人</span></p>
          <p>一级有效用户： <span class="userInfoCoupon-user-data">{{ welfareMap.firstLevelEffectiveNum }}</span><span>人</span></p>
          <p>一级粉丝订单数： <span class="userInfoCoupon-user-data">{{ welfareMap.firstLevelOrderNum }}</span><span>单</span></p>
          <p>二级粉丝： <span class="userInfoCoupon-user-data">{{ welfareMap.secondaryFansNum }}</span><span>人</span></p>
          <p>二级有效用户： <span class="userInfoCoupon-user-data">{{ welfareMap.secondaryEffectiveNum }}</span><span>人</span></p>
          <p>二级粉丝订单数： <span class="userInfoCoupon-user-data">{{ welfareMap.secondaryOrderNum }}</span><span>单</span></p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="teamlist-title">
          <h4>团队列表</h4>
          <p @click="userInforeload(parentMap.parentId)">上级用户：<span>{{ parentMap.parentUserName }}</span><span>(ID：{{ parentMap.parentId }}) </span> </p>
        </div>

        <div class="userInfoCoupon-user">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="userIdStr"
              label="一级用户"
              align="center"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.userIdStr" class="userIdStr" @click="userInforeload(scope.row.userIdStr)">{{ scope.row.userIdStr }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="valid"
              label="有效状态"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.valid==='0'" style="color:red">无效</span>
                <span v-if="scope.row.valid==='1'" style="color:#67C23A">有效</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="userCouponLevelName"
              label="用户等级"
              align="center"
            />
            <el-table-column
              prop="firstLevelFansNum"
              label="下级用户"
              align="center"
            />
            <el-table-column
              prop="teamFansNum"
              label="团队人数"
              align="center"
            />
            <el-table-column
              prop="teamOrderNum"
              label="订单数"
              align="center"
            />
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Coupon } from '@/api/userMg'
export default {
  components: {},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        pageSize: 10,
        currentPage: 1
      },
      fromdata: {},
      parentMap: {},
      welfareMap: {},
      userMap: {},
      teamPager: {},
      tableData: []
    }
  },
  computed: {},
  watch: {
    form: {
      handler() {
        this.getdata()
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    userInforeload(value) {
      this.$router.push({
        path: '/userManage/userInfo',
        query: {
          id: value
        }
      })
      location.reload()
    },
    getdata() {
      Coupon({ idStr: this.id, ...this.form }).then(res => {
        this.parentMap = res.parentMap
        this.welfareMap = res.welfareMap
        this.userMap = res.userMap
        this.tableData = res.teamPager.list
        this.total = res.teamPager.total
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
<style lang='scss' scoped>
.teamlist{
  &-title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p{
      margin-left: 30px;
      span{
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
.el-pagination{
  float:right;
  margin-top: 20px;
}
.userInfoCoupon{
  &-user{
    .userIdStr{
      cursor: pointer;
      color: #409eff;
      width: 100%;
    }
    p{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 30%;
      float: left;
      padding: 20px;
      font-size: 14px;
    }
    &-data{
      padding: 0 10px;
      color: #409eff;
    }
  }
}
</style>
