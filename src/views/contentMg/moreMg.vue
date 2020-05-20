<template>
  <div class="moreMg">
    <breadnar title="更多内容管理" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="邀请说明" name="first">
        <div>
          <p class="instructions">邀请说明设置</p>
          <wangeditor v-model="explain.content" :initial="content" />
        </div>
        <div style="margin-top:20px">
          <el-button type="primary" @click="changedata(explain)">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的团队说明" name="second">
        <div>
          <p class="instructions">我的团队</p>
          <wangeditor v-model="explain1.content" :initial="content1" />
        </div>
        <div style="margin-top:20px">
          <el-button type="primary" @click="changedata(explain1)">保存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import wangeditor from '@/components/wangeditor/index'
import { descriptionTextList, descriptionTextUpdate } from '@/api/shellSet'
export default {
  components: {
    wangeditor
  },
  data() {
    return {
      explain: { id: '', content: '', copywritingCode: '' },
      explain1: { id: '', content: '', copywritingCode: '' },
      content: '',
      content1: '',
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      descriptionTextList().then(res => {
        res.object.forEach(element => {
          var { idStr: id, content, copywritingCode } = element
          switch (element.copywritingCode) {
            case '7':
              this.content = content
              this.explain = { id, content, copywritingCode }
              break
            case '8':
              this.content1 = content
              this.explain1 = { id, content, copywritingCode }
          }
        })
      })
    },
    changedata(val) {
      descriptionTextUpdate({ ...val }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getList()
        }
      })
    }
  }
}
</script>
<style scoped>
  .moreMg{
    padding: 20px;
  }
  .instructions{
  margin: 0 0 15px 0;
  font-size: 14px;
}
</style>
