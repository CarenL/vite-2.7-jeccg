export default [
  {
    path: '/user',
    component: () => import('@index/views/user/index.vue'),
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@index/views/user/login.vue'),
      },
    ],
  },
];
