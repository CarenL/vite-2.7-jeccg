// 生成首页路由
export function generateIndexRouter(data) {
  const indexRouter = asyncRouterMap.find((item) => item.path === '/');
  indexRouter.children = [...generateChildRouters(data)];
  return [...asyncRouterMap];
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
    if (item.component.indexOf('layouts') >= 0) {
      component = 'components/' + item.component;
    } else {
      component = 'views/' + item.component;
    }

    // eslint-disable-next-line
    item.meta.url = (item.meta.url || '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)); // URL支持{{ window.xxx }}占位符变量

    const componentPath = (resolve) => require(['@/' + component + '.vue'], resolve);

    let menu = {
      path: item.path,
      name: item.name,
      redirect: item.redirect,
      component: componentPath,
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
