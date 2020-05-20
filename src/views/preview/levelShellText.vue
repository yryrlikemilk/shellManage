<template>
  <div id="preview" ref="preview" class="preview" />
</template>

<script>
import { getCopywriting } from '@/api/preview'
export default {
  components: {},
  data() {
    return {
      typedata: '1'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.typedata = this.$route.query.typedata
    this.showTxt()
    document.title = '文案说明'
  },
  methods: {
    showTxt() {
      getCopywriting({ copywritingCode: this.typedata }).then(res => {
        var preview = document.getElementById('preview')
        var newNode = document.createElement('div')
        newNode.innerHTML = res.object.content
        preview.appendChild(newNode)
        // preview.insertBefore(newNode, null)
        // 低版本不支持
        // document.querySelector('.preview').innerHTML = res.object.content
      })
    }
  }
}
</script>
<style scoped>
.preview{
  padding: 10px 20px;
}
</style>
