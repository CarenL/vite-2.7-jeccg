import Vue from 'vue';
import { defineStore } from 'pinia';
import variables from '@/styles/variables.module.scss';
import defaultSettings from '@/settings';
import { updateTheme, updateWeak } from '@/utils/setting';

const useSettingsStore = defineStore('settings', {
  state: () => {
    const { showSettings, layout, contentWidth, fixedHeader, fixSiderbar, colorWeak, tagsView, sidebarLogo, navTheme } =
      defaultSettings;
    return {
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
  },
  actions: {
    changeSetting({ key, value }) {
      if (key === 'theme') {
        updateTheme(value, this.theme);
      }
      if (key === 'colorWeak') {
        updateWeak(value);
      }
      // eslint-disable-next-line no-prototype-builtins
      if (typeof this[key] !== undefined) {
        this[key] = value;
        Vue.ls.set(key, value);
      }
    },
  },
});

export default useSettingsStore;
