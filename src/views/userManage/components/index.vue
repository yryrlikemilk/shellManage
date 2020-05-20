<template>
  <div class="selecty">
    <p>{{ title }}</p>
    <el-select v-model="selectvalue" clearable :placeholder="placeholder">
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
    title: {
      type: String,
      default: ''
    },
    value: {
      type: undefined,
      required: true
    },
    options: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: '全部'
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
.selecty{
  display: flex;
  white-space: nowrap;
  color: #000;
  font-size: 14px;
  justify-content: flex-start;
  align-items: center;
}
</style>
