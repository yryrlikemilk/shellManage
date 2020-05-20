<template>
  <div>
    <div class="search">
      <el-input v-model="input" :placeholder="placeholder" />
      <el-button size="medium" type="primary" icon="el-icon-search" @click="child">搜索</el-button>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      input: this.value
    }
  },
  computed: {},
  watch: {
    input(value) {
      this.$emit('input', value)
    }
  },
  created() {},
  mounted() {},
  methods: {
    child() {
      this.$emit('fatherMethod')
    }
  }
}
</script>
<style scoped>
.search{
  display: flex;
  align-items: center;
}
.el-input{
  width: 300px;
  margin-right: 10px;
}
</style>
