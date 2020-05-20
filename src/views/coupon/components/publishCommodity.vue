<template>
  <div class="publishCommodity">
    <div class="firstCearch">
      <div>
        <svg-icon icon-class="shaixuan" class-name="shaixuan" />
        <span>筛选</span>
      </div>

      <el-button size="mini" @click="show2 = !show2">{{ show2?'收起':'展开' }}</el-button>
    </div>

    <transition name="el-zoom-in-top">
      <div v-show="show2" class="transition-box">
        <div class="search">
          <classify :classify-data="table1" :title="'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+'商城：'" />
        </div>
        <div class="commodity">
          <classify :classify-data="table2" />
        </div>
        <div class="selectTime">
          <span>
            有效时间：
          </span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div>
          <classify :classify-data="table3" title="更新时间：">
            <el-date-picker
              v-model="value2"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </classify>
        </div>
        <div class="searchInfo">
          <span>
            &#12288;&#12288;搜索：
          </span>
          <el-input v-model="input" class="searchInput" placeholder="商品名称" />
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary">
            <svg-icon icon-class="shaixuan" />
            筛选
          </el-button>
          <el-button type="primary">全部重置</el-button>
        </div>
      </div>
    </transition>
    <div>
      <div class="tableheard">
        <p>
          <span>
            <svg-icon icon-class="nested" />
          </span>
          商品列表
        </p>
        <!-- <el-button size="mini">修改状态</el-button> -->
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="商城商品ID"
            align="center"
          />
          <el-table-column
            prop="name"
            label="商品图片"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <div>
                <img class="commodityimg" :src="scope.row.name" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="商品名称"
            width="120"
            align="center"
          />
          <el-table-column
            prop="city"
            label="商品价格"
            width="120"
            align="center"
          />
          <el-table-column
            prop="address"
            label="链接"
            align="center"
          />
          <el-table-column
            prop="zip"
            label="加入时间"
            width="120"
            align="center"
          />
          <el-table-column
            prop="zip"
            label="状态"
            align="center"
            width="120"
          />
          <el-table-column
            label="操作"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="commodityMgInfo()"
              >
                详情
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      <el-pagination
        :current-page.sync="currentPage2"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        background
        layout="sizes, prev, pager, next,total"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import classify from './classify'
export default {
  components: {
    classify
  },
  data() {
    return {
      currentPage2: 1,
      tableData: [{ name: 'https://img.yzcdn.cn/vant/cat.jpeg' }],
      input: '',
      value1: '',
      value2: '',
      radio2: '',
      radio1: '上海',
      show2: false,
      activeName: 'first',
      table1: [
        { name: '京东' },
        { name: '淘宝' },
        { name: '拼多多' }
      ],
      table2: [
        { name: '京东' },
        { name: '淘宝' },
        { name: '拼多多' },
        { name: '淘宝' },
        { name: '拼多多' },
        { name: '淘宝' },
        { name: '拼多多' },
        { name: '淘宝' },
        { name: '拼多多' },
        { name: '淘宝' },
        { name: '拼多多' }

      ],
      table3: [
        { name: '全部' },
        { name: '近30日' },
        { name: '近7日' },
        { name: '今日' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    commodityMgInfo() {
      this.$router.push({
        path: 'commodityMgInfo'
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  }
}
</script>
<style lang='scss' scoped>
.shaixuan{

}
.publishCommodity{
  padding-bottom:60px ;
}
.footer{
  z-index: 100;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.commodityimg{
  width: 100%;
}
.tableheard{
  // border-top: 2px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 5px 10px;
}
.searchInput{
  width: 300px;
}
.selectTime,.searchInfo{
  margin-top: 6px;
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f2f2f2;
}
.el-radio-button {
  margin-right: 20px;
  border: none;
}
.el-radio-button /deep/ .el-radio-button__inner {
  border: none;
  display: inline-table;
  border-radius: 4px;
}

.grid-content {
  line-height: 40px;
  white-space: nowrap;
  text-align: right;
}
.firstCearch {
  padding: 10px 10px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  color: #000;
  padding: 10px 0px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
