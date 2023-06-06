import { constantRoutes, asyncRouterMap } from '@/router';
// import Layout from '@/layouts/TabLayout';
// import RouterView from '@/layouts/RouterView';

const modules = import.meta.glob('@/views/**/**.vue');

/* 根据后端路由列表生成路由 */

// 生成首页路由
export function generateIndexRouter(data) {
  // const indexRouter = asyncRouterMap.find((item) => item.path === '/');
  // indexRouter.children = [...generateChildRouters(data)];
  // return [...asyncRouterMap];
  // 重定向也放入后台
  let routers = generateChildRouters(data);
  routers = routers.concat(asyncRouterMap);
  return [...routers];
}

// 生成嵌套路由（子路由）
function generateChildRouters(data) {
  const routers = [];
  for (let item of data) {
    //判断是否生成路由
    if (item.route === '0') {
      continue;
    }
    let component = '';
    let conponentPath = '';
    if (item.component.indexOf('TabLayout') >= 0) {
      component = item.component;
      conponentPath = () => import('@/layouts/TabLayout');
    } else if (item.component.indexOf('RouterView') >= 0) {
      component = item.component;
      conponentPath = () => import('@/layouts/RouterView');
    } else {
      component = 'views/' + item.component + '.vue';
      conponentPath = resolveComponent(component);
    }

    // eslint-disable-next-line
    item.meta.url = (item.meta.url || '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)); // URL支持{{ window.xxx }}占位符变量

    let menu = {
      path: item.path,
      name: item.name,
      redirect: item.redirect,
      component: conponentPath,
      //component: resolve => require(['@/' + component+'.vue'], resolve),
      hidden: item.hidden,
      meta: {
        title: item.meta.title,
        icon: item.meta.icon,
        url: item.meta.url,
        permissionList: item.meta.permissionList,
        keepAlive: item.meta.keepAlive,
        /*update_begin author:wuxianquan date:20190908 for:赋值 */
        internalOrExternal: item.meta.internalOrExternal,
        /*update_end author:wuxianquan date:20190908 for:赋值 */
        componentName: item.meta.componentName,
      },
    };
    if (item.alwaysShow) {
      menu.alwaysShow = true;
      menu.redirect = menu.path;
    }
    if (item.children && item.children.length > 0) {
      menu.children = [...generateChildRouters(item.children)];
    }
    //处理地址中带的参数  path?a=1&b=2
    if (item['path'] && item['path'].includes('?')) {
      let pathQueryStr = item['path'].split('?')[1];
      let queryObject = {};
      for (let item of pathQueryStr.split('&') || []) {
        queryObject[item.split('=')[0]] = item.split('=')[1];
      }
      menu.query = queryObject;
      menu.path = item['path'].split('?')[0];
    } else {
      menu.query = {};
    }
    routers.push(menu);
  }
  return routers;
}

/* 解析路由 */
function resolveComponent(name) {
  const importPage = modules[`/src/${name}`];
  if (!importPage) {
    throw new Error('未知的页面...');
  }

  return importPage;
}

/* 更具roles生成路由 */
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = asyncRouterMap || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles);
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
  updateAppRouter({ commit }, { menuData }) {
    return new Promise((resolve) => {
      let routelist = generateIndexRouter(menuData);
      commit('SET_ROUTES', routelist);
      resolve(routelist);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
