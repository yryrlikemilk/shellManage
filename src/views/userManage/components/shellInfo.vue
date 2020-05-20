<template>
  <div>
    <h4>珍珠明细</h4>
    <div>
      <el-row>
        <el-col :span="8">
          <div>
            <p>类别：</p>
            <el-select v-model="form1.category" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsCategory"
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
            <el-select v-model="form1.style" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsWay"
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
              v-model="formTime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div>
          <p>珍珠数：</p>
          <p class="number">{{ prealNum }}</p>
          <p>个</p>
        </div></el-col>
        <el-col :span="6">
          <div>
            <p>总收入：</p>
            <p class="number">{{ incomePearl }}</p>
            <p>个</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <p>总支出：</p>
            <p class="number">{{ disbursePearl }}</p>
            <p>个</p>
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
            prop="categoryName"
            label="类别"
            align="center"
          />
          <el-table-column
            prop="typeName"
            label="类型"
            align="center"
          />
          <el-table-column
            prop="styleName"
            label="方式"
            align="center"
          />
          <el-table-column
            prop="pearlNumStr"
            label="珍珠数据"
            align="center"
          />
          <el-table-column
            prop="pearlNumAfter"
            label="结余"
            align="center"
          />
        </el-table>
        <el-pagination
          background
          :current-page.sync="form1.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="form1.pageSize"
          layout="sizes, prev, pager, next,total"
          :total="total1"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <h4 class="title2">冻结珍珠</h4>
    <div>
      <el-row>
        <el-col :span="8">
          <div>
            <p>状态：</p>
            <el-select v-model="form2.status" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsStatus"
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
            <el-select v-model="form2.type" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsType"
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
              v-model="formTime2"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div>
          <p>冻结珍珠：</p>
          <p class="number">{{ freezeNum }}</p>
          <p>个</p>
        </div></el-col>
        <el-col :span="6">
          <div>
            <p>进行中任务：</p>
            <p class="number">{{ processingNum }}</p>
            <p>个</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <p>已结束任务：</p>
            <p class="number">{{ overNum }}</p>
            <p>个</p>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-table
          :data="tableData1"
          border
          style="width: 100%;margin-top:20px"
        >
          <el-table-column
            prop="rawAddTimeStr"
            label="时间"
            align="center"
          />
          <el-table-column
            prop="typeName"
            label="类型"
            align="center"
          />
          <el-table-column
            prop="taskName"
            label="任务名"
            align="center"
          />
          <el-table-column
            prop="freezePearlNumTotal"
            label="冻结珍珠（个）"
            align="center"
          />
          <!-- <el-table-column
            prop="freezePearlNumTotal"
            label="珍珠数据"
            align="center"
          /> -->
          <el-table-column
            prop="releaseCycle"
            label="释放周期"
            align="center"
          />
          <el-table-column
            prop="releaseIndex"
            label="当前释放"
            align="center"
          />
          <el-table-column
            prop="statusName"
            label="状态"
            align="center"
          />

          <el-table-column
            label="操作"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="dialogInfo(scope.row.idStr)"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :current-page.sync="form2.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="form2.pageSize"
          layout="sizes, prev, pager, next,total"
          :total="total2"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
        />
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <div class="dialogtitle">
        <p>任务：{{ userPearlFreeze.taskName }}</p>
        <p>冻结珍珠：{{ userPearlFreeze.freezePearlNumTotal }}</p>
        <p>冻结周期：{{ userPearlFreeze.releaseIndex }}/{{ userPearlFreeze.releaseCycle }}</p>
        <p>冻结时间：{{ userPearlFreeze.rawAddTimeStr }}</p>
        <p>状态：{{ userPearlFreeze.statusName }}</p>
      </div>
      <el-table :data="detailList" border>
        <el-table-column property="seq" label="序列" width="150" align="center" />
        <el-table-column property="taskDayStr" label="任务时间" width="200" align="center" />
        <el-table-column property="releasePearlNum" label="释放珍珠" align="center" />
        <el-table-column property="statusName" label="状态" align="center" />

      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { userPearlFlow, userPearlFreeze, userPearlFreezeInfo } from '@/api/userMg'
