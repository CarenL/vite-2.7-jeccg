import TabLayout from '@/layout/TabLayout/index.vue';
export default [
  {
    path: '/redirect',
    component: TabLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
];
