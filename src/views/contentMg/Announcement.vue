<template>
  <div class="advertising">
    <breadnar title="公告管理" />
    <div class="advertising-head">
      <div>
        <label for="select">类型：</label>
        <el-select id="select" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <label for="select1">广告分类：</label>
        <el-select id="select1" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button size="medium" @click="dialogshow">新增</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="ID" align="center" />
        <el-table-column prop="name" label="标题" align="center" />
        <el-table-column prop="address" label="类型" align="center" />
        <el-table-column prop="name" label="链接" align="center" />
        <el-table-column prop="name" label="更新时间" align="center" />
        <el-table-column prop="name" label="创建人" align="center" />
        <el-table-column prop="name" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope" style="color:#E6A23C">上线</span>
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
            >删除</el-button>
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
    <el-dialog title="新增公告" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="公告名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选择类型：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="内链" value="1" />
            <el-option label="外链" value="2" />
            <el-option label="无连接" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.region==='2'" label="外链：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="prepend">
              <div class="prepend">
                Http://
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="form.region==='1'" label="商城：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="内链" value="1" />
            <el-option label="外链" value="2" />
            <el-option label="无连接" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.region==='1'" label="商城商品ID：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="广告分类：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="首页banner" value="1" />
            <el-option label="首页广告" value="2" />
            <el-option label="淘宝banner" value="3" />
            <el-option label="京东banner" value="4" />
            <el-option label="拼多多banner" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <listupload v-model="img" />
        </el-form-item>
        <el-form-item label="排序：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" type="number" />
        </el-form-item>
        <el-form-item label="排序：" :label-width="formLabelWidth">
          <switchel v-model="status" activetext="上线" inactivetext="下线" />
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
import switchel from '@/components/switchel/index'
import listupload from '@/components/Upload/listupload'
export default {
  components: {
    switchel,
    listupload
  },
  data() {
    return {
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
    justify-content: space-between;
    margin: 20px 0;
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
