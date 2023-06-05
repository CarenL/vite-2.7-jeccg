import { createPinia } from 'pinia';
import useUserStore from './modules/user';
import useTagsViewStore from './modules/tagsView';
import useAppStore from './modules/app';
import useSettingsStore from './modules/settings';
import usePermissionStore from './modules/permission';
import useErrorLogStore from './modules/errorLog';

const store = createPinia();

export function registerStore(app) {
  app.use(store);
}

export { useUserStore, useTagsViewStore, useAppStore, useSettingsStore, usePermissionStore, useErrorLogStore };

export default store;
