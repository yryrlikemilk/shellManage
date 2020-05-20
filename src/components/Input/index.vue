<template>
  <div class="content">
    <el-input v-model="myValue" class="input" :placeholder="placeholder" @keyup.native.enter="childMethod" />
    <span class="icon" @click="childMethod">
      <i class="el-icon-search" />
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data() {
    return {
      myValue: this.value
    }
  },
  computed: {},
  watch: {
    myValue(val) {
      this.$emit('input', val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    childMethod() {
      this.$emit('fatherMethod')
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .el-input {
    /deep/ .el-input__inner {
      border: 0;
      height: 35px;
    }
  }
  .icon {
    cursor: pointer;
    padding-right: 10px;
    font-weight: bold;
  }
  .icon:hover {
    color: #409eff;
    font-weight: bold;
  }
}
.content:focus-within {
  border: 1px #409eff solid;
}
</style>
