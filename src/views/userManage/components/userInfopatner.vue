<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h4>贝壳合伙人</h4>
        <el-table
          :data="shellList"
          border
          style="width: 80%"
        >
          <el-table-column
            prop="areaNamePath"
            label="合伙城市/区县"
            align="center"
          />
          <el-table-column
            prop="validityEndName"
            label="有效期"
            align="center"
          />
          <el-table-column
            prop="members"
            label="会员人数"
            align="center"
          />
          <el-table-column
            prop="realNameNum"
            label="实名人数"
            align="center"
          />
          <el-table-column
            prop="transactionRate"
            label="全球每日交易分红"
            align="center"
          />
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h4>优惠券合伙人</h4>
        <el-table
          :data="cityList"
          border
          style="width: 80%"
        >
          <el-table-column
            prop="areaNamePath"
            label="合伙城市/区县"
            align="center"
          />
          <el-table-column
            prop="validityEndName"
            label="有效期"
            align="center"
          />
          <el-table-column
            prop="members"
            label="会员人数"
            align="center"
          />
          <el-table-column
            prop="realNameNum"
            label="有效人数"
            align="center"
          />
          <el-table-column
            prop="couponRate"
            label="享受基础佣金分成比例"
            align="center"
          />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { cityPartner } from '@/api/userMg'
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
      shellList: [],
      cityList: []
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
      cityPartner({ idStr: this.id }).then(res => {
        const { shellList, cityList } = res.object
        this.shellList = shellList
        this.cityList = cityList
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.el-table{
  margin: 20px 0;
}
</style>
