import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import variables from '@/styles/variables.module.scss';
// import '@/styles/element-variables.scss';
import 'element-ui/lib/theme-chalk/index.css';
// import locale from 'element-ui/lib/locale/lang/en'; // lang i18n

import '@/styles/index.scss'; // global css

import App from './App.vue';
import router from './router';
// use Vuex as store
// import store from './store';
// use Pinia as store
import { PiniaVuePlugin } from 'pinia';
import store, { useAppStore, useSettingsStore } from './piniaStores';
import Storage from 'vue-ls';

import '@/icons'; // icon
import 'virtual:svg-icons-register'; // svg-register
import './permission'; // permission control

//自定义组件注册
import zclzComponents from '@/components/zclz/form';

//页面刷新数据同步
import SSO from '@/cas/sso.js';
import { SIDEBAR_TYPE, SIZE_TYPE } from '@/store/mutation-types';

//页面缓存数据初始化
import { initConfig } from '@/config';
import config from '@/settings';

// import './assets/main.css';

/* 开发环境mock数据，生产环境删掉 */
import { setupProdMockServer } from '@/utils/mockProdServer';
setupProdMockServer(import.meta.env.VITE_APP_API_BASE_URL);

Vue.config.productionTip = false;

Vue.use({ ...Storage }, config.localStorageOptions);
Vue.use({ ...Storage }, config.sessionStorageOptions);

Vue.use(ElementUI, {
  size: Vue.ls.get(SIZE_TYPE, 'medium'), // set element-ui default size
  // locale
});

Vue.use(zclzComponents);

SSO.init(async () => {
  await initConfig();
  main();
});

Vue.use(PiniaVuePlugin);

function main() {
  new Vue({
    pinia: store,
    router,
    mounted() {
      let appStore = useAppStore();
      let settingsStore = useSettingsStore();
      appStore.setSidebar(Vue.ls.get(SIDEBAR_TYPE, true));
      appStore.setSize(Vue.ls.get(SIZE_TYPE, 'medium'));
      settingsStore.changeSetting({ key: 'layout', value: Vue.ls.get('layout', config.layout) });
      settingsStore.changeSetting({
        key: 'fixedHeader',
        value: Vue.ls.get('fixedHeader', config.fixedHeader),
      });
      settingsStore.changeSetting({
        key: 'fixSiderbar',
        value: Vue.ls.get('fixSiderbar', config.fixSiderbar),
      });
      settingsStore.changeSetting({
        key: 'contentWidth',
        value: Vue.ls.get('contentWidth', config.contentWidth),
      });
      settingsStore.changeSetting({
        key: 'autoHideHeader',
        value: Vue.ls.get('autoHideHeader', config.autoHideHeader),
      });
      settingsStore.changeSetting({ key: 'colorWeak', value: Vue.ls.get('colorWeak', config.colorWeak) });
      settingsStore.changeSetting({ key: 'theme', value: Vue.ls.get('theme', variables.theme) });
      settingsStore.changeSetting({ key: 'navTheme', value: Vue.ls.get('navTheme', config.navTheme) });
      settingsStore.changeSetting({ key: 'layout', value: Vue.ls.get('layout', config.layout) });
      settingsStore.changeSetting({
        key: 'tagsView',
        value: Vue.ls.get('tagsView', config.tagsView),
      });
      settingsStore.changeSetting({
        key: 'sidebarLogo',
        value: Vue.ls.get('sidebarLogo', config.sidebarLogo),
      });
    },
    render: (h) => h(App),
  }).$mount('#app');
}
