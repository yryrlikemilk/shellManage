<template>
  <div>
    <h4>小视频管理</h4>
    <div>
      <el-row>
        <el-col :span="8">
          <div>
            <p>状态：</p>
            <el-select v-model="form.status" clearable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p>类型：</p>
            <el-select v-model="form.type" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p>时间：</p>
            <el-date-picker
              v-model="valuetime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px"
        >
          <el-table-column
            prop="idStr"
            label="ID"
            align="center"
            min-width="150"
          />
          <el-table-column prop="cover" label="视频" align="center" width="200">
            <template slot-scope="scope">
              <img :src="scope.row.cover" width="80%">
            </template>
          </el-table-column>
          <el-table-column
            prop="videoType"
            label="类型"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.videoType==='1'">个人发布</span>
              <span v-else>喜欢的视频</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="发布用户"
            align="center"
            min-width="150"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.userIdStr">{{ scope.row.nikeName }} <br>( <span class="userId" @click="jumpInfo(scope.row.userIdStr )">{{ scope.row.userIdStr }}</span>  )</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="videoTitle"
            label="内容"
            align="center"
          />
          <el-table-column
            prop="rawAddTime"
            label="发布时间"
            align="center"
            min-width="140"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.rawAddTime">{{ parstime(scope.row.rawAddTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="审核时间"
            align="center"
            min-width="140"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.deleteTime">{{ parstime(scope.row.deleteTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="审核备注"
            align="center"
          />
          <el-table-column
            prop="praise"
            label="喜欢人数"
            align="center"
          />
          <el-table-column
            prop="rewardNum"
            label="获得打赏珍珠"
            align="center"
          />
          <el-table-column
            prop="videoStatus"
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.videoStatus==='0'" style="color:#E6A23C">未审核</span>
              <span v-else-if="scope.row.videoStatus==='1'" style="color:#67C23A">已审核</span>
              <span v-else style="color:#F56C6C">未通过</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.videoStatus==='2'"
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.row)"
              >
                查看
              </el-button>
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
      <el-dialog
        v-if="show"
        title="视频"
        :visible.sync="show"
        width="35%"
      >
        <div class="dialogvideo">
          <video :src="videopath" class="video" controls="controls">
            您的浏览器不支持播放视频
          </video>
          <p>{{ dialogvalue.videoTitle }}</p>
          <p>用户：{{ dialogvalue.nikeName }}（ID:{{ dialogvalue.userIdStr }}）</p>
          <p>发布时间：{{ parstime(dialogvalue.rawAddTime) }}</p>
          <p>状态：{{ dialogvalue.videoStatus|statuschange }}</p>
          <p style="text-align: right">总获得珍珠 {{ totalNum }}</p>
          <el-table
            :data="videotable"
            border
            style="width: 100%"
          >
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
                <span>{{ parstime(scope.row.rawAddTime ) }}</span>
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
            :pager-count="5"
            :current-page.sync="videoForm.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="videoForm.pageSize"
            layout="sizes, prev, pager, next"
            :total="videototal"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="show = false">取 消</el-button> -->
          <!-- <el-button type="primary" @click="show = false">确 定</el-button> -->
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import jump from '@/utils/userInfo'
import { findVideoList } from '@/api/userMg'
import { getRewardList, getVideoUrl } from '@/api/videoMg'
export default {
  components: {},
  filters: {
    statuschange(d) {
      switch (d) {
        case '0':
          return '未审核'
        case '1':
          return '已审核'
        case '2':
          return '未通过'
        default:
          return d
      }
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      videopath: '',
      total: 0,
      form: {
        userId: this.id,
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        currentPage: 1,
        pageSize: 10
      },
      tableData: [],
      value1: '',
      currentPage2: 1,
      show: false,
      dialogvalue: {},
      videotable: [],
      videototal: 0,
      videoForm: {
        videoId: '',
        userId: '',
        pageSize: 10,
        currentPage: 1
      },
      options: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '发布视频'
        }, {
          value: '2',
          label: '喜欢视频'
        }
      ],
      options1: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '未审核'
        }, {
          value: '1',
          label: '已审核'
        }, {
          value: '2',
          label: '未通过'
        }
      ],
      value: '',
      totalNum: 0,
      valuetime: []
    }
  },
  computed: {
  },
  watch: {
    valuetime(value) {
      if (value === null) {
        value = new Array(2)
      }
      [this.form.startTime, this.form.endTime] = value
    },
    form: {
      handler() {
        this.getdata()
      },
      deep: true
    },
    videoForm: {
      handler() {
        this.videodata()
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      findVideoList({ ...this.form }).then(res => {
        this.tableData = res.object.list
        this.total = res.object.total
      })
    },
    videodata() {
      getRewardList({ ...this.videoForm }).then(res => {
        this.videotable = res.object.rewardResult.list
        this.videototal = res.object.rewardResult.total
        this.totalNum = res.object.totalNum
      })
    },
    getvideoPath(value) {
      getVideoUrl(value).then(res => {
        this.videopath = res.object.videoPath
      })
    },
    changetype(value) {
      switch (value) {
        case '0':
          return '1'
        case '1':
          return '2'
        case '2':
          return '1'
        default:
          return value
      }
    },
    deleteRow(value) {
      this.dialogvalue = value
      this.videoForm.videoId = value.idStr
      this.videoForm.userId = value.userIdStr
      this.getvideoPath({ videoKey: value.videoPath, type: this.changetype(value.videoStatus) })
      // this.videodata()
      this.show = true
    },
    jumpInfo(value) {
      jump(value)
    },
    handleSizeChange(e) {
      this.form.pageSize = e
    },
    handleCurrentChange(e) {
      this.form.currentPage = e
    },
    handleSizeChange1(e) {
      this.videoForm.pageSize = e
    },
    handleCurrentChange1(e) {
      this.videoForm.currentPage = e
    }

  }
}
</script>
<style lang='scss' scoped>
.userId{
  color: #409eff;
  cursor: pointer;
}
.el-pagination{
  // width: 100%;
  text-align: right;
  overflow: hidden;
}
.dialogvideo{
  p{
    margin-top: 5px;
  }
}
.video{
  height: 300px;
  background-color: black;
  width: 100%;
}
.title2{
  margin-top: 80px;
}
.el-pagination{
  margin-top: 20px;
}
.el-row {
  .el-col {
    margin-top: 20px;
    div{
      P{
        font-size: 14px;
        white-space: nowrap;
        padding-right:5px;
      }
      .number{
        color: #409eff;
      }
    display: flex;
    align-items: center;
    }

  }
}
</style>
