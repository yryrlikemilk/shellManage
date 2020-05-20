<template>
  <div>
    <el-switch
      v-model="seletvalue"
      class="switchStyle"
      active-color="#09e"
      :active-value="'1'"
      :inactive-value="'0'"
      :active-text="activetext"
      inactive-color="#ddd"
      :inactive-text="inactivetext"
    />
  </div>

</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      required: true
    },
    activetext: {
      type: String,
      default: '有效'
    },
    inactivetext: {
      type: String,
      default: '无效'
    }
  },
  data() {
    return {
      seletvalue: this.value
    }
  },
  computed: {},
  watch: {
    value(value) {
      this.seletvalue = value
    },
    seletvalue: {
      handler(value) {
        this.$emit('input', value)
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
  }
}
</script>
<style scoped>
</style>
<style lang='scss'>
.switchStyle{
        .el-switch__label {
            position: absolute;
            display: none;
            font-weight:normal;
        }
        .el-switch__label *{
            font-size:12px;
        }
        .el-switch__label--left {
            z-index: 9;
            left:10px;
            color: #999;
        }
        .el-switch__label--right {
            z-index: 9;
            left: -19px;
            color: #fff;
        }
        .el-switch__label.is-active {
            display: block;
            height:30px;
            line-height:30px;
            padding-left: 18px;
        }
    }
    .switchStyle.el-switch .el-switch__core,.el-switch .el-switch__label {
        width:60px !important;
    }
    .el-switch,.el-switch__core{
        height:30px;
        line-height:30px;
    }
    .el-switch__core{
        border-radius:15px;
        &:after{
            width:20px;
            height:20px;
            top:4px;
            left:3px;
            z-index:10;
        }
    }
    .el-switch.is-checked .el-switch__core::after{
        margin-left:-23px;
    }

</style>
