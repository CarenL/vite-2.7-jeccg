import router from './router/index';
import store from './store/index';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import { generateIndexRouter } from '@/utils/permission';
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/user/login', '/user/register', '/user/register-result', '/user/alteration']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (/\/user/.test(to.path)) {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      // if (hasRoles) {
      //   next();
      // } else {
      //   try {
      //     // get user info
      //     const { roles } = await store.dispatch('user/getInfo');

      //     // generate accessible routes map based on roles
      //     const accessRoutes = await store.dispatch('permission/generateRoutes', roles);

      //     // dynamically add accessible routes
      //     router.addRoutes(accessRoutes);

      //     // hack method to ensure that addRoutes is complete
      //     // set the replace: true, so the navigation will not leave a history record
      //     next({ ...to, replace: true });
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken');
      //     Message.error(error || 'Has Error');
      //     next(`/user/login?redirect=${to.path}`);
      //     NProgress.done();
      //   }
      // }

      if (store.getters.permissionList.length === 0) {
        store
          .dispatch('GetPermissionList')
          .then((res) => {
            const menuData = res.result.menu;
            if (menuData === null || menuData === '' || menuData === undefined) {
              return;
            }
            let constRoutes = [];
            constRoutes = generateIndexRouter(menuData);
            // 添加主界面路由
            store.dispatch('permission/updateAppRouter', { constRoutes }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              store.getters.addRouters.forEach((item) => router.addRoute(item));
              const redirect = decodeURIComponent(from.query.redirect || to.path);
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true });
              } else {
                // 跳转到目的路由
                next({ path: redirect });
              }
            });
          })
          .catch(() => {
            /* notification.error({
              message: '系统提示',
              description: '请求用户信息失败，请重试！'
            })*/
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } });
            });
          });
      } else {
        next();
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/user/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
