<template>
  <div
    class="navbar"
    :class="[navTheme, layout]"
    :style="{ backgroundImage: navbarBg ? 'url(' + navbarBg + ')' : 'none' }"
  >
    <slot name="topbar"></slot>
    <slot name="sidemenu"></slot>
    <RightMenu />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ErrorLog from '@/components/ErrorLog';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import Search from '@/components/HeaderSearch';
import RightMenu from './RightMenu.vue';
import TopbarBG from '@/assets/topBG1.png';

export default {
  components: {
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    RightMenu,
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'nickname', 'device']),
    navTheme() {
      return this.$store.state.settings.navTheme;
    },
    layout() {
      return this.$store.state.settings.layout;
    },
    navbarBg() {
      if (this.layout !== 'sidemenu' && this.navTheme === 'dark') {
        return TopbarBG;
      }
      return '';
    },
  },
  data() {
    return {
      topBG: TopbarBG,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/user?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
$topHeight: 80px;
$height: 60px;
.navbar {
  height: $height;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  &.topmenu {
    height: $topHeight;

    .hamburger-container {
      line-height: $topHeight;
    }
  }

  .hamburger-container {
    line-height: $height;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $topHeight;

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
}
</style>
