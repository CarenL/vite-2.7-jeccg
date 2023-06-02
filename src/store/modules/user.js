import Vue from 'vue';
import { login, logout, getInfo } from '@api/user';
import { getToken, setToken, removeToken } from '@utils/auth';
import {
  ACCESS_TOKEN,
  USER_NAME,
  USER_INFO,
  USER_AUTH,
  SYS_BUTTON_AUTH,
  UI_CACHE_DB_DICT_DATA,
} from '@/store/mutation-types';
import { resetRouter } from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    realname: '',
    id: '',
    avatar: '',
    roles: [],
    permissionList: [],
    info: {},
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Vue.ls.remove(ACCESS_TOKEN);
    Vue.ls.remove(USER_INFO);
    Vue.ls.remove(USER_NAME);
    Vue.ls.remove(UI_CACHE_DB_DICT_DATA);
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, { username, realname }) => {
    state.name = username;
    state.realname = realname;
  },
  SET_USER_ID: (state, id) => {
    localStorage.setItem('id', id);
    state.id = id;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_PERMISSIONLIST: (state, permissionList) => {
    state.permissionList = permissionList;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((response) => {
          const result = response.result;
          const userInfo = result.userInfo;
          console.log(userInfo);
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
          Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000);
          Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000);
          Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 * 1000);
          commit('SET_TOKEN', result.token);
          commit('SET_INFO', userInfo);
          commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname }, 7 * 24 * 60 * 60 * 1000);
          commit('SET_AVATAR', userInfo.avatar);
          setToken(result.token);
          console.log('登录成功');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // get user roles
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let roles = [];
      if (vue.ls.get(USER_INFO)) {
        roles = vue.ls.get(USER_INFO).roles;
      } else {
        roles = state.roles;
      }
      commit('SET_ROLES', roles);
      resolve(roles);
    });
  },

  // 获取用户信息
  getPermissionList({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token })
        .then((response) => {
          const menuData = response.result.menu;
          const authData = response.result.auth;
          const allAuthData = response.result.allAuth;
          console.log('===> queryPermissionsByUser Vue.ss', Vue.ss);
          Vue.ss.set(USER_AUTH, authData);
          Vue.ss.set(SYS_BUTTON_AUTH, allAuthData);
          if (menuData && menuData.length > 0) {
            // 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示
            menuData.forEach((item, index) => {
              if (item['children']) {
                if (item['children'].every((i) => i.hidden)) {
                  item['hidden'] = true;
                }
              }
            });
            //console.log(' menu show json ', menuData)
            commit('SET_PERMISSIONLIST', menuData);
          } else {
            reject('getPermissionList: permissions must be a non-null array !');
          }
          resolve(response);
        })
        .catch((error) => {
          console.log('===> queryPermissionsByUser catch', error);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit('RESET_STATE');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
