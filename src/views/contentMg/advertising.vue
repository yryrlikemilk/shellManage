<template>
  <div class="advertising">
    <breadnar title="广告管理" />
    <div class="advertising-head">
      <div>
        <label for="select">类型：</label>
        <el-select id="select" v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <label for="select1">广告分类：</label>
        <el-select id="select1" v-model="form.category" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button size="medium" @click="dialogshow()">新增</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="idStr" label="ID" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="typeName" label="类型" align="center" />
        <el-table-column prop="externalUrl" label="链接" align="center" />
        <el-table-column prop="categoryName" label="广告分类" align="center" />
        <el-table-column prop="sequence" label="排序" align="center" />
        <!-- <el-table-column prop="name" label="点击次数" align="center" /> -->
        <el-table-column prop="rawAddTimeStr" label="更新时间" align="center" />
        <el-table-column prop="loginName" label="创建人" align="center" />
        <el-table-column prop="statusName" label="状态" align="center">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.status==='1'" style="color:#E6A23C">上线</span>
            <span v-else style="color:#67C23A">下线</span>
          </template> -->
        </el-table-column>
        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="dialogshow(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="open(scope.row.idStr)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog title="编辑广告" :visible.sync="dialogFormVisible" width="760px">
      <el-form v-if="dialogFormVisible" ref="uploadForm" :model="uploadForm" :rules="rouls" hide-required-asterisk>
        <el-form-item label="广告名称：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="uploadForm.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选择类型：" :label-width="formLabelWidth" prop="type">
          <el-select v-model="uploadForm.type" placeholder="请选择">
            <el-option label="内链" value="1" />
            <el-option label="外链" value="2" />
            <el-option label="无连接" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="uploadForm.type==='2'" label="外链：" :label-width="formLabelWidth" prop="externalUrl">
          <el-input v-model="uploadForm.externalUrl" autocomplete="off">
            <template slot="prepend">
              <div class="prepend">
                Http://
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="uploadForm.type==='1'" label="商城：" :label-width="formLabelWidth" prop="mallCode">
          <el-select v-model="uploadForm.mallCode" placeholder="请选择">
            <el-option label="京东" value="1" />
            <el-option label="淘宝" value="2" />
            <el-option label="拼多多" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="uploadForm.type==='1'" label="商城商品ID：" :label-width="formLabelWidth" prop="mallGoodsId">
          <el-input v-model="uploadForm.mallGoodsId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="广告分类：" :label-width="formLabelWidth" prop="category">
          <el-select v-model="uploadForm.category" placeholder="请选择">
            <el-option label="首页banner" value="1" />
            <el-option label="首页广告" value="2" />
            <el-option label="淘宝banner" value="3" />
            <el-option label="京东banner" value="4" />
            <el-option label="拼多多banner" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth" prop="uploadFile">
          <listupload v-model="uploadForm.uploadFile" />
          分辨率1053*372
        </el-form-item>

        <el-form-item label="排序：" :label-width="formLabelWidth" prop="sequence">
          <el-input v-model="uploadForm.sequence" autocomplete="off" type="number" />
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
          <switchel v-model="uploadForm.status" activetext="上线" inactivetext="下线" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('uploadForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { facade, add, deletedata, update } from '@/api/advertising'
import switchel from '@/components/switchel/index'
import listupload from './components/uploadImg'
import { changeformdata } from '@/utils/formdata'
export default {
  components: {
    switchel,
    listupload
  },
  data() {
    return {
      rouls: {
        uploadFile: [{ required: true, message: '请上传图片', trigger: ['blur', 'change'] }],
        title: [{ required: true, message: '请输入广告名称', trigger: ['blur', 'change'] }],
        type: [{ required: true, message: '请选择类型', trigger: ['blur', 'change'] }],
        mallCode: [{ required: true, message: '请选择商城', trigger: ['blur', 'change'] }],
        mallGoodsId: [{ required: true, message: '请输入商城商品id', trigger: ['blur', 'change'] }],
        externalUrl: [{ required: true, message: '请输入外链地址', trigger: ['blur', 'change'] }],
        status: [{ required: true, message: '请选择状态', trigger: ['blur', 'change'] }],
        sequence: [{ required: true, message: '请输入排序', trigger: ['blur', 'change'] }],
        category: [{ required: true, message: '请选择广告分类', trigger: ['blur', 'change'] }]
      },
      total: 30,
      status: '',
      img: [],
      currentPage2: 1,
      tableData: [
      ],
      // 广告分类 1-首页banner，2-首页广告，3-淘宝banner，4-京东banner，5-拼多多banner
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '首页banner'
        },
        {
          value: '2',
          label: '首页广告'
        },
        {
          value: '3',
          label: '淘宝banner'
        },
        {
          value: '4',
          label: '京东banner'
        },
        {
          value: '5',
          label: '拼多多banner'
        }
      ],
      options1: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '内链'
        },
        {
          value: '2',
          label: '外链'
        },
        {
          value: '3',
          label: '无连接'
        }
      ],
      value: '',
      dialogFormVisible: false,
      uploadForm: {
        uploadFile: [],
        title: '',
        type: '',
        mallCode: '',
        mallGoodsId: '',
        externalUrl: '',
        category: '',
        sequence: '',
        status: '1'
      },
      form: {
        category: '',
        type: '',
        pageSize: 10,
        currentPage: 1,
        totalRows: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {},
  watch: {
    form: {
      handler(value) {
        this.getdata()
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    uploadData() {
      const formdata = changeformdata(this.uploadForm)
      if (this.uploadForm.idString) {
        update(formdata).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getdata()
        })
      } else {
        add(formdata).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getdata()
        })
      }
      this.dialogFormVisible = false
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.uploadData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getdata() {
      facade({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
      })
    },
    open(value) {
      this.$confirm('是否继续删除?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteRow(value)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    dialogshow(value) {
      if (value) {
        const { idStr: idString, imgUrl, externalUrl, title, type, mallCode, mallGoodsId, category, sequence, status } = value
        this.uploadForm = { idString, externalUrl, title, type, mallCode, mallGoodsId, category, sequence, status }
        this.uploadForm.uploadFile = []
        this.uploadForm.uploadFile.push({ url: imgUrl })
      } else {
        this.uploadForm = {}
        this.uploadForm.status = '1'
      }
      this.dialogFormVisible = true
    },
    handleSizeChange(value) {
      this.form.pageSize = value
    },
    handleCurrentChange(value) {
      this.form.currentPage = value
    },
    deleteRow(value) {
      deletedata({ idString: value }).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getdata()
      })
    }
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
