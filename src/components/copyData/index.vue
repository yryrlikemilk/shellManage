<template>
  <div class="copyinput">
    <el-input
      v-model="input3"
      :type="textType"
      :autosize="{ minRows: 6, maxRows: 20 }"
      :disabled="disabled"
      :placeholder="placeholder"
    >
      <p
        slot="suffix"
        v-clipboard:copy="input3"
        v-clipboard:error="onError"
        v-clipboard:success="onCopy"
        class="copybotton"
      >复制</p>
    </el-input>
    <div v-if="textType==='textarea'" class="textarea">
      <el-button
        v-clipboard:copy="input3"
        v-clipboard:error="onError"
        v-clipboard:success="onCopy"
        type="text"
        style="color:#000"
      >复制</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Copydata',
  components: {},
  props: {
    textType: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      input3: this.value
    }
  },
  computed: {},
  watch: {
    input3(val) {
      this.$emit('input', val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    onCopy(e) {
      this.$message.success('内容已复制到剪切板！')
    },
    onError(e) {
      this.$message.error('抱歉，复制失败！')
    }
  }
}
</script>
<style scoped>
.copyinput {
  width: 300px;
}
.copybotton {
  padding: 12px;
  color: #000;
  cursor: pointer;
}
.textarea{
  text-align: right;
  padding-right: 15px ;
}
</style>
