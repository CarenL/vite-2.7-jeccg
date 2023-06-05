import { defineStore } from 'pinia';
import { constantRoutes, asyncRouterMap } from '@/router';
import { generateIndexRouter, filterAsyncRoutes } from '@/utils/router';

const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      routes: [],
      addRoutes: [],
    };
  },
  actions: {
    generateRoutes(roles) {
      return new Promise((resolve) => {
        let accessedRoutes;
        if (roles.includes('admin')) {
          accessedRoutes = asyncRouterMap || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles);
        }
        this.addRoutes = accessedRoutes;
        this.routes = constantRoutes.concat(accessedRoutes);
        resolve(accessedRoutes);
      });
    },
    updateAppRouter({ menuData }) {
      return new Promise((resolve) => {
        let routelist = generateIndexRouter(menuData, asyncRouterMap);
        this.addRoutes = routelist;
        this.routes = constantRoutes.concat(routelist);
        resolve(routelist);
      });
    },
  },
});

export default usePermissionStore;
