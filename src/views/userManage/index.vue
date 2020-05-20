<template>
  <div class="usermanage">
    <screen v-model="show2">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.userCouponLevel" class="selecty" title="优惠券等级：" :options="selectdata.coupon" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.valid" class="selecty" title="是否有效：" :options="selectdata.isvalid" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.verified" class="selecty" title="实名认证：" :options="selectdata.isverified" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.userShellLevel" class="selecty" title="贝壳等级：" :options="selectdata.userShellLevel" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.userShellGrade" class="selecty" title="等贝壳：" :options="selectdata.userShellGrade" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.userTalentLevel" class="selecty" title="海洋星达人：" :options="selectdata.userTalentLevel" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.status" class="selecty" title="账号状态：" :options="selectdata.accountvalid" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.userReinvestmentLevel" class="selecty" title="复投等级：" :options="selectdata.userReinvestmentLevel" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <cityselect v-model="form.areaIdPath" class="selecty" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.couponsType" class="selecty" title="优惠券合伙人：" :options="selectdata.couponPartner" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="4">
          <selecty v-model="form.shellType" class="selecty" title="贝壳合伙人：" :options="selectdata.shellPartner" />
        </el-col>
      </el-row>
      <el-row :gutter="10" class="gutterline">
        <el-col :xs="12" :sm="12" :md="7" :lg="7" :xl="6">
          <doubleinput v-model="acvitity" class="selecty" title="活跃度数值：" />
        </el-col>
        <el-col :xs="12" :sm="12" :md="7" :lg="7" :xl="6">
          <doubleinput v-model="pearlNum" class="selecty" title="珍珠数值：" />
        </el-col>
        <el-col :xs="12" :sm="12" :md="7" :lg="7" :xl="6" class="selecty">
          <p>注册时间：</p>
          <el-date-picker
            v-model="registeredTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          />
        </el-col>
        <el-col :xs="12" :sm="12" :md="3" :lg="3" :xl="6" class="selecty">
          <el-button type="primary" @click="getUserList">
            <svg-icon icon-class="shaixuan" />筛选
          </el-button>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        class="row-bg"
        style="padding-bottom: 10px;border-bottom: 2px solid #f2f2f2;"
      >
        <el-col :span="10" class="selecty" style="margin-top:10px">
          <el-input v-model="input" placeholder="用户昵称/用户ID/手机号/姓名" class="input" />
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">全部重置</el-button>
        </el-col>
      </el-row>
    </screen>
    <div>
      <div class="tablelist">
        <p>用户：{{ total }}</p>
      </div>
      <div>
        <el-table
          v-loading="loading"
          :data="tableData"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="idStr"
            label="ID"
            align="center"
            width="180"
          />
          <el-table-column
            prop="wechatId"
            label="微信号"
            align="center"
            width="170"
          />
          <el-table-column
            prop="nickName"
            label="昵称"
            align="center"
          />
          <el-table-column
            prop="mobile"
            label="手机号"
            align="center"
            width="130"
          />
          <el-table-column
            prop="areaNamePath"
            label="地区"
            align="center"
            width="180"
          />
          <el-table-column
            prop="registeredTime"
            label="注册时间 "
            align="center"
            width="155"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.registeredTime">{{ parstime(scope.row.registeredTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="优惠券合伙人"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.userPartnerList[0]&&scope.row.userPartnerList[0].type==='2'">{{ scope.row.userPartnerList[0].areaName }}</span>
              <span v-if="scope.row.userPartnerList[1]&&scope.row.userPartnerList[1].type==='2'">{{ scope.row.userPartnerList[1].areaName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="贝壳合伙人 "
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.userPartnerList[0]&&scope.row.userPartnerList[0].type==='1'">{{ scope.row.userPartnerList[0].areaName }}</span>
              <span v-if="scope.row.userPartnerList[1]&&scope.row.userPartnerList[1].type==='1'">{{ scope.row.userPartnerList[1].areaName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userTeamInfo.userCouponLevelName"
            label="优惠券等级 "
            align="center"
            width="70"
          />
          <el-table-column
            prop="validName"
            label="是否有效"
            align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.valid==='1'" style="color:#67C23A">有效</span>
              <span v-else style="color:red">无效</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="verified"
            label="实名认证 "
            align="center"
            width="70"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.verified==='1'" style="color:#67C23A">已认证</span>
              <span v-else style="color:red">未认证</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="实名姓名"
            align="center"
          />
          <el-table-column
            prop="activity"
            label="活跃度"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.userTeamInfo.userActivity+scope.row.userTeamInfo.userAdditionActivity }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userAccount.pearlNum"
            label="拥有珍珠 "
            align="center"
          />
          <el-table-column
            prop="userTeamInfo.userShellGrade"
            label="等贝壳 "
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.userTeamInfo.userShellGrade==='-1'">未认证</span>
              <span v-else>{{ scope.row.userTeamInfo.userShellGrade }}等贝壳</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userTeamInfo.userShellLevelName"
            label="贝壳等级"
            align="center"
          />
          <el-table-column
            prop="userTeamInfo.userReinvestmentLevelName"
            label="复投等级"
            align="center"
          />
          <el-table-column
            prop="userTeamInfo.userTalentLevelName"
            label="达人"
            align="center"
          />
          <el-table-column
            prop="status"
            label="账号状态"
            align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status==='1'" style="color:#67C23A">有效</span>
              <span v-else style="color:red">禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <!-- <el-button type="text" size="small">编辑</el-button> -->
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
    </div>
  </div>
</template>

<script>

import { pickerOptions } from '@/utils/getDate'
import selectdata from './selectdata'
import screen from '@/components/screen/index'
import doubleinput from '@/components/Input/doubleInput'
import selecty from './components/index'
import cityselect from '@/components/selecty/cityselect'
import { userMgList } from '@/api/userMg'
// import { parseTime } from '@/utils/index'
export default {
  components: {
    screen,
    doubleinput,
    selecty,
    cityselect
  },
  filters: {
    // parseTime(val) {
    //   return parseTime(val)
    // }
  },
  data() {
    return {
      loading: false,
      acvitity: [],
      pearlNum: [],
      registeredTime: [],
      total: 0,
      form: {
        userCouponLevel: '',
        valid: '',
        verified: '',
        userShellLevel: '',
        userShellGrade: '',
        userTalentLevel: '',
        status: '',
        userReinvestmentLevel: '',
        areaIdPath: '',
        areaNamePath: '',
        couponsType: '',
        shellType: '',
        acvitityMin: '',
        acvitityMax: '',
        pearlNumMin: '',
        pearlNumMax: '',
        registeredTimeMin: '',
        registeredTimeMax: '',
        vague: '',
        pageSize: 10,
        totalRows: '',
        currentPage: 1
      },
      selectdata,
      tableData: [],
      input: '',
      value2: '',
      pickerOptions,
      test: [],
      show2: false,
      options: [],
      value: ''
    }
  },
  computed: {
    // parsetime(val) {
    //   return parseTime(val)
    // }
  },
  watch: {
    acvitity(val) {
      [this.form.acvitityMin, this.form.acvitityMax] = val
    },
    pearlNum(val) {
      [this.form.pearlNumMin, this.form.pearlNumMax] = val
    },
    registeredTime(val) {
      if (val === null) { val = new Array(2) }
      [this.form.registeredTimeMin, this.form.registeredTimeMax] = val
    }
  },
  created() {
  },
  mounted() {
    // this.getcity()
    this.getUserList()
  },
  methods: {
    // getcity() {
    //   cityTree().then(res => {
    //     this.options = res.object
    //   })
    // },
    // parsetime(val) {
    //   return parseTime(val)
    // },
    reset() {
      this.$router.go(0)
    },
    search() {
      this.form.vague = this.input
      this.getUserList()
      this.form.vague = ''
    },
    getUserList() {
      if (this.form.areaIdPath && typeof this.form.areaIdPath === 'object') {
        this.form.areaIdPath = this.form.areaIdPath.join('_')
      }
      this.loading = true
      userMgList({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.form.currentPage = val
      this.getUserList()
    },
    handleClick(row) {
      this.$router.push({
        path: 'userInfo',
        query: {
          id: row.idStr
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.el-pagination{
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.tablelist{
  font-size: 14px;
  padding: 10px;
}
.input {
  padding-right: 20px;
}
.gutterline {
  padding-bottom: 10px;
  border-bottom: 2px solid #f2f2f2;
}
.usermanage {
  padding: 0 20px 60px 20px;
    .selecty {
      margin-top: 20px;
      display: flex;
      font-size: 14px;
      white-space: nowrap;
      align-items: center;
    }

}
</style>
