<template>
  <div class="card-content" :style="cardStyle">
    <h3 class="card-content-title">
      <span>{{ title4 }}</span>
      <!-- {{ title }} -->
      <count-to :start-val="0" :end-val="title" :duration="3600" class="card-panel-num" />
    </h3>
    <div class="card-content-info">
      <p>{{ title1 }}</p>
      <div>
        <span>{{ title2 }}</span>
        <span>{{ title3 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  props: {
    title: {
      type: Number,
      default: 1000
    },
    title1: {
      type: String,
      default: '平台预计收益'
    },
    title2: {
      type: String,
      default: '今日+'
    },
    title3: {
      type: String,
      default: '1000000'
    },
    title4: {
      type: String,
      default: '￥'
    },
    cardStyle: {
      type: String,
      default:
        'background: linear-gradient(90deg, rgba(204, 118, 243, 1) 0%, rgba(204, 118, 243, 1) 0%, rgba(102, 133, 250, 1) 100%, rgba(102, 133, 250, 1) 100%);'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.card {
  &-content {
    height: 110px;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
    min-width: 200px;
    border-radius: 4px;
    color: #fff;
    &-title {
      white-space: nowrap;
      overflow: hidden;
      padding: 10px 15px;
    }
    &-info {
      // margin-top: 33px;
      font-size: 12px;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
    }
  }
}
</style>
