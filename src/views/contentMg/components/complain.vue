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
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <label for="select2">类型：</label>
        <el-select id="select2" v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
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
      <el-col :xs="24" :sm="12" :md="13" :lg="8" :xl="6" class="seach">
        <label for="input">搜索：
          <el-input v-model="form.param" placeholder="请输入投诉人ID" style="width:200px" />
        </label>
        <!-- <el-button size="medium" type="primary">确定</el-button> -->
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- <el-table-column prop="idStr" label="ID" align="center" min-width="150" /> -->
      <el-table-column prop="name" label="视频" align="center" min-width="140">
        <template slot-scope="scope">
          <img :src="scope.row.cover" width="80%">
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="发布用户" align="center" min-width="225">
        <template slot-scope="scope">
          <p>用户名：{{ scope.row.userName }}</p>
          <p>(ID：<span class="userId" @click="jumpInfo(scope.row.sendId )">{{ scope.row.sendId }}</span>  )</p>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="内容" align="center" min-width="140" />
      <el-table-column prop="name" label="发布时间" align="center" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.sendTime|setTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="投诉人" align="center" min-width="225">
        <template slot-scope="scope">
          <p>用户名：{{ scope.row.nickName }}</p>
          <p>(ID：<span class="userId" @click="jumpInfo(scope.row.userIdStr )">{{ scope.row.userIdStr }}</span>  )</p>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="投诉类型" align="center" />
      <el-table-column prop="rawAddTime" label="投诉时间" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.rawAddTime|setTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deleteTime" label="审核时间" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.deleteTime|setTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="审核备注" align="center" />
      <el-table-column prop="name" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==='0'" style="color:#E6A23C">未审核</span>
          <span v-else-if="scope.row.status==='1'" style="color:#E6A23C">已处理</span>
          <span v-else style="color:#67C23A">不处理</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.complainType==='1'&&scope.row.status==='0'"
            type="text"
            size="small"
            @click.native.prevent="dialogshow(scope.row)"
          >审核</el-button>
          <el-button
            v-if="scope.row.complainType==='2'&&scope.row.status==='0'"
            type="text"
            size="small"
            @click.native.prevent="open(scope.row)"
          >审核</el-button>
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
        :before-close="handleClose"
      >
        <div class="videoinfo">
          <div class="videoinfo-file">
            <video :src="href" width="100%" height="300" controls />
          </div>
          <p>{{ ExamineVideodialog.content }}</p>
          <p>用户：{{ ExamineVideodialog.userName }}（ID:{{ ExamineVideodialog.sendId }}）</p>
          <p>发布时间：{{ ExamineVideodialog.sendTime|setTime }}</p>
          <p>投诉用户：{{ ExamineVideodialog.nickName }}（ID:{{ ExamineVideodialog.userIdStr }}）</p>
          <p>投诉时间：{{ ExamineVideodialog.rawAddTime|setTime }}</p>
          <div style="margin-top:10px">
            <label for="group">审核：</label>
            <el-radio-group v-model="radio3" size="small">
              <el-radio label="2" border>不处理</el-radio>
              <el-radio label="1" border>投诉处理</el-radio>
            </el-radio-group>
          </div>

          <div v-if="radio3==='1'" class="remark">
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
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="videochange">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import jump from '@/utils/userInfo'
import { userComplaintList, getVideoUrl, toExamineComplain } from '@/api/videoMg'
export default {
  components: {},
  filters: {
    setTime(d) {
      return d ? parseTime(d) : ''
    }
  },
  data() {
    return {
      loading: true,
      href: '',
      textarea: '',
      radio3: '2',
      dialogVisible1: false,
      dialogVisible: false,
      currentPage2: 1,
      tableData: [],
      total: 0,
      input: '',
      options: [
        { label: '全部', value: '' },
        { label: '未处理', value: '0' },
        { label: '已处理', value: '1' },
        { label: '不处理', value: '2' }
      ],
      options1: [
        { label: '全部', value: '' },
        { label: '视频', value: '1' },
        { label: '评论', value: '0' }
      ],
      valuetime: [],
      form: {
        currentPage: 1,
        pageSize: 10,
        type: '',
        param: '',
        startTime: '',
        endTime: '',
        status: ''
      },
      ExamineVideodialog: {},
      ExamineComment: {}
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
    handleClose() {
      this.radio3 = '1'
      this.textarea = ''
      this.dialogVisible = false
    },
    videochange() {
      this.ExamineComment.status = this.radio3
      this.ExamineComment.remark = this.textarea
      this.ExamineComment.videoId = this.ExamineVideodialog.videoIdStr
      this.ExamineComment.id = this.ExamineVideodialog.idStr
      this.changedata()
    },
    changedata() {
      toExamineComplain({ ...this.ExamineComment }).then(res => {
        this.$message({
          type: 'success',
          message: '审核成功'
        })
        this.getdata()
        this.handleClose()
      })
    },
    open(value) {
      this.ExamineComment.id = value.idStr
      this.ExamineComment.videoId = value.videoIdStr
      // this.ExamineComment.commentId = value.commentId
      this.$confirm('审核是否通过?', '审核', {
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        distinguishCancelAndClose: true,
        center: true
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
    jumpInfo(value) {
      jump(value)
    },
    getdata() {
      this.loading = true
      userComplaintList({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
        this.loading = false
      })
    },
    handleSizeChange(value) {
      this.form.pageSize = value
    },
    handleCurrentChange(value) {
      this.form.currentPage = value
    },
    dialogshow(value) {
      getVideoUrl({ videoKey: value.videoPath, type: '2' }).then(res => {
        this.href = res.object.videoPath
        this.dialogVisible = true
      })
      this.ExamineVideodialog = value
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
