<template>
  <div class="commodityMgInfo-content">
    <div class="commodityMgInfo-content-title">
      <breadnar title="商品管理" title1="商品详情" />
    </div>
    <div class="commodityMgInfo-content-body">
      <infolist :title-open="true" />
      <infolist title1="平台" content1="淘宝" title2="原价" content2="998" title3="是否拼团" content3="是" />
      <infolist
        title1="商品分类"
        content1="一级分类-二级分类-三级分类"
        title2="原价"
        content2="998"
        title3="是否拼团"
        content3="是"
      />
      <infolist
        title1="推广类目"
        content1="9.9元包邮 / 高佣商品 / 精品"
        title2="原价"
        content2="998"
        title3="是否拼团"
        content3="是"
      />
      <infolist
        title1="商品名称"
        content1="银色星芒刺绣网纱底裤..."
        link-content1="https://www.baidu.com"
        link-name1="商品链接"
        title2="原价"
        content2="998"
        title3="是否拼团"
        content3="是"
      />
      <infolist
        title1="店铺"
        content1="XXX店铺"
        link-content1="https://www.baidu.com"
        link-name1="店铺链接"
        title2="原价"
        content2="998"
        title3="是否拼团"
        content3="是"
      />
    </div>
    <div class="generalize-info">
      <p class="generalize-info-title">推广信息</p>
      <div class="generalize-info-link">
        <div>
          <el-row type="flex" align="center">
            <el-col :span="3" class="generalize-info-link-title">
              推广链接:
            </el-col>
            <el-col :span="9">
              <copydata v-model="linktest" />
            </el-col>
            <el-col :span="3" class="generalize-info-link-title">
              商品口令：
            </el-col>
            <el-col :span="9">
              <copydata v-model="command" />
            </el-col>
          </el-row>
          <el-row type="flex" align="center">
            <el-col :span="3" class="generalize-info-link-title">
              优惠券链接：
            </el-col>
            <el-col :span="9">
              <copydata v-model="linktest" />
            </el-col>
            <el-col :span="3" class="generalize-info-link-title">
              优惠券口令：
            </el-col>
            <el-col :span="9">
              <copydata />
            </el-col>
          </el-row>
          <el-row type="flex" align="center">
            <el-col :span="3" class="generalize-info-link-title">
              商品图：
            </el-col>
            <el-col :span="9">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
                lazy
              />
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
              />
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
              />
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
              />
            </el-col>
            <el-col :span="3" class="generalize-info-link-title">
              推广文案：
            </el-col>
            <el-col :span="9">
              <copydata v-model="textcesi" text-type="textarea" />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Copydata from '@/components/copyData'
import infolist from './components/infoList'
export default {
  components: {
    infolist,
    Copydata
  },
  data() {
    return {
      textcesi: '测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      command: '￥sVeJ1g9UNmS￥',
      linktest: 'http://www.taobao.com',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
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
.commodityMgInfo {
  &-content {
    padding: 10px 20px;
    &-title {
      position: relative;
      padding-bottom: 20px;
    }
    &-title::after {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 8px;
      background-color: #f2f2f2;
      content: "";
    }
    &-body {
      margin-top: 20px;
    }
    .generalize {
      &-info {
        &-title {
          padding: 15px 10px;
          border-bottom: 2px solid #f2f2f2;
          position: relative;
        }
        &-title::before {
          content: "";
          z-index: 100;
          position: absolute;
          bottom: -2px;
          left: 0;
          height: 0;
          width: 90px;
          border-bottom: #409eff 2px solid;
        }
        &-link{
          margin-top: 20px;
          .el-row{
            margin-bottom: 20px;
          }
          &-title{
           line-height: 40px;
           text-align: right;
           padding-right:20px ;
           font-size: 14px;
           color: #909399;
          }
        }
      }
    }
  }
}
</style>
