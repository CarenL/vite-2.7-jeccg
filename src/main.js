import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import locale from 'element-ui/lib/locale/lang/en'; // lang i18n

import '@/styles/index.scss'; // global css

import App from './App.vue';
import router from './router';
import store from './store';
import Storage from 'vue-ls';

import '@/icons'; // icon
import 'virtual:svg-icons-register'; // svg-register
import './permission'; // permission control

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

SSO.init(async () => {
  await initConfig();
  main();
});

function main() {
  new Vue({
    router,
    store,
    mounted() {
      store.dispatch('app/setSidebar', Vue.ls.get(SIDEBAR_TYPE, true));
      store.dispatch('app/setSize', Vue.ls.get(SIZE_TYPE, 'medium'));
      store.dispatch('settings/changeSetting', { key: 'layout', value: Vue.ls.get('layout', config.layout) });
      store.dispatch('settings/changeSetting', {
        key: 'fixedHeader',
        value: Vue.ls.get('fixedHeader', config.fixedHeader),
      });
      store.dispatch('settings/changeSetting', {
        key: 'fixSiderbar',
        value: Vue.ls.get('fixSiderbar', config.fixSiderbar),
      });
      store.dispatch('settings/changeSetting', {
        key: 'contentWidth',
        value: Vue.ls.get('contentWidth', config.contentWidth),
      });
      store.dispatch('settings/changeSetting', {
        key: 'autoHideHeader',
        value: Vue.ls.get('autoHideHeader', config.autoHideHeader),
      });
      store.dispatch('settings/changeSetting', { key: 'weak', value: Vue.ls.get('weak', config.colorWeak) });
      store.dispatch('settings/changeSetting', { key: 'theme', value: Vue.ls.get('theme', config.theme) });
      store.dispatch('settings/changeSetting', {
        key: 'tagsView',
        value: Vue.ls.get('tagsView', config.tagsView),
      });
      store.dispatch('settings/changeSetting', {
        key: 'sidebarLogo',
        value: Vue.ls.get('sidebarLogo', config.sidebarLogo),
      });
    },
    render: (h) => h(App),
  }).$mount('#app');
}
