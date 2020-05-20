<template>
  <div ref="chart" :style="{height:'400px',width:'100%'}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      const option = {
        // title: {
        //   text: '商城订单占比',
        //   subtext: '',
        //   left: '0',
        //   top: '20',
        //   textStyle: {
        //     color: 'black',
        //     fontWeight: 'bold'
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
        // orient: 'vertical',
        // top: 'middle',
          icon: 'circle',
          bottom: 40,
          left: 'center',
          data: ['淘宝', '优酷', '腾讯视频', '其他', '微信']
        },
        label: {
          normal: {
            position: 'outer', // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
            // formatter: '{a} {b} : {c}个 ({d}%)'//   设置标签显示内容 ，默认显示{b}
            // {a}指series.name  {b}指series.data的name
            // {c}指series.data的value  {d}%指这一部分占总数的百分比
            formatter: '{c}'
          }
        },
        series: [
          {
            name: '流量占比',
            type: 'pie',
            radius: '45%',
            center: ['50%', '40%'],
            selectedMode: 'single',
            label: {
              formatter: `{b}:({d}%)`
            },
            data: [
              { value: expectedData, name: '淘宝' },
              { value: actualData, name: '优酷' },
              { value: 510, name: '腾讯视频' },
              { value: 634, name: '其他' },
              { value: 735, name: '微信' }
            ],
            emphasis: {
              // shadowBlur: 10,
              // shadowOffsetX: 0,
              // shadowColor: 'rgba(30, 144, 255，0.5)'
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        color: ['#7EC0EE', '#FF9F7F', '#FFD700', '#C9C9C9', '#E066FF', '#C0FF3E']
      }

      const myChart = echarts.init(this.$refs.chart)
      myChart.setOption(option)
      return { myChart: myChart }
    }
  }
}
</script>
