<template>
  <div class="cityPartner">
    <div class="cityPartner-title">
      <breadnar title="城市合伙人设置" />
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="优惠券合伙人" name="first">
          <couponPartner />
        </el-tab-pane>
        <el-tab-pane label="贝壳合伙人" name="second">
          <shellPartner />
        </el-tab-pane>
        <el-tab-pane label="说明文案编辑" name="third">
          <div class="explain">
            <p class="instructions">用于APP城市合伙人规则说明</p>
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
import couponPartner from './components/couponPartner'
import shellPartner from './components/shellPartner'
export default {
  components: {
    wangeditor,
    shellPartner,
    couponPartner
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
      descriptionTextList({ copywritingCode: 6 }).then(res => {
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
.cityPartner{
  padding: 20px;
}
.explain{
  margin-top: 20px;
}
.instructions{
  margin: 0 0 15px 0;
  font-size: 14px;
}
</style>
