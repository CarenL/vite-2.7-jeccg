<template>
  <div class="topbar-logo-container">
    <router-link class="topbar-logo-link" to="/">
      <img :src="logoUrl" alt="logo" />
    </router-link>
  </div>
</template>

<script>
import LOGO from '@/assets/logo.png';
import LOGONAME from '@/assets/logo-name.png';
export default {
  name: 'TopbarLogo',
  computed: {
    navTheme() {
      return this.$store.state.settings.navTheme;
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

.topbar-logo-container {
  display: inline-block;
  position: relative;
  width: 300px;
  height: $topHeight;
  padding-left: 20px;
  line-height: $topHeight;
  text-align: left;
  overflow: hidden;
  vertical-align: top;

  & .topbar-logo-link {
    height: 100%;
    line-height: $topHeight;

    img {
      display: inline-block;
      height: 32px;
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