export default {
  components: {},
  props: {
    id: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      freezeNum: '',
      overNum: '',
      processingNum: '',
      form2: {
        idStr: this.id,
        type: '',
        status: '',
        rawAddTimeMin: '',
        rawAddTimeMax: '',
        pageSize: 10,
        currentPage: 1
      },
      form1: {
        idStr: this.id,
        category: '',
        style: '',
        rawAddTimeMin: '',
        rawAddTimeMax: '',
        pageSize: 10,
        currentPage: 1
      },
      disbursePearl: '',
      incomePearl: '',
      prealNum: '',
      formTime: [],
      formTime2: [],
      total1: 0,
      total2: 0,
      tableData: [],
      tableData1: [],
      value1: '',
      currentPage2: 1,
      optionsCategory: [
        {
          value: '1',
          label: '复投'
        },
        {
          value: '2',
          label: '打赏'
        },
        {
          value: '3',
          label: '任务'
        },
        {
          value: '4',
          label: '分红'
        },
        {
          value: '5',
          label: '交易'
        }
      ],
      optionsWay: [
        {
          value: '1',
          label: '收入'
        },
        {
          value: '2',
          label: '支出'
        }
      ],
      optionsType: [
        {
          value: '1',
          label: '复投'
        },
        {
          value: '3',
          label: '活跃度累计'
        },
        {
          value: '2',
          label: '赠送'
        }
      ],
      optionsStatus: [
        {
          value: '1',
          label: '进行中'
        },
        {
          value: '0',
          label: '结束'
        }
      ],
      userPearlFreeze: {},
      detailList: []
    }
  },
  computed: {
    title() {
      return `用户：${this.userName}(${this.id})`
    }
  },
  watch: {
    'form1.category'() {
      this.getUserPearlFlow()
    },
    'form1.style'() {
      this.getUserPearlFlow()
    },
    formTime(value) {
      this.form1.rawAddTimeMin = value ? value[0] : ''
      this.form1.rawAddTimeMax = value ? value[1] : ''
      this.getUserPearlFlow()
    },
    'form2.status'() {
      this.getUserPearlFreeze()
    },
    'form2.type'() {
      this.getUserPearlFreeze()
    },
    formTime2(value) {
      this.form2.rawAddTimeMin = value ? value[0] : ''
      this.form2.rawAddTimeMax = value ? value[1] : ''
      this.getUserPearlFreeze()
    }
  },
  created() {},
  mounted() {
    this.getUserPearlFlow()
    this.getUserPearlFreeze()
  },
  methods: {
    getUserPearlFlow() {
      userPearlFlow({ ...this.form1 }).then(res => {
        const { incomePearl, prealNum, userPearlFlowPage, disbursePearl } = res.object
        this.incomePearl = incomePearl
        this.prealNum = prealNum
        this.tableData = userPearlFlowPage.list
        this.total1 = userPearlFlowPage.total
        this.disbursePearl = disbursePearl
      })
    },
    getUserPearlFreeze() {
      userPearlFreeze({ ...this.form2 }).then(res => {
        const { freezeNum, overNum, pageForFreezePearl, processingNum } = res.object
        this.freezeNum = freezeNum
        this.overNum = overNum
        this.tableData1 = pageForFreezePearl.list
        this.total2 = pageForFreezePearl.total
        this.processingNum = processingNum
      })
    },
    dialogInfo(val) {
      userPearlFreezeInfo({ idStr: val }).then(res => {
        const { userPearlFreeze, detailList } = res.object
        this.userPearlFreeze = userPearlFreeze
        this.detailList = detailList.object
        this.dialogTableVisible = true
      })
    },
    handleSizeChange(val) {
      this.form1.pageSize = val
      this.getUserPearlFlow()
    },
    handleCurrentChange(val) {
      this.form1.currentPage = val
      this.getUserPearlFlow()
    },
    handleSizeChange2(val) {
      this.form2.pageSize = val
      this.getUserPearlFreeze()
    },
    handleCurrentChange2(val) {
      this.form2.currentPage = val
      this.getUserPearlFreeze()
    }
  }
}
</script>
<style lang='scss' scoped>
.dialogtitle{
  p{
    float: left;
    margin-right: 20px;
  }
}
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
