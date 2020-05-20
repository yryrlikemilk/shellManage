<template>
  <div ref="title" class="title">
    <span class="titleline">
      {{ title }}
    </span>
    <el-tooltip v-if="icon" class="item" effect="dark" :content="content" placement="top">
      <el-button type="text" class="tip">
        <svg-icon :icon-class="icon" class-name="svgicon" />
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    content: {
      type: String,
      default: '基础佣金系数作为基数佣金计算标准'
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '市级合伙人'
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // console.log(this.$refs['title'].after)
  },
  methods: {}
}
</script>
<style scoped>
.title{
  position: relative;
  box-sizing: border-box;
  padding-bottom: 10px;
  border-bottom: #E4E7ED 2px solid;
  position: relative;
}
.titleline{
  color: #409eff;
  font-size: 14px;
  padding: 0 2px 11px 0px;
  border-bottom: #409eff 2px solid;
}
.tip{
 position:absolute;
 top: -11px;
 margin-left: 20px;
}
.svgicon{
  color: #606266;
}
</style>
