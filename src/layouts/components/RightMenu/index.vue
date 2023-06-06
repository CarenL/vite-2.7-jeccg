<template>
  <div class="right-menu">
    <template v-if="device !== 'mobile'">
      <search id="header-search" class="right-menu-item" />

      <error-log class="errLog-container right-menu-item hover-effect" />

      <screenfull id="screenfull" class="right-menu-item hover-effect" />

      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <size-select id="size-select" class="right-menu-item hover-effect" />
      </el-tooltip>
    </template>

    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      <div class="avatar-wrapper">
        <!-- <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            class="user-avatar"
          /> -->
        <span class="username">{{ nickname }}</span>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item @click.native="userLogout">
          <span style="display: block">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore, useUserStore, useSettingsStore } from '@/piniaStores';
import ErrorLog from './ErrorLog';
import Screenfull from './Screenfull';
import SizeSelect from './SizeSelect';
import Search from './HeaderSearch';

export default {
  components: {
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
  },
  computed: {
    ...mapState(useUserStore, ['avatar', 'nickname']),
    ...mapState(useSettingsStore, {
      theme: (store) => store.theme,
    }),
    ...mapState(useAppStore, ['device']),
  },
  methods: {
    async userLogout() {
      await this.logout();
      this.$router.push(`/user?redirect=${this.$route.fullPath}`);
    },
    ...mapActions(useUserStore, ['logout']),
  },
};
</script>

<style lang="scss" scoped>
$topHeight: 80px;
$height: 60px;
.sidemenu {
  .right-menu {
    height: $height;
    line-height: $height;

    .el-icon-caret-bottom {
      top: 25px;
    }
  }

  &.light {
    .right-menu-item {
      color: #fff;
    }
  }
}
// 顶部菜单栏
.topmenu,
.topTreemenu {
  .right-menu {
    height: $topHeight;
    line-height: $topHeight;

    .el-icon-caret-bottom {
      top: 35px !important;
    }
  }

  &.dark {
    .right-menu-item {
      color: #fff;
    }
  }
}
.right-menu {
  float: right;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    // font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      // margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
