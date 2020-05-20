<template>
  <div class="videoMg">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <label for="select">类型：</label>
        <el-select id="select" v-model="form.videoStatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="13" :md="13" :lg="10" :xl="7">
        <label for="picker">
          提交时间：
          <el-date-picker
            v-model="timevalue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            style="width:380px"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </label>
      </el-col>
      <el-col :xs="24" :sm="12" :md="13" :lg="8" :xl="6" class="seach">
        <label for="input">
          搜索：
          <el-input v-model="form.param" placeholder="请输入昵称/内容" style="width:200px" />
        </label>
        <el-button size="medium" type="primary" @click="search(form.param)">搜索</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="idStr" label="ID" align="center" min-width="175" />
      <el-table-column prop="videoPath" label="视频" align="center" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.cover" width="80%">
        </template>
      </el-table-column>
      <el-table-column prop="userIdStr" label="用户" align="center" min-width="205">
        <template slot-scope="scope">
          <p v-if="scope.row.userIdStr">{{ scope.row.nikeName }} <br>( <span class="userId" @click="jumpInfo(scope.row.userIdStr )">{{ scope.row.userIdStr }}</span>  )</p>
        </template>
      </el-table-column>
      <el-table-column prop="videoTitle" label="内容" align="center" min-width="175" />
      <el-table-column label="发布时间" align="center" min-width="175">
        <template slot-scope="scope">
          <span v-if="scope.row.rawAddTime">{{ scope.row.rawAddTime|setTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rawUpdateTime" label="审核时间" align="center" min-width="175">
        <template slot-scope="scope">
          <span v-if="scope.row.deleteTime">{{ scope.row.deleteTime|setTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="praise" label="喜欢人数" align="center" />
      <el-table-column prop="remark" label="审核备注" align="center" min-width="100" />
      <el-table-column prop="rewardNum" label="获得打赏珍珠" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.rewardNum||0 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.videoStatus==='0'" style="color:#E6A23C">未审核</span>
          <span v-else-if="scope.row.videoStatus==='1'" style="color:#67C23A">已审核</span>
          <span v-else-if="scope.row.videoStatus==='2'" style="color:#F56C6C">未通过</span>
        </template>
      </el-table-column>
      <el-table-column label="评论" width="110" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="open(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.videoStatus==='0'"
            type="text"
            size="small"
            @click.native.prevent="dialogshow(scope.row)"
          >审核</el-button>
          <el-button
            v-if="scope.row.videoStatus==='1'"
            type="text"
            size="small"
            @click.native.prevent="examineShow(scope.row)"
          >查看</el-button>
          <el-button
            v-if="scope.row.videoStatus!=='0'"
            type="text"
            size="small"
            @click.native.prevent="deleteIs(scope.row)"
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
      <el-dialog title="视频" :visible.sync="dialogVisible" width="30%" :destroy-on-close="true" :before-close="handleClose">
        <div class="videoinfo">
          <video :src="href" width="100%" height="300px" class="video" controls />
          <p>{{ ExamineVideodialog.videoTitle }}</p>
          <p>用户：{{ ExamineVideodialog.nikeName }}（ID:{{ ExamineVideodialog.userIdStr }}）</p>
          <p>发布时间：{{ ExamineVideodialog.rawAddTime|setTime }}</p>
          <div style="margin-top:10px">
            <label for="group">审核：</label>
            <el-radio-group v-model="radio3" size="small">
              <el-radio label="1" border>通过</el-radio>
              <el-radio label="2" border>不通过</el-radio>
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
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="ExamineVideo">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="评论" :visible.sync="dialogVisible1" width="42%">
        <div class="videoinfo">
          <!-- <video src="@/assets/test.mp4" width="100%" controls /> -->
          <p>{{ ExamineVideodialog.videoTitle }}</p>
          <p>用户：{{ ExamineVideodialog.nikeName }}（ID:{{ ExamineVideodialog.userIdStr }}）</p>
          <p>发布时间：{{ ExamineVideodialog.rawAddTime|setTime }}</p>
          <p>状态：{{ ExamineVideodialog.videoStatus| status }}</p>
          <div>
            <el-table :data="commentlist" border style="width: 100%">
              <el-table-column prop="commentName" label="评论用户" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.commentName }}({{ scope.row.commentId }})</span>
                </template>
              </el-table-column>
              <el-table-column prop="rawUpdateTime" label="评论时间" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.rawUpdateTime|setTime }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="评论内容" align="center" />
              <el-table-column prop="name" label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteMessage(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              :current-page.sync="videoComment.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="videoComment.pageSize"
              layout="sizes, prev, pager, next,total"
              :total="commentlisttotal"
              :pager-count="5"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
            />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible1 = false">取 消</el-button> -->
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-if="dialogVisiblevideo" title="视频" :visible.sync="dialogVisiblevideo" width="42%">
        <div class="videoinfo">
          <!-- <myVideo :videosrc="href" /> -->
          <video width="100%" height="300px" class="video" controls>
            <source :src="href" type="video/mp4">
          </video>
          <p>{{ ExamineVideodialog.videoTitle }}</p>
          <p>用户：{{ ExamineVideodialog.nikeName }}（ID:{{ ExamineVideodialog.userIdStr }}）</p>
          <p>发布时间：{{ ExamineVideodialog.rawAddTime|setTime }}</p>
          <p>状态：{{ ExamineVideodialog.videoStatus| status }}</p>
          <p style="text-align: right;">总获得珍珠：{{ totalNum }}</p>
          <div>
            <el-table :data="RewardList" border style="width: 100%">
              <el-table-column prop="commentName" label="打赏用户名" align="center" min-width="160">
                <template slot-scope="scope">
                  <span>{{ scope.row.nikeName }}<br>({{ scope.row.userIdStr }})</span>
                </template>
              </el-table-column>
              <el-table-column prop="rewardMoney" label="打赏珍珠" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.rewardMoney }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="rawAddTime" label="打赏时间" align="center" min-width="140">
                <template slot-scope="scope">
                  <span>{{ scope.row.rawAddTime|setTime }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="serviceCharge" label="手续费" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.serviceCharge*1 }}%</span>
                </template>
              </el-table-column>
              <el-table-column prop="rewardNum" label="获得珍珠" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.rewardNum">{{ scope.row.rewardNum }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              :current-page.sync="RewardListForm.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="RewardListForm.pageSize"
              layout="sizes, prev, pager, next,total"
              :total="RewardListTotal"
              :pager-count="5"
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
            />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible1 = false">取 消</el-button> -->
          <el-button type="primary" @click="dialogVisiblevideo = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
