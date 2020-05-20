<template>
  <div>
    <h4>活跃度明细</h4>
    <div>
      <el-row>
        <el-col :span="8">
          <div>
            <p>类别：</p>
            <el-select v-model="form.activityCode" clearable placeholder="请选择">
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
            <p>方式：</p>
            <el-select v-model="form.style" clearable placeholder="请选择">
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
            <p>时间：</p>
            <el-date-picker
              v-model="seletTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div>
          <p>总活跃度：</p>
          <p class="number">{{ totalActivity }}</p>
          <!-- <p>个</p> -->
        </div></el-col>
        <el-col :span="6">
          <div>
            <p>个人活跃度：</p>
            <p class="number">{{ userActivity }}</p>
            <!-- <p>个</p> -->
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <p>加成活跃度：</p>
            <p class="number">{{ userAdditionActivity }}</p>
            <!-- <p>个</p> -->
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
            prop="rawAddTimeStr"
            label="时间"
            align="center"
          />
          <el-table-column
            prop="activityCodeName"
            label="类别"
            align="center"
          />
          <el-table-column
            prop="explanation"
            label="描述"
            align="center"
          />
          <el-table-column
            prop="styleName"
            label="方式"
            align="center"
          />
          <el-table-column
            prop="activity"
            label="活跃度"
            align="center"
          />
          <el-table-column
            prop="activityAfter"
            label="剩余个人活跃度"
            align="center"
            min-width="160px"
          />
          <el-table-column
            prop="activityAdditionAfter"
            label="剩余加成活跃度"
            align="center"
            min-width="160px"
          />
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
    </div>
  </div>
</template>

<script>
import { userActivityFlow } from '@/api/userMg'
export default {
  components: {},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      total: 0,
      tableData: [],
      seletTime: null,
      currentPage2: 1,
      form: {
        idStr: this.id,
        activityCode: '',
        style: '',
        rawAddTimeMin: '',
        rawAddTimeMax: '',
        pageSize: 10,
        nextPage: '',
        prePage: '',
        lastPage: '',
        currentPage: 1
      },
      userAdditionActivity: '',
      totalActivity: '',
      userActivity: '',
      options: [
        {
          value: '1',
          label: '个人活跃度'
        },
        {
          value: '2',
          label: '加成活跃度'
        }
      ],
      options1: [
        {
          value: '1',
          label: '增加'
        },
        {
          value: '2',
          label: '扣除'
        }
      ],
      value: ''
    }
  },
  computed: {},
  watch: {
    'form.style'() {
      this.getdata()
    },
    'form.activityCode'() {
      this.getdata()
    },
    seletTime(val) {
      [this.form.rawAddTimeMin, this.form.rawAddTimeMax] = val
      this.getdata()
    }

  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      userActivityFlow({ ...this.form }).then(res => {
        const { userAdditionActivity, totalActivity, userActivity, pagerForActivity } = res.object
        this.userAdditionActivity = userAdditionActivity
        this.totalActivity = totalActivity
        this.userActivity = userActivity
        this.tableData = pagerForActivity.list
        this.total = pagerForActivity.total
      })
    },
    deleteRow() {

    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getdata()
    },
    handleCurrentChange(val) {
      this.form.currentPage = val
      this.getdata()
    }
  }
}
</script>
<style lang='scss' scoped>
.title2{
  margin-top: 80px;
}
.el-pagination{
  float:right;
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
