<template>
  <div class="login-form">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model.trim="loginForm.username"
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
          v-model.trim="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handlerLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-row>
          <el-col :span="16">
            <el-input
              ref="captcha"
              v-model.trim="loginForm.captcha"
              placeholder="验证码"
              name="captcha"
              type="text"
              tabindex="3"
              auto-complete="off"
            />
          </el-col>
          <el-col :span="8" class="captcha-img">
            <img :src="captchaUrl" alt="" @click="getCaptcha" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item prop="remember" class="tips">
        <div class="left">
          <el-checkbox v-model="loginForm.remember">自动登录</el-checkbox>
        </div>
        <div class="right">
          <el-button type="text">注册账户</el-button>
          <el-button type="text">忘记密码</el-button>
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handlerLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { getCaptchaImage } from '@/api/user';
import { genId } from '@/utils/common';
import IMAGE from '@/assets/checkcode.png';
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        this.loginType = 0;
      } else {
        this.loginType = 1;
      }
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        remember: true,
      },
      loginType: 1,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      captchaUrl: IMAGE,
      captchaKey: '',
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    getCaptcha() {
      //获取图片验证码
      this.captchaKey = genId();
      getCaptchaImage(this.captchaKey)
        .then((res) => {
          if (res.code === 200) {
            this.captchaUrl = res.result;
          } else {
            this.captchaUrl = IMAGE;
          }
        })
        .catch(() => {
          this.captchaUrl = IMAGE;
        });
    },
    handlerLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', {
              captcha: this.loginForm.captcha,
              checkKey: this.captchaKey,
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            .then(() => {
              this.getCaptcha();
              console.log('登录成功');
              this.$router.push({ path: this.redirect || '/home' });
              this.loading = false;
            })
            .catch(() => {
              this.getCaptcha();
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-form {
  height: 420px;

  .captcha-img {
    height: 47px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #fff;
    border: none;
    background: transparent;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    display: inline-block;
    width: 30px;
    // padding: 6px 5px 6px 15px;
    padding: 0 5px 0 15px;
    line-height: 47px;
    color: $dark_gray;
    vertical-align: middle;
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
