<template>
  <div class="videoMg">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <label for="select1">状态：</label>
        <el-select id="select1" v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <!-- <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <label for="select2">类型：</label>
        <el-select id="select2" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col> -->
      <el-col :xs="24" :sm="13" :md="13" :lg="10" :xl="7">
        <label for="picker">提交时间：
          <el-date-picker
            v-model="valuetime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:380px"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </label>
      </el-col>
      <!-- <el-col :xs="24" :sm="12" :md="13" :lg="8" :xl="6" class="seach">
        <label for="input">搜索：
          <el-input v-model="form.param" placeholder="请输入昵称/内容" style="width:200px" />
        </label>
        <el-button size="medium" type="primary">确定</el-button>
      </el-col> -->
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="idStr" label="ID" align="center" />
      <el-table-column prop="videoIdStr" label="视频" align="center" />
      <el-table-column prop="nikeName" label="发布用户" align="center" min-width="150">
        <template slot-scope="scope">
          <p>用户名：{{ scope.row.nikeName }}</p>
          <p>(ID：<span class="userId" @click="jumpInfo(scope.row.userId )">{{ scope.row.userId }}</span>  )</p>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="内容" align="center" /> -->
      <el-table-column prop="content" label="评论内容" align="center" />
      <el-table-column prop="commentName" label="评论人" align="center" />
      <el-table-column prop="rawUpdateTime" label="评论时间" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.rawUpdateTime|setTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deleteTime" label="审核时间" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.deleteTime|setTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==='0'" style="color:#E6A23C">未审核</span>
          <span v-else-if="scope.row.status==='2'" style="color:#E6A23C">未通过</span>
          <!-- <span v-else-if="scope.row.status==='0'" style="color:#E6A23C">已删除</span> -->
          <span v-else style="color:#67C23A">已通过</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==='0'"
            type="text"
            size="small"
            @click.native.prevent="open(scope.row)"
          >审核</el-button>
          <el-button
            v-else
            type="text"
            size="small"
            @click.native.prevent="open1(scope.row)"
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
    <div>
      <el-dialog
        title="视频"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <div class="videoinfo">
          <div class="videoinfo-file">
            <!-- <video src="@/assets/test.mp4" width="100%" height="300" controls /> -->
          </div>
          <p>内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述</p>
          <p>用户：shfdj（ID）</p>
          <p>发布时间：2020-12-12 12:00:00</p>
          <p>投诉用户：shfdj（ID）</p>
          <p>投诉时间：2020-12-12 12:00:00</p>
          <div style="margin-top:10px">
            <label for="group">审核：</label>
            <el-radio-group v-model="radio3" size="small">
              <el-radio label="1" border>不处理</el-radio>
              <el-radio label="2" border>撤销</el-radio>
            </el-radio-group>
          </div>

          <div v-if="radio3==='2'" class="remark">
            <label for="el-input">备注：</label>
            <el-input
              v-model="textarea"
              type="textarea"
              style="width:80%"
              :rows="6"
              placeholder="请输入内容"
            />

          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import jump from '@/utils/userInfo'
import { videoCommentList, toExamineComment } from '@/api/videoMg'
export default {
  components: {},
  filters: {
    setTime(d) {
      return d ? parseTime(d) : ''
    }
  },
  data() {
    return {
      form: {
        param: '',
        pageSize: 10,
        currentPage: 1,
        status: '',
        contentName: '',
        startTime: '',
        endTime: ''
      },
      textarea: '',
      radio3: '1',
      dialogVisible1: false,
      dialogVisible: false,
      currentPage2: 1,
      tableData: [],
      input: '',
      total: 0,
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '已通过'
        },
        {
          value: '2',
          label: '未通过'
        }
      ],
      value: '',
      valuetime: [],
      ExamineComment: {
        id: '',
        commentId: '',
        videoId: '',
        status: '',
        remark: ''
      }
    }
  },
  computed: {},
  watch: {
    valuetime(value) {
      if (value === null) { value = new Array(2) }
      [this.form.startTime, this.form.endTime] = value
    },
    form: {
      handler() { this.getdata() },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    jumpInfo(value) {
      jump(value)
    },
    getdata() {
      videoCommentList({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
      })
    },
    changedata() {
      toExamineComment({ type: '0', ...this.ExamineComment })
        .then(res => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          })
          this.getdata()
        })
    },
    open(value) {
      this.ExamineComment.id = value.idStr
      this.ExamineComment.videoId = value.videoIdStr
      this.ExamineComment.commentId = value.commentId
      this.$confirm('审核是否通过?', '审核', {
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        center: true,
        distinguishCancelAndClose: true
      }).then(() => {
        this.ExamineComment.status = '1'
        this.changedata()
      }).catch((action) => {
        if (action === 'cancel') {
          this.ExamineComment.status = '2'
          this.changedata()
        }
      })
    },
    deletedata() {
      toExamineComment({ type: '1', ...this.ExamineComment })
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getdata()
        })
    },
    open1(value) {
      this.ExamineComment.id = value.idStr
      this.ExamineComment.commentId = value.commentId
      this.ExamineComment.status = value.status
      this.$confirm('是否删除评论?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning',
        center: true
      }).then(() => {
        this.deletedata()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleSizeChange(value) {
      this.form.pageSize = value
    },
    handleCurrentChange(value) {
      this.form.currentPage = value
    },
    dialogshow() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
.userId{
  color: #409eff;
  cursor: pointer;
}
#pagination{
  position:static;
  margin-top: 10px;
  text-align: right;
}
.remark{
  display: flex;
  margin-top: 10px;
}
.videoinfo{
  overflow: hidden;
  &-file{
    background-color: black;
    text-align: center;
  }
  p{
    margin-top: 10px;
  }
}
label{
  font-weight: 400;
  font-size: 14px;
}
.videoMg{
  &-head{
    display: flex;
    align-items: center;

  }
}
.el-row{
  .el-col{
    margin-bottom: 10px;
  }
}
.seach{
      display: flex;
      align-items: center;
      .el-button{
        margin-left: 10px;
      }
    }
    .el-pagination{
      position: fixed;
      bottom: 20px;
      right: 20px;
    }
</style>
