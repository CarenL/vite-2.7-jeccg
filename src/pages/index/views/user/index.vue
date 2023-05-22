<template>
  <el-container
    class="login-container"
    :style="{
      background: 'url(' + require('@/assets/bg.png') + ') center center no-repeat',
      backgroundSize: 'cover',
    }"
  >
    <div class="form-wrapper">
      <div class="logo-wrapper">
        <div class="logo">
          <img :src="LOGO" alt="" />
          <p class="name">
            <span>中央财经大学</span><br />
            <span>绿色金融国际研究院</span>
          </p>
        </div>
        <p class="sys-title">ESG数据库后台</p>
      </div>
      <router-view />
    </div>
  </el-container>
</template>

<script setup>
import LOGO from '@/assets/logo.png';
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
.login-container {
  width: 100%;
  height: 100%;
  background-size: cover;

  .form-wrapper {
    width: 1000px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -500px;
    margin-top: -275px;
    border: 1px dashed #ccc;
    background: rgba($color: #fff, $alpha: 0.6);
    box-sizing: border-box;
    overflow: hidden;

    .login-form {
      display: inline-block;
      width: 50%;
      padding: 20px 35px;
      border-left: 1px dashed #ccc;
      background: #fff;
      box-sizing: border-box;

      .title-wrapper {
        text-align: center;

        .form-title {
          display: inline-block;
          padding: 0 10px 5px 10px;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
          line-height: 40px;
          color: #306465;
          border-bottom: 2px solid #306465;
        }
      }
    }

    .logo-wrapper {
      display: inline-block;
      width: 50%;
      padding: 0;
      vertical-align: top;
      box-sizing: border-box;
      overflow: hidden;

      .logo {
        height: 58px;
        position: absolute;
        left: 85px;
        top: 50%;
        margin-top: -75px;

        img {
          display: block;
          width: 139px;
          height: 100%;
          float: left;
        }

        .name {
          margin-left: 10px;
          font-size: 24px;
          font-weight: bold;
          color: #306465;
          float: left;

          span {
            display: inline-block;
            &:last-child {
              margin-top: 5px;
            }
          }
        }
      }
      .sys-title {
        position: absolute;
        left: 85px;
        top: 50%;
        margin-top: 70px;
        font-size: 40px;
        font-weight: bold;
        color: #306465;
      }
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
