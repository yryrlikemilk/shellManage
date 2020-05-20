<template>
  <div class="miniVideo">
    <breadnar title="视频管理" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="视频管理" name="first">
        <videoMg />
      </el-tab-pane>
      <el-tab-pane label="视频投诉" name="second" :lazy="true">
        <complain />
      </el-tab-pane>
      <el-tab-pane label="评论管理" name="third" :lazy="true">
        <commentMg />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import commentMg from './components/commentMg'
import complain from './components/complain'
import videoMg from './components/videoMg'
export default {
  components: {
    complain,
    videoMg,
    commentMg
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.miniVideo{
  padding:20px 20px 60px 20px;
}
</style>
