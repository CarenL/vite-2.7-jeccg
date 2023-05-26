import Vue from 'vue';
import Cookies from 'js-cookie';
import { SIDEBAR_TYPE, SIZE_TYPE } from '@/store/mutation-types';

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  device: 'desktop',
  size: 'medium',
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  SET_SIDEBAR_TYPE: (state, type) => {
    state.sidebar.opened = type;
    Vue.ls.set(SIDEBAR_TYPE, type);
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0);
    Vue.ls.set(SIDEBAR_TYPE, true);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    Vue.ls.set(SIZE_TYPE, size);
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  setSidebar: ({ commit }, type) => {
    commit('SET_SIDEBAR_TYPE', type);
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
