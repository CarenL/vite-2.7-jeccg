const modulesFiles = import.meta.glob('./*.vue');

export default {
  install(Vue) {
    //注册表单组件
    for (const key in modulesFiles) {
      console.log(key);
      const moduleName = key.replace(/(\.\/|\.vue)/g, '');
      console.log(moduleName, modulesFiles[key]);
      Vue.component(moduleName, modulesFiles[key]);
    }
  },
};
