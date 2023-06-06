const modulesFiles = import.meta.globEager('./*.vue');

export default {
  install(Vue) {
    //注册表单组件
    for (const key in modulesFiles) {
      console.log(key);
      const moduleName = key.replace(/(\.\/|\.vue)/g, '');
      Vue.component(moduleName, modulesFiles[key]);
    }
  },
};
