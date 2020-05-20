<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="等贝壳说明" name="1">
        <div>
          <wangeditor v-model="explain.content" :initial="content" />
        </div>
        <div class="description-text-button">
          <el-button type="primary" @click="changedata(explain)">保存</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item title="会员等级" name="2">
        <div>
          <wangeditor v-model="explain1.content" :initial="content1" />
        </div>
        <div class="description-text-button">
          <el-button type="primary" @click="changedata(explain1)">保存</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item title="复投贝壳说明" name="3">
        <div>
          <wangeditor v-model="explain2.content" :initial="content2" />
        </div>
        <div class="description-text-button">
          <el-button type="primary" @click="changedata(explain2)">保存</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item title="活跃度说明" name="4">
        <div>
          <wangeditor v-model="explain3.content" :initial="content3" />
        </div>
        <div class="description-text-button">
          <el-button type="primary" @click="changedata(explain3)">保存</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
// import DropBox from './DropBox'
import wangeditor from '@/components/wangeditor/index'
import { descriptionTextList, descriptionTextUpdate } from '@/api/shellSet'
export default {
  components: {
    wangeditor
    // DropBox
  },
  data() {
    return {
      explain: { id: '', content: '', copywritingCode: '' },
      explain1: { id: '', content: '', copywritingCode: '' },
      explain2: { id: '', content: '', copywritingCode: '' },
      explain3: { id: '', content: '', copywritingCode: '' },
      content: '',
      content1: '',
      content2: '',
      content3: '',
      textarea: '',
      activeNames: ['1']
    }
  },
  computed: {},
  watch: {
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      descriptionTextList().then(res => {
        res.object.forEach(element => {
          var { idStr: id, content, copywritingCode } = element
          switch (element.copywritingCode) {
            case '1':
              this.content = content
              this.explain = { id, content, copywritingCode }
              break
            case '2':
              this.content1 = content
              this.explain1 = { id, content, copywritingCode }

              break
            case '3':
              this.content2 = content
              this.explain2 = { id, content, copywritingCode }

              break
            case '4':
              this.content3 = content
              this.explain3 = { id, content, copywritingCode }
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
.description-text-button{
  margin-top: 20px;
}
</style>
