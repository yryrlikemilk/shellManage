<template>
  <div>
    <div class="firstCearch">
      <div>
        <svg-icon icon-class="shaixuan" class-name="shaixuan" />
        <span>筛选</span>
      </div>
      <el-button size="mini" @click="changedata">{{ show2?'收起':'展开' }}</el-button>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="show2" class="transition-box"><slot /></div>
    </transition>
  </div>
</template>

<script>
// 展开收起
export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show2: this.value
    }
  },
  computed: {},
  watch: {
    // show2(value) {
    //   this.$emit('input', value)
    // }
  },
  created() {},
  mounted() {},
  methods: {
    changedata() {
      this.show2 = !this.show2
      this.$emit('input', this.show2)
    }
  }
}
</script>
<style scoped>
.firstCearch{
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  align-items: center;
  margin-top: 10px;
  padding: 5px 5px;
}
 .transition-box {
    margin-bottom: 10px;
    width: 100%;
    min-height: 100px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
