<template>
  <div class="content">
    <div class="title">
      <breadnar title="商品管理" />
      <p>上次更新商品：8:00:00</p>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="发布商品" name="first">
        <publish-commodity />
      </el-tab-pane>
      <el-tab-pane label="失效商品" name="second">
        失效商品
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import publishCommodity from './components/publishCommodity'
export default {
  components: {
    publishCommodity
  },
  data() {
    return {
      input: '',
      value1: '',
      value2: '',
      radio2: '',
      radio1: '上海',
      show2: true,
      activeName: 'first',
      table1: [
        { name: '京东' },
        { name: '淘宝' },
        { name: '拼多多' }
      ],
      table2: [
        { name: '京东' },
        { name: '淘宝' },
        { name: '拼多多' },
        { name: '淘宝' },
        { name: '拼多多' },
        { name: '淘宝' },
        { name: '拼多多' },
        { name: '淘宝' },
        { name: '拼多多' },
        { name: '淘宝' },
        { name: '拼多多' }

      ],
      table3: [
        { name: '全部' },
        { name: '近30日' },
        { name: '近7日' },
        { name: '今日' }
      ]
    }
  },
  computed: {},
  watch: {
    value2(val) {
      console.log(val)
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>

.searchInput{
  width: 300px;
}
.selectTime,.searchInfo{
  margin-top: 6px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f2f2f2;
}
.el-radio-button {
  margin-right: 20px;
  border: none;
}
.el-radio-button /deep/ .el-radio-button__inner {
  border: none;
  display: inline-table;
  border-radius: 4px;
}

.grid-content {
  line-height: 40px;
  white-space: nowrap;
  text-align: right;
}
.firstCearch {
  padding: 10px 10px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  padding: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }
}
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  color: #000;
  padding: 10px 0px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
