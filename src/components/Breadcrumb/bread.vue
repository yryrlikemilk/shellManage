<template>
  <div :class="leftline?'bread-content':''">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="title1">{{ title1 }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="title2">{{ title2 }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadnar',
  components: {},
  props: {
    leftline: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    title1: {
      type: String,
      default: ''
    },
    title2: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
.bread{
  &-content{
  position: relative;
  padding-left:10px;
  .el-breadcrumb{
    line-height: 36px;
  }
}
&-content::before{
  position: absolute;
  left: 0px;
  content: '';
  height: 34px;
  width: 3px;
  background-color: #409eff;
}
}

</style>
