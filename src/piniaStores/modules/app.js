import Vue from 'vue';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { SIDEBAR_TYPE, SIZE_TYPE } from '@/store/mutation-types';

const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false,
      },
      device: 'desktop',
      size: 'medium',
    };
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
    },
    setSidebar(type) {
      this.sidebar.opened = type;
      Vue.ls.set(SIDEBAR_TYPE, type);
    },
    closeSideBar({ withoutAnimation }) {
      Cookies.set('sidebarStatus', 0);
      Vue.ls.set(SIDEBAR_TYPE, true);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device) {
      this.device = device;
    },
    setSize(size) {
      this.size = size;
      Vue.ls.set(SIZE_TYPE, size);
    },
  },
});

export default useAppStore;
