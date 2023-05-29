import Vue from 'vue';
import { USER_INFO } from '@/store/mutation-types';

const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  nickname: (state) => {
    state.user.realname = Vue.ls.get(USER_INFO).realname;
    return state.user.realname;
  },
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permissionList: (state) => state.user.permissionList,
  permission_routes: (state) => state.permission.routes,
  errorLogs: (state) => state.errorLog.logs,
};
export default getters;
