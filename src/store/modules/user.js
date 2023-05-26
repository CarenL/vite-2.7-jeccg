import { login, logout, getInfo } from '@api/user';
import { queryPermissionsByUser } from '@api/permission';
import { getToken, setToken, removeToken } from '@utils/auth';
import { resetRouter } from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token })
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject('Verification failed, please Login again.');
          }

          const { name, roles, avatar } = data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!');
          }

          commit('SET_ROLES', roles);

          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 获取用户信息
  GetPermissionList({ commit }) {
    return new Promise((resolve, reject) => {
      queryPermissionsByUser()
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

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true });

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
