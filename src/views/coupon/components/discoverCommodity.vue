<template>
  <div class="discoverCommodity">
    <div class="discoverCommodity-header">
      <el-row type="flex" align="center" :gutter="20">
        <el-col :span="8">
          <p class="label">选择分类：</p>
          <el-select v-model="form.findTypeId" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <p class="label">选择用户：</p>
          <el-select v-model="form.findUserId" filterable placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <p class="label">选择关键词：</p>
          <el-select v-model="form.keywords" filterable placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row class="twoselect" type="flex" :gutter="20" align="center">
        <el-col :span="8">
          <p class="label">发布时间：</p>
          <el-date-picker
            v-model="value1"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            type="datetimerange"
          />
        </el-col>
        <el-col :span="8">
          <myinput v-model="form.goodsName" placeholder="商品名称" @fatherMethod="test" />
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row
        v-for="(item) in tabledata"
        :key="item.idStr"
        :gutter="50"
        class="discoverCommodity-info"
      >
        <el-col :span="9" class="discoverCommodity-info-left">
          <div class="discoverCommodity-info-header">
            <svg-icon
              v-if="item.mallCode==='2'"
              icon-class="taobao"
              class-name="discoverCommodity-info-header-svgicon"
            />
            <svg-icon
              v-if="item.mallCode==='1'"
              icon-class="jingdong"
              class-name="discoverCommodity-info-header-svgicon"
            />
            <svg-icon
              v-else
              icon-class="pingduoduo"
              class-name="discoverCommodity-info-header-svgicon"
            />
            <span style="color:red">{{ item.name }}</span>
            <span>{{ item.goodsName }}</span>
          </div>
          <div>
            <p>
              分享赚：
              <span style="color:red">￥{{ item.commission }}</span>
            </p>
          </div>
          <div class="discoverCommodity-info-content">
            <p>{{ item.content }}</p>
          </div>
          <!-- <div>
            <p>$6DvIYEQmLvb$</p>
          </div>
          <div>
            <p>【怎么买】： 点击右上角一键发圈→删掉多余的文案并分享给好友→返回红人装转链→将淘口令分享给好友</p>
          </div>
          <div>
            <p>【注意】价格不对，不要分享！！！</p>
          </div>-->
          <div v-if="item.imgUrl">
            <swiper :imglist="item.imgUrl" />
          </div>
        </el-col>
        <el-col :span="15" class="discoverCommodity-info-right">
          <div>
            <!-- <p>分布时间：{{item.}}</p> -->
            <p>分享次数：{{ item.shareTimes }}</p>
            <p>发现类别：{{ item.name }}</p>
            <p>发现用户：{{ item.findUserId }}</p>
            <p>关键词：{{ item.keywords }}</p>
          </div>
          <div class="discoverCommodity-info-right-button">
            <!-- <el-link :href="item.goodsInfoUrl" :underline="false" type="primary">商品详情</el-link> -->
            <el-button type="text" @click="goodsinfo(item.goodsInfoUrl)">商品详情</el-button>
            <el-button type="text" @click="batch(item.idStr)">
              <i class="el-icon-delete" /> 删除
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      background
      :current-page.sync="form.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="form.pageSize"
      layout="sizes, prev, pager, next,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import swiper from '@/components/swiper'
import myinput from '@/components/Input/index'
import {
  facade,
  batchDelete,
  findType,
  findUser
} from '@/api/discoverCommodity'
export default {
  components: {
    myinput,
    swiper
  },
  data() {
    return {
      total: 0,
      form: {
        currentPage: 1,
        pageSize: 10,
        findTypeId: '',
        findUserId: '',
        keywords: '',
        goodsName: '',
        rawAddTimeMin: '',
        rawAddTimeMax: ''
      },
      input: '',
      value1: [],
      options: [{ label: '全部', value: '' }],
      options1: [{ label: '全部', value: '' }],
      options2: [{ label: '全部', value: '' }],
      value: '',
      tabledata: []
    }
  },
  computed: {},
  watch: {
    value1(value) {
      if (value === null) {
        value = new Array(2)
      }
      [this.form.rawAddTimeMin, this.form.rawAddTimeMax] = value
    },
    form: {
      handler() {
        this.getdata()
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.getdata()
    this.getfindType()
    this.getfindUser()
  },
  methods: {
    batch(value) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          batchDelete({ id: value }).then(res => {
            this.getdata()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    goodsinfo(value) {
      window.open(value)
    },
    getfindUser() {
      findUser().then(res => {
        res.object.forEach(element => {
          this.options1.push({ label: element.userName, value: element.idStr })
        })
      })
    },
    getfindType() {
      findType().then(res => {
        res.object.map(element => {
          this.options.push({ label: element.name, value: element.idStr })
          if (element.keywords) {
            element.keywords.split(';').forEach(ele => {
              this.options2.push({ label: ele, value: ele })
            })
          }
        })
      })
    },
    getdata() {
      facade({ ...this.form }).then(res => {
        this.total = res.object.total
        this.tabledata = res.object.list
      })
    },
    test(value) {
    },
    handleSizeChange(val) {
      this.form.pageSize = val
    },
    handleCurrentChange(val) {
      this.form.currentPage = val
    }
  }
}
</script>
<style lang='scss' scoped>
.el-pagination {
  margin: 15px 0;
  text-align: right;
}
.label {
  white-space: nowrap;
}
.twoselect {
  border-bottom: 2px solid #f2f2f2;
}
.discoverCommodity {
  &-info {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f2f2f2;
    &-right {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &-button {
        display: flex;
        justify-content: space-between;
        width: 130px;
      }
      p {
        font-size: 14px;
      }
    }
    &-right::before {
      position: absolute;
      content: "";
      border-left: solid 2px #dcdfe6;
      height: 150px;
      left: 0;
    }
    &-content {
      p {
        width: 60%;
        max-width: 250px;
        font-size: 14px;
      }
    }
    &-header {
      width: 80%;
      padding: 10px;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      &-svgicon {
        font-size: 1.5rem;
        vertical-align: middle;
      }
      span {
        font-weight: bold;
        line-height: 25px;
      }
    }
  }
  &-header {
    .el-row {
      .el-col {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