// import myVideo from '@/components/video'
import jump from '@/utils/userInfo'
import { qryAllVideo, getVideoUrl, videoCommentList, toExamineVideo, getRewardList, toExamineComment } from '@/api/videoMg'
export default {
  components: {
    // myVideo
  },
  filters: {
    setTime(d) {
      return d ? parseTime(d) : ''
    },
    status(d) {
      switch (d) {
        case '0':
          return '未审核'
        case '1':
          return '已审核'
        default:
          return '未通过'
      }
    }
  },
  data() {
    return {
      totalNum: 0,
      loading: true,
      href: '',
      timevalue: [],
      total1: 0,
      total: 0,
      textarea: '',
      radio3: '1',
      dialogVisiblevideo: false,
      dialogVisible1: false,
      dialogVisible: false,
      currentPage2: 1,
      commentlist: [],
      tableData: [],
      input: '',
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
          label: '已审核'
        }, {
          value: '2',
          label: '未通过'
        }
      ],
      value: '',
      commentlisttotal: 0,
      videoComment: {
        pageSize: 10,
        currentPage: 1,
        commentId: '',
        status: '',
        remark: '',
        videoId: '',
        nikeName: '',
        content: '',
        contentName: '',
        startTime: '',
        endTime: '',
        type: ''
      },
      RewardListForm: {
        pageSize: 10,
        currentPage: 1,
        userId: '',
        videoId: ''
      },
      RewardList: [],
      RewardListTotal: 0,
      ExamineVideodialog: {

      },
      wComment: {
        type: '1',
        commentId: '',
        videoId: '',
        status: '',
        remark: ''
      },
      ExamineVideoform: {
        id: '',
        videoPath: '',
        status: '',
        remark: '',
        type: ''
      },
      form: {
        param: '',
        videoStatus: '',
        pageSize: 10,
        currentPage: 1,
        startTime: '',
        endTime: ''
      }
    }
  },
  computed: {},
  watch: {
    radio3(value) { if (value === '1') { this.textarea = '' } },
    form: {
      handler() { this.getdata() },
      deep: true
    },
    RewardListForm: {
      handler() { this.showGetRewardList() },
      deep: true
    },
    videoComment: {
      handler() { this.Comment() },
      deep: true
    },
    timevalue(value) {
      if (value === null) {
        value = new Array(2)
      }
      [this.form.startTime, this.form.endTime] = value
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    examineShow(value) {
      getVideoUrl({ videoKey: value.videoPath, type: '2' }).then(res => {
        this.href = res.object.videoPath
        this.dialogVisiblevideo = true
      })
      this.ExamineVideodialog = value
      this.RewardListForm.userId = value.userIdStr
      this.RewardListForm.videoId = value.idStr
    },
    showGetRewardList() {
      getRewardList({ ...this.RewardListForm }).then(res => {
        this.RewardList = res.object.rewardResult.list
        this.RewardListTotal = res.object.rewardResult.total
        this.totalNum = res.object.totalNum
      })
    },
    deleteIs(value) {
      this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletevideo(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deletevideo(value) {
      toExamineVideo({ type: '1', id: value.idStr }).then(res => {
        this.$message({
          type: 'success',
          message: '视频删除成功'
        })
        this.getdata()
      })
    },
    handleClose() {
      this.radio3 = '1'
      this.textarea = ''
      this.dialogVisible = false
    },
    ExamineVideo() {
      this.ExamineVideoform.id = this.ExamineVideodialog.idStr
      this.ExamineVideoform.videoPath = this.ExamineVideodialog.videoPath
      this.ExamineVideoform.status = this.radio3
      this.ExamineVideoform.remark = this.textarea
      this.ExamineVideoform.type = '0'

      toExamineVideo({ ...this.ExamineVideoform }).then(res => {
        this.$message({
          type: 'success',
          message: '审核成功'
        })
        this.getdata()
      })
      this.handleClose()
    },
    search(value) {
      this.form.param = value
      this.form.videoStatus = ''
      this.form.currentPage = 1
      this.form.startTime = ''
      this.form.endTime = ''
    },
    jumpInfo(value) {
      jump(value)
    },
    Comment() {
      videoCommentList({ ...this.videoComment }).then(res => {
        this.commentlist = res.object.list
        this.commentlisttotal = res.object.total
      })
    },
    changedata(value) {
      const { idStr } = value
      this.ExamineVideodialog = value
      this.videoComment.videoId = idStr
    },
    open(value) {
      this.changedata(value)
      this.dialogVisible1 = true
    },
    ExamineComment() {
      toExamineComment({ ...this.wComment }).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.Comment()
      })
    },
    deleteMessage(value) {
      this.$confirm('此操作将永久删除评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { idStr: id } = value
        this.wComment = { id, type: '1', videoId: this.ExamineVideodialog.idStr }
        this.ExamineComment()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getdata() {
      this.loading = true
      qryAllVideo({ ...this.form }).then(res => {
        const { total, list } = res.object
        setTimeout(() => {
          this.tableData = list
          this.total = total
          this.loading = false
        }, 1000)
      })
    },
    handleSizeChange(value) {
      this.form.pageSize = value
    },
    handleCurrentChange(value) {
      this.form.currentPage = value
    },
    handleSizeChange1(value) {
      this.videoComment.pageSize = value
    },
    handleCurrentChange1(value) {
      this.videoComment.currentPage = value
    },
    handleSizeChange2(value) {
      this.RewardListForm.pageSize = value
    },
    handleCurrentChange2(value) {
      this.RewardListForm.currentPage = value
    },
    dialogshow(value) {
      getVideoUrl({ videoKey: value.videoPath, type: '1' }).then(res => {
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
.el-dialog__body{
  padding: 0 20px;
}
#pagination {
  position: static;
  margin-top: 10px;
  text-align: right;
}
.remark {
  display: flex;
  margin-top: 10px;
}
.videoinfo {
  overflow: hidden;
  p {
    margin-top: 10px;
  }
}
label {
  font-weight: 400;
  font-size: 14px;
}
.video{
  background: black;
}
.videoMg {
  &-head {
    display: flex;
    align-items: center;
  }
}
.el-row {
  .el-col {
    margin-bottom: 10px;
  }
}
.seach {
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 10px;
  }
}
.el-pagination {
 text-align: right;
 padding-top: 15px;
}
</style>
