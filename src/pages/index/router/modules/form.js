import Layout from '@/layout/index.vue';
export default [
  {
    path: '/form',
    component: Layout,
    meta: {
      title: '表单',
      icon: 'form',
    },
    children: [
      {
        path: 'form1',
        name: 'Form1',
        component: () => import('@index/views/form/form1.vue'),
        meta: {
          title: '表单1',
          icon: 'form',
        },
      },
      {
        path: 'form2',
        name: 'Form2',
        component: () => import('@index/views/form/form2.vue'),
        meta: {
          title: '表单2',
          icon: 'form',
        },
      },
    ],
  },
];
