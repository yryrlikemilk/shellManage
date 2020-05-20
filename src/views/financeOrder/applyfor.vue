<template>
  <div class="applyfor">
    <breadnar title="提现申请" />
    <screen v-model="show2">
      <classify v-model="form.settleStatus" :classify-data="table1" title="结算状态：" />
      <classify v-model="form.auditStatus" :classify-data="table2" title="审核状态：" />
      <classify title="申请时间：">
        <el-date-picker
          v-model="timeValue"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </classify>
      <classify :title="'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+'搜索：'">
        <search v-model="form.userId" @fatherMethod="getsearch" />
        <!-- <el-input v-model="form.userId" style="width:400px" placeholder="请输入ID" /> -->
      </classify>
    </screen>
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="idStr"
          label="申请编号"
          align="center"
          min-width="180"
        />
        <el-table-column
          prop="userIdStr"
          label="用户"
          align="center"
          min-width="190"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.mobile">用户:{{ scope.row.mobile }}</p>
            <p> ID:<span class="userid" @click="jump(scope.row.userIdStr)">{{ scope.row.userIdStr }}</span></p>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="申请金额"
          align="center"
        >
          <template slot-scope="scope">
            <p>￥{{ scope.row.amount }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="alipayAccount"
          label="提现账号"
          align="center"
          min-width="250"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.alipayName">支付宝姓名：{{ scope.row.alipayName }}</p>
            <p v-if="scope.row.alipayAccount">支付宝账号：{{ scope.row.alipayAccount }}</p>
            <p v-if="scope.row.mobile">手机号：{{ scope.row.mobile }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          label="申请后结余"
          align="center"
        /> -->
        <el-table-column
          prop="auditStatusName"
          label="审核状态"
          align="center"
        />
        <el-table-column
          prop="settleStatusName"
          label="结算状态"
          align="center"
        />
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="address"
          label="时间"
          align="center"
          width="240"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.auditTimeStr">审核时间：{{ scope.row.auditTimeStr }}</div>
            <div v-if="scope.row.makeMoneyTimeStr">打款时间：{{ scope.row.makeMoneyTimeStr }}</div>
            <div v-if="scope.row.cancelTimeStr">撤销时间：{{ scope.row.cancelTimeStr }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作人"
          align="center"
          width="140"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.auditUser">审核人：{{ scope.row.auditUser }}</div>
            <div v-if="scope.row.makeMoneyUser">{{ scope.row.settleStatus==='2'?'撤销人：':'打款人：' }}{{ scope.row.makeMoneyUser }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="110"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.auditStatus==='0'"
              type="text"
              size="small"
              @click="audit(scope.row.idStr)"
            >
              审核
            </el-button>
            <el-button
              v-if="scope.row.auditStatus==='1'&&scope.row.settleStatus==='0'"
              type="text"
              size="small"
              @click="submit(scope.row.idStr)"
            >
              提交打款信息
            </el-button>
            <el-button
              v-if="scope.row.auditStatus==='1'&&scope.row.settleStatus==='0'"
              type="text"
              size="small"
              @click="deleteRow(scope.row.idStr)"
            >
              撤销申请
            </el-button>
            <el-button
              v-if="scope.row.auditStatus==='1'&&scope.row.settleStatus==='1'"
              type="text"
              size="small"
              @click="submit(scope.row.idStr)"
            >
              查看打款信息
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
    <el-dialog title="提现审核" width="35%" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="auditForm" label-width="70px">
        <el-form-item label="审核：">
          <div>
            <el-radio v-model="auditForm.auditStatus" label="1" border size="medium">通过</el-radio>
            <el-radio v-model="auditForm.auditStatus" label="2" border size="medium">不通过</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="auditForm.remark"
            type="textarea"
            style="max-width:300px"
            :rows="5"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="auditdata">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="打款信息" width="35%" :visible.sync="dialogFormVisible1">
      <el-form ref="detailForm" :model="makeForm" label-width="140px">
        <el-form-item label="打款金额：">
          <div class="detaildata">
            <p>{{ detaildatas.amount }}元</p>
          </div>
        </el-form-item>
        <el-form-item label="打款信息：">
          <div class="detaildata">
            <p v-if="detaildatas.alipayName">支付宝姓名：{{ detaildatas.alipayName }}</p>
            <p v-if="detaildatas.alipayAccount">支付宝账号：{{ detaildatas.alipayAccount }}</p>
            <p v-if="detaildatas.mobile">手机号：{{ detaildatas.mobile }}</p>
          </div>
        </el-form-item>
        <el-form-item
          v-if="detaildatas.auditStatus==='1' && detaildatas.settleStatus==='0'"
          label="上传打款截图："
          prop="imageUrl"
          :rules="[
            { required: true, message: '图片不能为空', trigger: 'blur' },
          ]"
        >
          <div>
            <listupload v-model="makeForm.imageUrl" :auto-upload="true" :showlist="false" />
          </div>
        </el-form-item>
        <el-form-item v-else label="上传打款截图：">
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="detaildatas.imageUrl"
              :preview-src-list="[detaildatas.imageUrl]"
            />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button v-if="detaildatas.auditStatus==='1' && detaildatas.settleStatus==='0'" type="primary" @click="submitForm('detailForm')">确 定</el-button>
        <el-button v-else type="primary" @click="dialogFormVisible1 = false">确 定</el-button>

      </div>
    </el-dialog>
    <el-dialog title="撤销申请" width="35%" :visible.sync="dialogFormVisible2">
      <el-form :model="cancelForm" label-width="60px">
        <el-form-item label="备注：">
          <el-input
            v-model="cancelForm.remark"
            type="textarea"
            style="max-width:300px"
            :rows="5"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="canceldata">确定撤销</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { facade, audit, cancel, detail, make } from '@/api/applyfor'
import listupload from '@/components/Upload/listupload'
import search from '@/components/search'
import { pickerOptions } from '@/utils/getDate'
import classify from '@/views/coupon/components/classify'
import screen from '@/components/screen/index'
export default {
  components: {
    search,
    screen,
    classify,
    listupload
  },
  data() {
    return {
      loading: true,
      total: 0,
      timeValue: [],
      flieList: [],
      currentPage2: 1,
      cancelForm: {
        id: '',
        remark: ''
      },
      makeForm: {
        imageUrl: undefined
      },
      auditForm: {
        id: '',
        auditStatus: '1',
        remark: ''
      },
      detailForm: {
        id: ''
      },
      detaildatas: {
        imageUrl: ''
      },
      form: {
        auditStatus: '',
        settleStatus: '',
        userId: '',
        beginTime: '',
        endTime: '',
        currentPage: 1,
        pageSize: 10
      },
      formLabelWidth: '120px',
      dialogFormVisible2: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      show2: true,
      input: '',
      value2: '',
      pickerOptions,
      table2: [
        { name: '全部', value: '' },
        { name: '待审核', value: '0' },
        { name: '审核通过', value: '1' },
        { name: '审核失败', value: '2' }
      ],
      table1: [
        { name: '全部', value: '' },
        { name: '未打款', value: '0' },
        { name: '已打款', value: '1' },
        { name: '已撤销', value: '2' }
      ],
      tableData: []
    }
  },
  computed: {},
  watch: {
    timeValue(value) {
      if (value === null) { value = new Array(2) }
      [this.form.beginTime, this.form.endTime] = value
    },
    form: {
      handler(value) { this.getdata() },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  methods: {
    handleClose() {
      this.auditForm = {
        id: '',
        auditStatus: '1',
        remark: ''
      }
      this.dialogFormVisible = false
    },
    makesubmit() {
      make({
        id: this.detailForm.id,
        imageUrl: this.makeForm.imageUrl.url,
        key: this.makeForm.imageUrl.key
      }).then(res => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.getdata()
      })
      this.dialogFormVisible1 = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.makesubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    detaildata() {
      this.dialogFormVisible1 = true
      detail({ ...this.detailForm }).then(res => {
        this.detaildatas = res.object
      })
    },
    canceldata() {
      cancel({ ...this.cancelForm }).then(res => {
        this.$message({
          message: '撤销成功',
          type: 'success'
        })
        this.getdata()
      })
      this.dialogFormVisible2 = false
    },
    auditdata() {
      audit({ ...this.auditForm }).then(res => {
        this.$message({
          message: '审核成功',
          type: 'success'
        })
        this.getdata()
      })
      this.dialogFormVisible = false
    },
    jump(value) {
      this.$router.push({
        path: '/userManage/userInfo',
        query: {
          id: value
        }
      })
    },
    getsearch() {
      this.form.auditStatus = ''
      this.form.settleStatus = ''
      this.form.beginTime = ''
      this.form.endTime = ''
    },
    getdata() {
      this.loading = true
      facade({ ...this.form }).then(res => {
        const { list, total } = res.object
        this.tableData = list
        this.total = total
        this.loading = false
      })
    },
    handleSizeChange(value) {
      this.form.pageSize = value
    },
    handleCurrentChange(value) {
      this.form.currentPage = value
    },
    deleteRow(value) {
      this.cancelForm.id = value
      this.dialogFormVisible2 = true
    },
    audit(value) {
      this.auditForm.id = value
      this.dialogFormVisible = true
    },
    submit(value) {
      this.detailForm.id = value
      this.detaildata()
    },
    test() {
      alert(this.input)
    }
  }
}
</script>
<style scoped>
.applyfor {
  padding: 20px;
}
.el-table{
  margin-top: 20px;
}
.el-pagination{
  text-align: right;
  margin-top: 20px;
}
.el-dialog{
  overflow: hidden;
}
.userid{
  color: #409Eff;
  cursor: pointer;
}
.detaildata p{
  margin: 0;
}
</style>
