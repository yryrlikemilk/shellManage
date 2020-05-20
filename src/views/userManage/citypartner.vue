<template>
  <div class="citypartner">
    <breadnar title="城市合伙人" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="优惠券合伙人" name="first">
        <couponpartner />
      </el-tab-pane>
      <el-tab-pane label="贝壳合伙人" name="second">
        <shellpartner />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import couponpartner from './components/couponpartner'
import shellpartner from './components/shellpartner'
export default {
  components: {
    couponpartner,
    shellpartner
  },
  data() {
    return {
      activeName: 'first'
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
.citypartner{
  padding: 20px;
}
</style>
