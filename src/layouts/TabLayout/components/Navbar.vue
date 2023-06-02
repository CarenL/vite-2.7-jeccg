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
@import '@/styles/variables.module.scss';
$primary-color: $--color-primary;
$primary-color: var(--primary-color, $--color-primary);

$topHeight: 80px;
$height: 60px;
.navbar {
  height: $height;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &.sidemenu.light {
    background: $primary-color;
  }
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
}
</style>
