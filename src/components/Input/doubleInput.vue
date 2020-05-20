<template>
  <div class="box">
    <p v-if="title" :style="styleinput">{{ title }}</p>
    <div class="inputborder">
      <input id="doubleinput" ref="input1" :type="type" autocomplete="off" :placeholder="placeholder" :value="inputValue[0]" class="doubleinput" name="" @keyup="test">
      <p class="icon">{{ icon }}</p>
      <input id="doubleinput1" ref="input2" :type="type" autocomplete="off" :placeholder="placeholder" :value="inputValue[1]" class="doubleinput" name="" @keyup="test">
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  props: {
    styleinput: {
      type: String,
      default: 'font-size:14px'
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    icon: {
      type: String,
      default: '~'
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      inputValue: [
        this.value[0],
        this.value[1]
      ]

    }
  },
  computed: {},
  watch: {
  },
  created() {},
  mounted() {},
  methods: {
    test() {
      var array = []
      array.push(this.$refs['input1'].value)
      array.push(this.$refs['input2'].value)
      this.$emit('input', array)
    }
  }
}
</script>
<style scoped>
.box{
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.label{
  font-weight: 500;
  /* font-size: 12px; */
}
.inputborder{
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 2px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}
.inputborder:focus-within{
  border: solid 1px #409eff;
}
.doubleinput{
  width: 100%;
  border: none;
  padding: 0 10px;
  font-size: 14px;
  /* color: #F2F6FC; */
  /* width: 46%; */
  /* flex: 1; */
}
.doubleinput:focus-within{
  border:none;
  outline:none;
}
.icon{
  padding: 0 4px;
  margin: 0;

}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
color: #C0C4CC;
text-align: center;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
color: #C0C4CC;
text-align: center;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  text-align: center;
color: #C0C4CC;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  text-align: center;
color: #C0C4CC;
}
</style>
