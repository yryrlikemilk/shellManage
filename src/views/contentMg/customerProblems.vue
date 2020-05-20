<template>
  <div class="advertising">
    <breadnar title="客户留言" />
    <div class="advertising-head">
      <div>
        <label for="input">搜索：</label>
        <el-input v-model="value" placeholder="用户名/ID/手机号" style="width:200px" />
      </div>
      <div>
        <label for="input">提交时间：</label>
        <el-date-picker
          v-model="value"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <div>
        <el-button size="medium">确定</el-button>
      </div>
      <div>
        <el-button size="medium">重置</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="ID" align="center" />
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="address" label="手机号" align="center" />
        <el-table-column prop="name" label="留言内容" align="center" />
        <el-table-column prop="name" label="提交时间" align="center" />
        <el-table-column prop="name" label="处理人" align="center" />
        <el-table-column prop="name" label="处理时间" align="center" />
        <el-table-column prop="name" label="处理备注" align="center" />
        <el-table-column prop="name" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope" style="color:#E6A23C">未处理</span>
            <span v-else style="color:#67C23A">下线</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="dialogshow(scope.$index, tableData)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="open(scope.$index, tableData)"
            >处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page.sync="currentPage2"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes, prev, pager, next,total"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="客户留言" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户信息：" :label-width="formLabelWidth">
          <p>CCCkfjdg（ID：0120</p>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <p>18293912013</p>
        </el-form-item>
        <el-form-item label="留言信息：" :label-width="formLabelWidth">
          <p>珍珠不返回了，怎么回事</p>
        </el-form-item>

        <el-form-item label="处理备注：" :label-width="formLabelWidth">
          <el-input
            v-model="textarea"
            type="textarea"
            :rows="6"
            style="max-width:300px"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      textarea: '',
      value1: '',
      status: '',
      img: [],
      currentPage2: 1,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    open() {
      this.$confirm('是否继续删除?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    dialogshow() {
      this.dialogFormVisible = true
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    deleteRow() {}
  }
}
</script>
<style lang='scss' scoped>
.advertising {
  padding: 20px;
  &-head {
    display: flex;
    align-items: center;
    margin: 20px 0;
    div{
      margin-right: 10px;
    }
  }
}
label {
  font-size: 14px;
  font-weight: 400;
}
.el-select {
  margin-right: 10px;
}
.el-pagination {
  float: right;
  margin: 20px 0;
}
.el-form {
  width: 60%;
}

</style>
