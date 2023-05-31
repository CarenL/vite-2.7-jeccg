<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }" :style="{ backgroundColor: backgroundColor }">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <img :src="logoUrl" alt="logo" />
      </router-link>
    </transition>
  </div>
</template>

<script>
import LOGO from '@/assets/logo.png';
import LOGONAME from '@/assets/logo-name.png';
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    navTheme() {
      return this.$store.state.settings.navTheme;
    },
    backgroundColor() {
      if (this.navTheme === 'dark') {
        return '#002140';
      } else if (this.navTheme === 'light') {
        return this.$store.state.settings.theme;
      }
    },
    logoUrl() {
      if (this.navTheme === 'dark') {
        return !this.collapse ? window._CONFIG['DARK_LONG_LOGO_URL'] : window._CONFIG['DARK_LOGO_URL'];
      } else {
        return !this.collapse ? window._CONFIG['LONG_LOGO_URL'] : window._CONFIG['LOGO_URL'];
      }
    },
  },
  data() {
    return {
      title: '中财绿值',
      logo: LOGO,
      logoTitle: LOGONAME,
    };
  },
};
</script>

<style lang="scss" scoped>
$topHeight: 80px;
$height: 60px;
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $height;
  line-height: $height;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;
    line-height: $height;

    img {
      display: inline-block;
      height: 32px;
      vertical-align: middle;
    }

    & .sidebar-logo {
      width: 32px;
      height: 16px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      width: 62px;
      height: 20px;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
