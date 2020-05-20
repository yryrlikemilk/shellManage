<template>
  <div class="discoverMg">
    <breadnar title="发现管理" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="发现商品" name="first">
        <discoverCommodity />
      </el-tab-pane>
      <el-tab-pane label="发现类别管理" name="second" :lazy="true">
        <FoundCategory />
      </el-tab-pane>
      <el-tab-pane label="发现用户管理" name="third" :lazy="true">
        <founduser />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import founduser from './components/founduser'
import FoundCategory from './components/FoundCategory'
import discoverCommodity from './components/discoverCommodity'
export default {
  components: {
    founduser,
    FoundCategory,
    discoverCommodity
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
.discoverMg{
  padding: 20px;
}
</style>
