<template>
  <div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item v-for="(item,index) in 7" :key="index" title="标题1" :name="index" :is-link="link">
        <template slot="right-icon">
          <!-- <img :class="activeName!==index?'iconup':''" class="icon" src="@/assets/btn_pull_down@3x.png"> -->
          <img :class="activeName!==index?'iconup':''" class="icon" src="@/assets/btn_pull_up@3x.png">
        </template>
        内容
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import Vue from 'vue'
import { Collapse, CollapseItem } from 'vant'

Vue.use(Collapse)
Vue.use(CollapseItem)
export default {
  components: {},
  data() {
    return {
      activeName: 1,
      link: true
    }
  },
  computed: {},
  watch: {
    link(val) {
      console.log(val)
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped>
.icon{
  width: 17px;
  height: 17px;
  transition:all 500ms ease ;
}
.iconup{
  transform: rotate(180deg);
}
</style>
