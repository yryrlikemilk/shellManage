<template>
  <div class="userInfoCoupon">
    <el-row>
      <el-col :span="24">
        <h4>实名信息</h4>
        <div class="userInfoCoupon-user">
          <p>
            姓名：
            <span class="userInfoCoupon-user-data">{{ verifInformation.realName }}</span>
          </p>
          <p>
            身份证号：
            <span class="userInfoCoupon-user-data">{{ verifInformation.identityNum }}</span>
          </p>
          <p>
            人脸：
            <span class="userInfoCoupon-user-data"><el-link :href="verifInformation.faceImgPath" type="primary">点击查看图片</el-link></span>
          </p>
          <p>
            认证时间：
            <span class="userInfoCoupon-user-data">{{ verifInformation.faceTimeStr }}</span>
          </p>
          <p>
            支付方式：
            <span class="userInfoCoupon-user-data">{{ verifInformation.payForVidTypeStr }}</span>
          </p>
          <p>
            支付时间：
            <span class="userInfoCoupon-user-data">{{ verifInformation.payForVidTime }}</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h4>用户信息</h4>
        <div class="userInfoCoupon-user">
          <p>
            会员等级：
            <span class="userInfoCoupon-user-data">{{ userMap.userShellLevelName }}</span>
          </p>
          <p>
            复投等级：
            <span class="userInfoCoupon-user-data">{{ userMap.userReinvestmentLevelName }}</span>
          </p>
          <p>
            等贝壳：
            <span class="userInfoCoupon-user-data">{{ userMap.userShellGradeName }}</span>
          </p>
          <p>
            星级达人：
            <span class="userInfoCoupon-user-data">{{ userMap.userTalentLevelName }}</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h4>享受福利</h4>
        <div class="userInfoCoupon-user">
          <p>
            等贝壳打赏手续费：
            <span class="userInfoCoupon-user-data">{{ enjoyTheBenefitsMap.rewardRate * 100 }}</span>
            <span>%</span>
          </p>
          <p>
            交易手续费：
            <span class="userInfoCoupon-user-data">{{ enjoyTheBenefitsMap.transactionRate }}</span>
            <span>%</span>
          </p>
          <p>
            全球交易分红：
            <span class="userInfoCoupon-user-data">{{ enjoyTheBenefitsMap.wordTransactionRate }}</span>
            <span>%</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h4>团队信息</h4>
        <div class="userInfoCoupon-user">
          <p>
            团队人数：
            <span class="userInfoCoupon-user-data">{{ teamMap.teamFansNum }}</span>
            <span>人</span>
          </p>
          <p>
            实名人数：
            <span class="userInfoCoupon-user-data">{{ teamMap.teamEffectiveNum }}</span>
            <span>人</span>
          </p>
          <p>
            活跃度：
            <span class="userInfoCoupon-user-data">{{ teamMap.activity }}</span>
          </p>
          <p>
            直推人数：
            <span class="userInfoCoupon-user-data">{{ teamMap.firstLevelFansNum }}</span>
            <span>人</span>
          </p>
          <p>
            直推实名人数：
            <span class="userInfoCoupon-user-data">{{ teamMap.firstLevelRealnameNum }}</span>
            <span>人</span>
          </p>
          <p>
            直推活跃度：
            <span class="userInfoCoupon-user-data">{{ teamMap.firstActivity }}</span>
          </p>
          <p>
            大区人数：
            <span class="userInfoCoupon-user-data">{{ teamMap.fansNum }}</span>
            <span>人</span>
          </p>
          <p>
            大区实名人数：
            <span class="userInfoCoupon-user-data">{{ teamMap.effectiveNum }}</span>
            <span>人</span>
          </p>
          <p>
            大区活跃度：
            <span class="userInfoCoupon-user-data">{{ teamMap.bigActivity }}</span>
          </p>
          <p>
            小区人数：
            <span class="userInfoCoupon-user-data">{{ teamMap.smallFansNum }}</span>
            <span>人</span>
          </p>
          <p>
            小区实名人数：
            <span class="userInfoCoupon-user-data">{{ teamMap.smallEffectiveNum }}</span>
            <span>人</span>
          </p>
          <p>
            小区活跃度：
            <span class="userInfoCoupon-user-data">{{ teamMap.smallActivity }}</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="teamtitle">
          <h4>团队列表</h4> <p v-if="verifInformation.parentId">上级用户：<span @click="jumpuser(verifInformation.parentId)">{{ verifInformation.parentUserName }}(ID:{{ verifInformation.parentId }})</span></p>
        </div>
        <div class="userInfoCoupon-user">
          <el-table :data="tableData" border style="width: 100%" height="300">
            <el-table-column prop="date" label="一级用户" align="center" width="190">
              <template slot-scope="scope">
                <el-button type="text" @click="myheeler(scope.row.userIdStr)">{{ scope.row.userIdStr }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="verifiedName" label="是否实名" align="center" />
            <el-table-column prop="userShellLevelName" label="会员等级" align="center" />
            <el-table-column prop="userReinvestmentLevelName" label="复投等级" align="center" />
            <el-table-column prop="userShellGradeName" label="等贝壳等级" align="center" />
            <el-table-column prop="userTalentLevelName" label="星级达人" align="center" />
            <el-table-column prop="zhiShuNum" label="下级用户" align="center" />
            <el-table-column prop="totalNum" label="团队人数" align="center" />
            <el-table-column prop="activity" label="活跃度" align="center" />
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
import { jump } from '@/utils/userInfo'
import { teamShellLevel } from '@/api/userMg'
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
        idStr: this.id,
        pageSize: 10,
        currentPage: 1

      },
      total: 0,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      verifInformation: {},
      userMap: {},
      enjoyTheBenefitsMap: {},
      teamMap: {}
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.getdata()
  },
  methods: {
    jumpuser(val) {
      jump(val)
    },
    getdata() {
      teamShellLevel({ ...this.form }).then(res => {
        const { verifInformation, teamMap, userMap, teamPager, enjoyTheBenefitsMap } = res.object
        this.verifInformation = verifInformation
        this.teamMap = teamMap
        this.userMap = userMap
        this.tableData = teamPager.list
        this.total = teamPager.total
        this.enjoyTheBenefitsMap = enjoyTheBenefitsMap
      })
    },
    myheeler(val) {
      this.$router.push({
        path: '/userManage/userInfo',
        query: {
          id: val
        }
      })
      window.location.reload()
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
.teamtitle{
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p{
    color: #606266;
    margin-left: 50px;
    span{
      color: #409eff;
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  float: right;
}
.userInfoCoupon {
  &-user {
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 30%;
      float: left;
      padding: 20px;
      font-size: 14px;
    }
    &-data {
      padding: 0 10px;
      color: #409eff;
    }
  }
}
</style>
