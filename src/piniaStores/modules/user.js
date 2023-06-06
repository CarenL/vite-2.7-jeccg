import Vue from 'vue';
import { defineStore } from 'pinia';
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

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    realname: '',
    id: '',
    avatar: '',
    roles: [],
    permissionList: [],
    info: {},
  }),
  getters: {
    nickname(state) {
      state.realname = Vue.ls.get(USER_INFO) && Vue.ls.get(USER_INFO).realname;
      return state.realname;
    },
  },
  actions: {
    // user login
    async login(userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            const result = response.result;
            const userInfo = result.userInfo;
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000);
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000);
            Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 * 1000);
            this.token = result.token;
            this.info = userInfo;
            this.name = userInfo.username;
            this.realname = userInfo.realname;
            this.avatar = userInfo.avatar;
            setToken(result.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // get user roles
    getInfo() {
      return new Promise((resolve, reject) => {
        let roles = [];
        if (vue.ls.get(USER_INFO)) {
          roles = vue.ls.get(USER_INFO).roles;
        } else {
          roles = state.roles;
        }
        this.roles = roles;
        resolve(roles);
      });
    },

    // 获取用户信息
    getPermissionList() {
      return new Promise((resolve, reject) => {
        getInfo({ token: this.token })
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
              this.permissionList = menuData;
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

    resetState() {
      Vue.ls.remove(ACCESS_TOKEN);
      Vue.ls.remove(USER_INFO);
      Vue.ls.remove(USER_NAME);
      Vue.ls.remove(UI_CACHE_DB_DICT_DATA);
      Vue.ss.remove(USER_AUTH);
      Vue.ss.remove(SYS_BUTTON_AUTH);
      this.token = getToken();
      this.name = '';
      this.realname = '';
      this.id = '';
      this.avatar = '';
      this.roles = [];
      this.permissionList = [];
      this.info = {};
    },

    // user logout
    logout() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            removeToken(); // must remove  token  first
            resetRouter();
            this.resetState();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // remove token
    resetToken() {
      return new Promise((resolve) => {
        removeToken(); // must remove  token  first
        this.resetState();
        resolve();
      });
    },
  },
});
export default useUserStore;
