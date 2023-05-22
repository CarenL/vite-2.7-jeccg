import Layout from '@/layout/index.vue';
export default [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '主页',
      icon: 'nested',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@index/views/home/index.vue'),
        meta: {
          title: '主页',
          icon: 'nested',
        },
      },
    ],
  },
];
