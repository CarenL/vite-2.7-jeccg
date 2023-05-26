<template>
  <el-container class="user-layout-wrapper">
    <el-header class="user-layout-header">
      <img class="long-logo" :src="longLogoUrl" alt="logo" />
    </el-header>
    <el-main class="user-layout-main">
      <div class="user-layout-left">
        <img class="left-bg" :src="require('@/assets/leftImg.svg')" alt="left-bg" />
      </div>
      <div class="user-layout-container">
        <div class="container-header">
          <div class="container-title">
            <a :href="rootUrl">
              <!-- <img class="logo" :src="logoUrl" alt="logo" /> -->
              <span class="title">{{ title }}</span>
            </a>
          </div>
          <!-- <div class="container-desc" /> -->
        </div>
        <!-- <RouteView /> -->
        <router-view />
      </div>
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
const rootUrl = ref(import.meta.env.BASE_URL);
const logoUrl = ref(window._CONFIG['LOGO_URL']);
const longLogoUrl = ref(window._CONFIG['LONG_LOGO_URL']);
const title = ref(window._CONFIG['TITLE']);
const copyright = ref(window._CONFIG['COPYRIGHT']);
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$dark_gray: #889aa4;
$black: #000;
$cursor: #000;
$default: #ccc;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.user-layout-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .logo {
    height: 44px;
    vertical-align: top;
  }

  .long-logo {
    height: 51px;
    vertical-align: top;
  }

  .user-layout-header {
    width: 75%;
    min-width: 1000px;
    height: auto;
    margin: 0 auto;
    padding: 0;

    .long-logo {
      margin-top: 4%;
    }
  }

  .user-layout-main {
    width: 75%;
    min-width: 1000px;
    display: flex;
    justify-content: space-between;
    margin: 2% auto 0;
    padding: 0;

    .user-layout-left {
      margin-top: 48px;
      width: 56%;
      .left-bg {
        width: 100%;
      }
    }
    .user-layout-container {
      width: 36%;
      a {
        text-decoration: none;
      }
      .container-header {
        margin-bottom: 30px;
        min-width: 260px;
        width: 360px;
        .container-title {
          height: 44px;
          line-height: 48px;
          text-align: left;
          .logo {
            margin-right: 16px;
          }
          .title {
            color: #707070;
            font-size: 32px;
            font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
              'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol';
            font-weight: 600;
            text-align: left;
          }
        }
        .container-desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
        }
      }

      .main {
        min-width: 260px;
        width: 360px;
      }
    }
  }

  .user-layout-footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    text-align: center;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;
      font-size: 14px;
      a {
        color: rgba(0, 0, 0, 0.45);
        transition: all 0.3s;
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: #c2c2c2;
      font-size: 14px;
    }
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: none;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $black;
      height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $light_gray inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }

    input:-moz-placeholder {
      color: rgba($color: $default, $alpha: 0.6);
    }
    input:-ms-input-placeholder {
      color: rgba($color: $default, $alpha: 0.6);
    }
    input::-webkit-input-placeholder {
      color: rgba($color: $default, $alpha: 0.6);
    }
  }

  .el-form-item {
    border: 1px solid #ccc;
    background-color: $light_gray;
    border-radius: 5px;
    color: #454545;

    .left {
      float: left;
    }

    .right {
      float: right;
    }

    .note {
      color: $dark_gray;
    }

    &.operate {
      background-color: transparent;
      border: none;
    }
  }
}
</style>
