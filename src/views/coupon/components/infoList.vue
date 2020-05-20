<template>
  <div class="infoList">
    <div v-show="titleOpen" class="infoList-head">
      <slot name="title">
        <p>{{ title }}</p>
      </slot>
    </div>
    <div class="infoList-content">
      <el-row align="center" type="flex">
        <el-col class="el-col-title" :span="spantitle">
          {{ title1 }}
        </el-col>
        <el-col :span="spancontent">
          <slot name="content1">
            {{ content1 }}
            <el-link v-if="linkContent1" :href="linkContent1">{{ linkName1 }}</el-link>
          </slot>
        </el-col>
        <el-col class="el-col-title" :span="spantitle">
          {{ title2 }}
        </el-col>
        <el-col :span="spancontent">
          <slot name="content2">
            {{ content2 }}
            <el-link v-if="linkContent2" :href="linkContent2">{{ linkName2 }}</el-link>
          </slot>
        </el-col>
        <el-col class="el-col-title" :span="spantitle">
          {{ title3 }}
        </el-col>
        <el-col :span="spancontent">
          <slot name="content3">
            {{ content3 }}
            <el-link v-if="linkContent3" :href="linkContent3">{{ linkName3 }}</el-link>
          </slot>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    titleOpen: {
      type: Boolean,
      default: false
    },
    spantitle: {
      type: Number,
      default: 2
    },
    spancontent: {
      type: Number,
      default: 6
    },
    title: {
      type: String,
      default: '商品基础信息'
    },
    title1: {
      type: String,
      default: '商品ID'
    },
    content1: {
      type: String,
      default: ''
    },
    linkContent1: {
      type: String,
      default: ''
    },
    linkName1: {
      type: String,
      default: '链接'
    },
    linkContent2: {
      type: String,
      default: ''
    },
    linkName2: {
      type: String,
      default: '链接'
    },
    linkContent3: {
      type: String,
      default: ''
    },
    linkName3: {
      type: String,
      default: '链接'
    },
    title2: {
      type: String,
      default: '商品价格'
    },
    content2: {
      type: String,
      default: ''
    },
    title3: {
      type: String,
      default: '是否营销'
    },
    content3: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
.infoList{
      // margin-top: 20px;
      &-head {
        background-color: #f2f2f2;
        padding: 15px 10px;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
      }
      &-content{
       .el-row{
         .el-col{
          white-space: nowrap;
          padding: 10px 15px;
          border: solid 1px #E4E7ED;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          &-title{
            color: #909399;
          }
          .el-link {
            color: #409eff;
          }
         }
       }
      }

}

</style>
