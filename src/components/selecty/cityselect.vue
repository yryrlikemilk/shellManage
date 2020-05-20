<template>
  <div class="cityselet">
    <p for="cascader">{{ title }}</p>
    <el-cascader
      ref="cascader"
      v-model="selectvalue"
      placeholder="省/市/区"
      :options="options"
      :props="{label:'name',children:'childrenSystemAddress',value:'idStr',checkStrictly: true}"
      filterable
      @change="changedata()"
    />
  </div>
</template>

<script>
import { cityTree } from '@/api/city'
export default {
  components: {},
  props: {
    value: {
      type: undefined,
      required: true
    },
    title: {
      type: String,
      default: '城市：'
    },
    openAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: [],
      nodes: [],
      selectvalue: this.value
    }
  },
  computed: {
  },
  watch: {
    // selectvalue(val) {
    //   this.$emit('input', val)
    // }
  },
  created() {

  },
  mounted() {
    this.getcity()
  },
  methods: {
    changedata() {
      this.$emit('input', this.selectvalue)
    },
    test(val) {
      this.$refs['cascader'].getCheckedNodes()
      console.log(val)
    },
    getcity() {
      if (this.openAll === true) {
        this.options = [{ name: '全部', idStr: '' }]
      }
      cityTree().then(res => {
        this.options.push(...res.object)
      })
    }
  }
}
</script>
<style scoped>
p {
  margin: 0;
  font-size: 14px;
}
.cityselet {
  display: flex;
  align-items: center;
  white-space: nowrap;
}
</style>
