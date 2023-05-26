import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = import.meta.globEager('./modules/*.js');

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = [];
for (const key in modulesFiles) {
  const moduleName = key.replace(/(\.\/modules\/|\.(js|ts))/g, '');
  modules[moduleName] = modulesFiles[key].default || modulesFiles[key];
}

const store = new Vuex.Store({
  // strict: import.meta.env.MODE !== 'production',
  modules: modules,
  getters,
});

export default store;
