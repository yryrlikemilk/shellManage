<template>
  <div class="dashboard">
    <div class="dashboard-title">
      <h3>总计</h3>
      <div class="dashboard-title-card">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <card :title="123123" title1="用户数" title2="今日+" title3="11111" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="{span: 4,offset:1}">
            <card
              card-style="background: linear-gradient(90deg, rgba(253, 198, 92, 1) 0%, rgba(253, 198, 92, 1) 0%, rgba(241, 148, 73, 1) 100%, rgba(241, 148, 73, 1) 100%);"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="{span: 4,offset:1}">
            <card
              card-style="background: linear-gradient(90deg, rgba(253, 148, 146, 1) 0%, rgba(253, 148, 146, 1) 0%, rgba(230, 55, 60, 1) 100%, rgba(230, 55, 60, 1) 100%);"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="{span: 4,offset:1}">
            <card
              card-style="background: linear-gradient(90deg, rgba(73, 224, 189, 1) 0%, rgba(73, 224, 189, 1) 0%, rgba(7, 175, 164, 1) 100%, rgba(7, 175, 164, 1) 100%);"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="{span: 4,offset:1}">
            <card
              card-style="background: linear-gradient(90deg, rgba(204, 153, 255, 1) 0%, rgba(204, 153, 255, 1) 0%, rgba(204, 0, 255, 1) 100%, rgba(204, 0, 255, 1) 100%);"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dashboard-body">
      <div class="dashboard-body-line">
        <h3>实名认证趋势</h3>
        <LineChart class-name="linechart" title="" :chart-data="lineChartData" />
      </div>
      <!-- <div class="dashboard-body-circle">
        <circle-chart :chart-data="circleChart" />
      </div> -->
    </div>
  </div>
</template>

<script>
// import circleChart from './components/circleGraph'
import Card from './components/card'
import { mapGetters } from 'vuex'
import LineChart from './components/LineChart'

export default {
  name: 'Dashboard',
  components: {
    Card,
    LineChart
    // circleChart
  },
  data() {
    return {
      circleChart: {
        expectedData: [200],
        actualData: [180]
      },
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165, 120, 165, 165, 165, 40],
        actualData: [120, 82, 91, 154, 162, 140, 145, 145, 145, 145, 145, 40]
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  margin: 30px;
  &-body{
    width: 100%;
    display: flex;
    margin-top: 30px;
    &-line{
      width: 100%;
    }
  }
  &-title {
    &-card {
      margin-top: 20px;
    }
  }
}
.linechart{
  padding-right: 30px;
}
</style>
