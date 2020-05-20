<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="logo">
        <img src="@/assets/logo.png" alt="LOGO">
      </div>
      <div class="title-container">
        <h3 class="title">运营管理后台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item class="yanzhen" prop="validCode">
            <el-input v-model="loginForm.validCode" placeholder="验证码" @keyup.native.enter="handleLogin" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="verificationCode">
            <securityCode
              ref="child"
              @child-msg="getcode"
            />
          </div>
        </el-col>
      </el-row>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;border-radius:30px" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
    <div class="tips">
      <span> 建议使用火狐或Google浏览器登录</span>
    </div>
    <div class="footer">
      © 2020 N3RO. All rights reserved. Theme Limitless by Eugene Kopyov
    </div>
  </div>
</template>

<script>
import securityCode from '@/components/securityCode/index'
export default {
  name: 'Login',
  components: {
    securityCode
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入六位数以上的密码'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value) {
        if (value === this.yanzhenUp || value === this.yanzhenLo) {
          callback()
        } else {
          this.$refs.child.refreshCode()
          callback(new Error('验证码错误'))
        }
      } else {
        callback(new Error('请输入验证码'))
      }
    }
    return {
      yanzhenUp: '',
      yanzhenLo: '',
      loginForm: {
        username: '',
        password: '',
        validCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        validCode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getcode(val) {
      this.yanzhenLo = val.toLowerCase()
      this.yanzhenUp = val.toUpperCase()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:black;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      // caret-color: #000 1px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        // -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #909399;
    background:#fff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#f2f2f2;
$dark_gray:#889aa4;
$light_gray:#000;

.footer{
  position:absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
}
.logo{

 display: flex;
 justify-content: center;
 padding: 0 0 20px 0 ;
}
.logo img{
  width: 80px;
  border-radius: 50%;
}
.verificationCode{
  margin: 4px 0px;
  background-color: #faecd8;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: relative;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-55%);
    width: 520px;
    max-width: 100%;
    box-shadow: 0 0 5px #909399;
    padding: 30px 35px 0;
    margin: 0 auto;
    background-color: #fff;
    overflow: hidden;
    z-index: 10;
  }

  .tips {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform:translate(-50%);
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;
    z-index: 10;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 20px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
