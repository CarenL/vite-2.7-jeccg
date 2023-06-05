<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useAppStore, usePermissionStore, useSettingsStore } from '@/piniaStores';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapState(useAppStore, {
      sidebar: (store) => store.sidebar,
    }),
    ...mapState(usePermissionStore, {
      permission_routes: (store) => store.routes,
    }),
    ...mapState(useSettingsStore, {
      showLogo: (store) => store.sidebarLogo,
      navTheme: (store) => store.navTheme,
      theme: (store) => store.theme,
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
  created() {
    console.log(this.permission_routes);
  },
};
</script>
