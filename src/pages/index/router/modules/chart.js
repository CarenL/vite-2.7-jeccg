import Layout from '@/layout/index.vue';
export default [
  {
    path: '/chart',
    component: Layout,
    meta: {
      title: '图表',
      icon: 'el-icon-data-line',
    },
    children: [
      {
        path: 'bar',
        name: 'Bar',
        component: () => import('@index/views/echart/bar.vue'),
        meta: {
          title: '柱状图',
          icon: 'el-icon-s-data',
        },
      },
      {
        path: 'pie',
        name: 'Pie',
        component: () => import('@index/views/echart/pie.vue'),
        meta: {
          title: '饼状图',
          icon: 'el-icon-s-help',
        },
      },
    ],
  },
];
