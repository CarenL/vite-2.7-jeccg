import Vue from 'vue';
import defaultSettings from '@/settings';
import variables from '@/styles/variables.module.scss';
import { updateTheme, updateWeak } from '@/utils/setting';

const { showSettings, layout, contentWidth, fixedHeader, fixSiderbar, colorWeak, tagsView, sidebarLogo, navTheme } =
  defaultSettings;

const state = {
  showSettings: showSettings,
  theme: variables.theme,
  layout: layout,
  contentWidth: contentWidth,
  fixedHeader: fixedHeader,
  fixSiderbar: fixSiderbar,
  colorWeak: colorWeak,
  tagsView: tagsView,
  sidebarLogo: sidebarLogo,
  navTheme: navTheme,
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (key === 'theme') {
      updateTheme(value, state.theme);
    }
    if (key === 'colorWeak') {
      updateWeak(value);
    }
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
