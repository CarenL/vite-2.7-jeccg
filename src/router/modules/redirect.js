export default [
  {
    path: '/redirect',
    component: () => import('@/layouts/TabLayout'),
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
];
