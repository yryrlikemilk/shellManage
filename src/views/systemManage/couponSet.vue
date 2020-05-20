<template>
  <div class="couponSet">
    <breadnar title="优惠券设置" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="晋升奖励设置" name="first">
        <promoteSet />
      </el-tab-pane>
      <el-tab-pane label="更多设置" name="second">
        <couponMoreSet />
      </el-tab-pane>
      <el-tab-pane label="说明文案编辑" name="third">
        <div>
          <p class="instructions">用于APP优惠券用户等级规则说明</p>
          <wangeditor v-model="textarea.content" :initial="content" />
        </div>
        <div style="margin-top:20px">
          <el-button type="primary" @click="changedata(textarea)">保存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import wangeditor from '@/components/wangeditor/index'
import { descriptionTextList, descriptionTextUpdate } from '@/api/shellSet'
import couponMoreSet from './components/couponMoreSet'
import promoteSet from './components/promoteSet'
export default {
  components: {
    wangeditor,
    couponMoreSet,
    promoteSet
  },
  data() {
    return {
      textarea: {
        content: ''
      },
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
      descriptionTextList({ copywritingCode: 9 }).then(res => {
        this.content = res.object[0].content || ''
        this.textarea.content = res.object[0].content
        this.textarea.id = res.object[0].idStr
      })
    },
    changedata(val) {
      descriptionTextUpdate({ copywritingCode: 9, ...val }).then(res => {
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
.couponSet{
  padding: 20px;
}
.instructions{
  margin: 0 0 15px 0;
  font-size: 14px;
}
</style>
