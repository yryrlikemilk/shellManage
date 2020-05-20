<template>
  <div class="shell-set">
    <breadnar title="贝壳设置" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="会员等级" name="first" :lazy="true">
        <membership />
      </el-tab-pane>
      <el-tab-pane label="复投规则" name="second" :lazy="true">
        <ComplexRules />
      </el-tab-pane>
      <el-tab-pane label="等贝壳" name="third" :lazy="true">
        <levelShell />
      </el-tab-pane>
      <el-tab-pane label="活跃度设置" name="fourth" :lazy="true">
        <liveness />
      </el-tab-pane>
      <el-tab-pane label="交易规则" name="five" :lazy="true">
        <transactionRules />
      </el-tab-pane>
      <el-tab-pane label="珍珠任务" name="six" :lazy="true">
        <shellTask />
      </el-tab-pane>
      <el-tab-pane label="更多设置" name="seven" :lazy="true">
        <shellMoreSet />
      </el-tab-pane>
      <el-tab-pane label="文案说明设置" name="eight" :lazy="true">
        <descriptionText />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import descriptionText from './components/descriptionText'
import shellMoreSet from './components/shellMoreSet'
import shellTask from './components/shellTask'
import transactionRules from './components/transactionRules'
import liveness from './components/liveness'
import levelShell from './components/levelShell'
import ComplexRules from './components/ComplexRules'
import membership from './components/membership'
export default {
  components: {
    shellTask,
    membership,
    ComplexRules,
    levelShell,
    liveness,
    transactionRules,
    shellMoreSet,
    descriptionText
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
  methods: {}
}
</script>
<style lang='scss' scoped>
.shell{
  &-set{
    padding: 20px;
  }
}
</style>
