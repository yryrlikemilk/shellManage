<template>
  <div>
    <div style="padding:20px">
      <breadnar title="类目管理" />
    </div>
    <div v-if="false" class="taobao">
      <div style=" border: 2px solid #f2f2f2;border-radius: 5px;">
        <div class="taobao-title">
          <h4>淘宝商品分类</h4>
          <el-button size="small" @click="dialogVisible=true">管理</el-button>
        </div>

        <el-row class="taobao-body">
          <el-col v-for="item in tabledata" :key="item.idStr" :span="2" style="margin-bottom:10px">
            <el-tag v-if="item.isShow==='1'">{{ item.categoryName }}</el-tag>
          </el-col>

        </el-row>
        <div v-if="tabledata.length===0" class="taobao-null">
          暂无分类
        </div>
      </div>
    </div><div class="taobao">
      <div style=" border: 2px solid #f2f2f2;border-radius: 5px;">
        <div class="taobao-title">
          <h4>京东商品分类</h4>
          <el-button size="small" @click="showdata('京东')">管理</el-button>
        </div>

        <el-row class="taobao-body" :gutter="10">
          <div v-for="item in categoryJD" :key="item.categoryIdStr">
            <el-col v-if="item.isShow==='1'" :xs="6" :sm="4" :md="4" :lg="3" :xl="2" style="margin-bottom:10px">
              <el-tag>{{ item.categoryName }}</el-tag>
            </el-col>
          </div>

        </el-row>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div slot="title" class="dialogtitle">
        <h4> {{ title }}</h4> <span>勾选为显示</span>
      </div>
      <div class="dialogbody">
        <div v-for="(item,index) in categoryJD" :key="index" class="dialogch">
          <el-checkbox v-model="item.isShow" false-label="0" true-label="1" @change="updatedata(categoryJD)">{{ item.categoryName }}</el-checkbox>
        </div>

      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { facade, update } from '@/api/InsideMg'
export default {
  components: {},
  data() {
    return {
      categoryIdStr: '',
      title: '',
      tabledata: [],
      categoryJD: [],
      dialogVisible: false,
      checked: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    updatedata(value) {
      const up = []
      value.map(element => {
        up.push({ categoryIdStr: element.categoryIdStr, isShow: element.isShow })
      })
      update(up).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.getdata()
      })
    },
    showdata(title) {
      this.title = `${title}商品分类`
      this.dialogVisible = true
    },
    getdata() {
      facade().then(res => {
        this.categoryJD = res.object
      })
    },
    handleClose() {

    }
  }
}
</script>
<style  scoped>
.taobao{
  padding:0 20px 20px 20px;

}
.taobao-null{
  text-align: center;
  padding: 10px 0;
  color: #909399;
}
.dialogbody{
  text-align: center;
  overflow: hidden;
}
.dialogtitle span{
  padding-left: 20px;
  color: #409eff;
  font-size: 14px;
}
.dialogtitle{
  display: flex;
  align-items: flex-end;
}
.taobao-title{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px 20px 10px 10px;
}
.taobao-body{
  margin-top: 10px;
  padding-left: 10px;
}
h4{
  margin: 0;
}
.dialogch{
  float: left;
  margin: 0 20px 10px 0;
}
</style>
