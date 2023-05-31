<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="horizontal"
    >
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
import variables from '@/styles/variables.module.scss';
import variablesLight from '@/styles/variables-light.module.scss';

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
    variables() {
      if (this.navTheme === 'dark') {
        return variables;
      } else if (this.navTheme === 'light') {
        return variablesLight;
      }
      return '';
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
<style lang="scss">
@import '@/styles/topbar.scss';
</style>
