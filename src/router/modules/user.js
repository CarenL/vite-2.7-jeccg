export default [
  {
    path: '/user',
    component: () => import('@views/user/index.vue'),
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@views/user/login.vue'),
      },
    ],
  },
];
