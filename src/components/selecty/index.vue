<template>
  <div>
    <el-select v-model="selectvalue" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: undefined,
      required: true
    },
    options: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      selectvalue: this.value
    }
  },
  computed: {},
  watch: {
    selectvalue(val) {
      this.$emit('input', val)
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped>
</style>
