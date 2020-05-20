<template>
  <div class="seastar">
    <div class="seastar-title">
      <breadnar title="海洋星设置" />
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="晋升设置" name="first">
          <SeastarPromotion />
        </el-tab-pane>
        <el-tab-pane label="说明文案编辑" name="second">
          <div>
            <p class="instructions">用于APP海洋星达人规则说明</p>
            <wangeditor v-model="textarea.content" :initial="content" />
          </div>
          <div style="margin-top:20px">
            <el-button type="primary" @click="changedata(textarea)">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import wangeditor from '@/components/wangeditor/index'
import { descriptionTextList, descriptionTextUpdate } from '@/api/shellSet'
import SeastarPromotion from './components/SeastarPromotion'
export default {
  components: {
    wangeditor,
    SeastarPromotion
  },
  data() {
    return {
      textarea: { id: '', content: '', copywritingCode: '' },
      content: '',
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      descriptionTextList({ copywritingCode: 5 }).then(res => {
        this.content = res.object[0].content
        const { id, content, copywritingCode } = res.object[0]
        this.textarea = { id, content, copywritingCode }
      })
    },
    changedata(val) {
      descriptionTextUpdate({ ...val }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getdata()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.seastar {
  padding: 20px;

}
.instructions{
  margin: 0 0 15px 0;
  font-size: 14px;
}
</style>
