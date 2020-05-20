<template>
  <div class="classify-content">
    <div class="classify-content-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="classify-content-card">
      <el-radio-group v-if="show" v-model="radio2" size="small" @change="updata">
        <div v-for="(item,index) in headerData" :key="index" class="classify-content-card-info">
          <el-radio-button :label="item.value">{{ item.name }}</el-radio-button>
        </div>
        <div v-if="classifyData&&classifyData.length>cardSize" class="classify-content-card-button">
          <el-button type="primary" size="small" @click="show=false">展开</el-button>
        </div>
        <div class="classify-content-card-other">
          <slot />
        </div>
      </el-radio-group>
      <el-radio-group v-else v-model="radio2" size="small">
        <div v-for="(item,index) in classifyData" :key="index" class="classify-content-card-info">
          <el-radio-button :label="item.value">{{ item.name }}</el-radio-button>
        </div>
        <div class="classify-content-card-button">
          <el-button size="small" type="primary" @click="show=true">收起</el-button>
        </div>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '商品分类：'
    },
    classifyData: {
      type: Array,
      default: null
    },
    cardSize: {
      type: Number,
      default: 7
    },
    value: {
      type: undefined,
      default: 0
    }
  },
  data() {
    return {
      radio2: this.value,
      show: true,
      headerData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.classifyHeard()
  },
  methods: {
    updata() {
      this.$emit('input', this.radio2)
    },
    classifyHeard() {
      if (this.classifyData === null) {
        return
      }
      this.classifyData.forEach((element, index) => {
        if (index < this.cardSize) {
          this.headerData.push(element)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.classify {
  &-content {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 2px solid #f2f2f2;
    &-title {
      font-size: 14px;
      line-height: 50px;
      white-space: nowrap;
    }
    &-card{
      margin: 6px 0;
      &-button{
        text-align: center;
        font-size: 20px;
      }
      &-info,&-button,&-other{
        margin-right:10px;
        float: left;
      }
      &-info::after,&-button::after,&-other::after{
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden;
      }
    }
  }
}
.classify {
  margin: 4px 0;
}
.el-radio-group{
  display: flex;
  align-items: center;
}
</style>
