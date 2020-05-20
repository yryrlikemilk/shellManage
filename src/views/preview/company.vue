<template>
  <div>
    <div class="heard">
      <img class="imgheard" src="../assets/img_logo01.png" alt>
      <p style="font-size:19px;text-align: center;color:#000">重庆市巨道文化传播有限公司</p>
      <p>贝壳母公司全称重庆市巨道文化传播有限公司 2015 年 4 月公司成立 涉足企业品牌营销策划以及电商领域，积累了大量的行业资源和人脉关 系。2020年 1月，公司领导审时度势推出区块链电商产品“贝壳链商”现有员工 50余名，公司的核心岗位，由分别 来自阿里等、一线互联网公司的资深运营团队。 公司有强大的技术团队支撑及资金实力支撑。</p>
      <div class="relation">
        <p>联系我们</p>
        <p>邮箱：349694691@qq.com</p>
        <p>客服电话：023-72216058</p>
      </div>
      <div class="footer">
        <img src="../assets/img_02.png" alt=""><br>
        <span>微信公众号</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    document.title = '关于公司'
  },
  methods: {}
}
</script>
<style scoped>
.heard {
  width: 100%;
}
.imgheard {
  width: 70%;
  margin: 30px auto;
}
.heard p{
  width: 80%;
  margin: 20px auto;
  text-align: left;
  color: #3C3D40;
}
.relation{
  margin-top:30px ;
}
.relation p{
  margin: 5px auto;
}
.footer{
  width: 100%;
}
.footer img{
  width: 40%;
}
</style>
