export default [
  {
    path: '/',
    component: () => import('@/layouts/TabLayout'),
    redirect: '/home',
    meta: {
      title: '主页',
      icon: 'nested',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@views/home/index.vue'),
        meta: {
          title: '主页',
          icon: 'nested',
        },
      },
    ],
  },
];
