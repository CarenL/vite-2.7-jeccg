<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" />
    <el-menu
      :default-active="activeMenu"
      :unique-opened="false"
      :collapse-transition="false"
      mode="horizontal"
      v-if="device !== 'mobile'"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        class="topbar-menu-item"
        :layout="layout"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useAppStore, usePermissionStore, useSettingsStore } from '@/piniaStores';
import Logo from './Logo.vue';
import SidebarItem from '../Menu/MenuItem.vue';

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapState(useAppStore, ['sidebar', 'device']),
    ...mapState(usePermissionStore, {
      permission_routes: (store) => store.routes,
    }),
    ...mapState(useSettingsStore, {
      showLogo: (store) => store.sidebarLogo,
      navTheme: (store) => store.navTheme,
      theme: (store) => store.theme,
      layout: (store) => store.layout,
    }),
    isCollapse() {
      return !this.sidebar.opened;
    },
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
  },
};
</script>
