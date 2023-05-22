import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n

import '@/styles/index.scss'; // global css

import App from './App.vue';
import router from './router';
import store from './store';

import '@/icons'; // icon
import 'virtual:svg-icons-register'; // svg-register
import './permission'; // permission control

// import './assets/main.css';

/* 开发环境mock数据，生产环境删掉 */
import { setupProdMockServer } from '@/utils/mockProdServer';
setupProdMockServer(import.meta.env.VITE_APP_BASE_API);

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
