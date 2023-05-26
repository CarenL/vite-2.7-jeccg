import Vue from 'vue';
import variables from '@/styles/variables.module.scss';
import defaultSettings from '@/settings';

const { showSettings, navTheme, layout, contentWidth, fixedHeader, fixSiderbar, colorWeak, tagsView, sidebarLogo } =
  defaultSettings;

const state = {
  showSettings: showSettings,
  theme: variables.theme,
  navTheme: navTheme,
  layout: layout,
  contentWidth: contentWidth,
  fixedHeader: fixedHeader,
  fixSiderbar: fixSiderbar,
  colorWeak: colorWeak,
  tagsView: tagsView,
  sidebarLogo: false,
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      Vue.ls.set(key, value);
    }
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
