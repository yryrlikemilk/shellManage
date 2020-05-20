<template>
  <div class="userinfo">
    <div>
      <breadnar title="用户管理" title1="用户详情" />
    </div>
    <div class="userinfo-header">
      <div class="userinfo-header-title">
        <p>基础信息</p>
      </div>
      <div class="userinfo-header-base">
        <el-row type="flex">
          <!-- <el-col :span="3"> -->
          <div class="userinfo-header-base-img">
            <el-image :lazy="true" style="width: 70px; height: 70px" :src="tabledata.headImg" fit="fill" />
            <p>邀请码：{{ tabledata.invitationCode }}</p>
            <div>
              <span v-if="tabledata.status==='0'" style="color:red">禁用</span>
              <span v-else style="color:#67C23A">启用</span>
              <el-button type="text">更改</el-button>
            </div>
          </div>
          <!-- </el-col> -->
          <el-col :span="24" class="userinfo-header-base-infolist">
            <infolist title1="用户ID" :content1="tabledata.idStr" title2="微信昵称" :content2="tabledata.wechatName" title3="绑定设备" :content3="tabledata.deviceModel" />
            <infolist title1="昵称" :content1="tabledata.nickName" title2="支付宝账号" content2="" title3="所在地" content3="">
              <template slot="content3">
                <span v-if="tabledata.userPartnerList">{{ tabledata.userPartnerList.length>0 ?tabledata.userPartnerList[0].areaName:'' }}</span>
              </template>
            </infolist>
            <infolist title1="绑定微信号" :content1="tabledata.wechatId" title2="支付宝姓名" content2="" title3="注册时间" :content3="tabledata.registeredTimeStr" />
            <infolist title1="手机号" :content1="tabledata.mobile" title2="淘宝授权" :content2="tabledata.taobaoAuthorizeName	" title3="上次登录时间" :content3="tabledata.lastLoginTimeStr" />
          </el-col>
        </el-row>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="优惠券" name="first" :lazy="true">
        <userInfoCoupon :id="id" />
      </el-tab-pane>
      <el-tab-pane label="贝壳等级" name="second" :lazy="true">
        <userInfoshell :id="id" />
      </el-tab-pane>
      <el-tab-pane label="城市合伙人" name="third" :lazy="true">
        <userInfopatner :id="id" />
      </el-tab-pane>
      <el-tab-pane label="珍珠明细" name="fourth" :lazy="true">
        <shellInfo :id="id" :user-name="tabledata.nickName" />
      </el-tab-pane>
      <el-tab-pane label="活跃度明细" name="five" :lazy="true">
        <livenessInfo :id="id" />
      </el-tab-pane>
      <el-tab-pane label="小视频" name="six" :lazy="true">
        <miniVideo :id="id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import miniVideo from './components/miniVideo'
import livenessInfo from './components/livenessInfo'
import shellInfo from './components/shellInfo'
import userInfopatner from './components/userInfopatner'
import userInfoshell from './components/userInfoshell'
import userInfoCoupon from './components/userInfoCoupon'
import infolist from '@/views/coupon/components/infoList'
import { userMgInfo } from '@/api/userMg'
export default {
  components: {
    miniVideo,
    livenessInfo,
    shellInfo,
    userInfopatner,
    infolist,
    userInfoCoupon,
    userInfoshell
  },
  data() {
    return {
      tabledata: {
        headImg: ''
      },
      id: '',
      activeName: 'first',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  computed: {},
  watch: {},
  created() {
    this.id = this.$route.query.id
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      userMgInfo({ id: this.id }).then(res => {
        this.tabledata = res.object
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.infoList {
  /deep/ &-content {
     .el-row {
      .el-col {
        padding: 17px 10px;
      }
    }
  }
}
.el-tabs{
  margin-top: 30px;
}
.userinfo {
  padding: 20px;
  &-header {
    margin-top: 20px;
    &-base {
      &-img {
        min-width: 150px;
        text-align: center;
        border: solid 1px #DCDFE6;
        p,div{
          margin-top: 30px;
          font-size: 14px;
        }
        .el-image {
          margin-top: 10px;
          border-radius: 50%;
        }
      }
    }
    &-title {
      padding: 10px;
      background-color: #f2f2f2;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      p{
        margin: 6px 0;
      }
    }
  }
}
</style>
