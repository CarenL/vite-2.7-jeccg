<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" />
    <el-menu :default-active="activeMenu" :unique-opened="false" :collapse-transition="false" mode="horizontal">
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        class="topbar-menu-item"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo.vue';
import SidebarItem from '../Sidebar/SidebarItem.vue';

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar', 'permission_routes']),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    navTheme() {
      return this.$store.state.settings.navTheme;
    },
    theme() {
      return this.$store.state.settings.theme;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
