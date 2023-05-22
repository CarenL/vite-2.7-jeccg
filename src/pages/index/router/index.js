import Vue from 'vue';
import VueRouter from 'vue-router';

import user from './modules/user';
import home from './modules/home';
import form from './modules/form';
import chart from './modules/chart';

//3.1以上版本返回Promise需要兼容
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((e) => {});
};

Vue.use(VueRouter);

const constantroutes = [...user, ...home, ...form, ...chart];

const createRouter = () =>
  new VueRouter({
    // mode: "hash", // require service support
    routes: constantroutes,
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
