import Vue from 'vue';
import VueRouter from 'vue-router';

import user from './modules/user';
import home from './modules/home';
import redirect from './modules/redirect';
import form from './modules/form';
import chart from './modules/chart';

//3.1以上版本返回Promise需要兼容
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((e) => {});
};

Vue.use(VueRouter);

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [...user, ...redirect];

//前端控路由
// export const asyncRouterMap = [
//   ...form,
//   ...chart,
//   { path: '*', redirect: '/404', hidden: true },
// ];

//后端控路由
export const asyncRouterMap = [
  // {
  //   path: '/',
  //   name: 'index',
  //   component: () => import('@/layouts/TabLayout'),
  //   meta: { title: '主页' },
  //   redirect: '/home',
  //   children: [],
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

const createRouter = () =>
  new VueRouter({
    // mode: "hash", // require service support
    routes: constantRoutes,
    scrollBehavior() {
      return {
        x: 0,
        y: 0,
      };
    },
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
