<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="rules"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>

      <!-- 手机输入框 -->
      <el-form-item prop="mobile">
        <span class="el-icon-user-solid svg-container" />
        <el-input v-model="loginForm.mobile" />
      </el-form-item>

      <!-- 密码框 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="pwd"
          v-model="loginForm.password"
          :type="passwordType"
        />

        <!-- 睁眼闭眼图标 -->
        <span class="svg-container" @click="showPwd">
          <!-- passwordType如果为password 显示闭眼照片，
               passwordType如果为'', 显示睁眼照片 -->
          <svg-icon
            :icon-class="passwordType === 'password'
              ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-button
        class="loginBtn"

        @click="userLogin"
      >登录</el-button>
      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
  <!-- 环境变量的作用
  1. 正常公司中 有几个环境 4 开发 dev 测试 test 预发 uat 线上 pro
  2. 在项目里如何配置这几个环境  通过 .env 配置 base api
  开发环境的接口前缀 /api
  线上环境的接口前缀 /prod-api
   -->

  <!-- 眼睛睁闭的原理：
       1.点击闭上眼睛的图片  ===》 睁开眼睛 type text图片变成睁开眼睛
       2.点击睁开眼睛图片    ===》 闭上眼睛 type password图片变成眼睛-->

  <!-- 表单校验三步：
       el-form表单绑定model(数据对象)和rules(校验规则)
       el-form-item: prop(校验的数据的key)
       el-input(v-model)
   -->
</template>
<script>
import { validPhone } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const phoneValid = (rule, value, callback) => {
      // 如果输入的值通过phoneValid校验之后返回的Boolean为false时
      // 回调函数抛出错误
      if (!validPhone(value)) {
        callback(new Error('手机号码格式错误'))
      } else {
        callback()
      }
    }
    return {
      passwordType: 'password',
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请填写手机号码',
            trigger: 'blur'
          },
          {
            validator: phoneValid,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码的长度在6-16位之间',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    showPwd() {
      // 如果密码类型是 password的话  这个密码类型让他为空
      this.passwordType === 'password'
        ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },

    async userLogin() {
      try {
        await this.$refs.loginForm.validate()

        // 通过校验之后，点击登录 loding 转圈
        this.loading = true

        // 调取接口请求
        await this.$store.dispatch('user/loginAction', this.loginForm)
        // 接口请求成功 跳转路由
        this.$router.push('/dashboard')
      } finally {
        // 成功登陆之后，loading结束转圈
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#d1e2ff;
$light_gray:#68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
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
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
  }
  .el-form-item__error {
    color: #fff
  }
  .loginBtn {
    width:100%;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
    margin-bottom:30px;
    border:none;
    background: #407ffe;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

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
      font-size: 26px;
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
