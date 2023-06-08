import { createPinia } from 'pinia';
import useUserStore from './modules/user';
import useTagsViewStore from './modules/tagsView';
import useAppStore from './modules/app';
import useSettingsStore from './modules/settings';
import usePermissionStore from './modules/permission';
import useErrorLogStore from './modules/errorLog';

const store = createPinia();

// 适用vue3 多个vue实例并存的情况
// export function registerStore(app) {
//   app.use(store);
// }

export { useUserStore, useTagsViewStore, useAppStore, useSettingsStore, usePermissionStore, useErrorLogStore };

export default store;
