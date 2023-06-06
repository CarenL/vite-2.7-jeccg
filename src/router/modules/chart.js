export default [
  {
    path: '/chart',
    component: () => import('@/layouts/TabLayout'),
    meta: {
      title: '图表',
      icon: 'el-icon-data-line',
    },
    children: [
      {
        path: 'bar',
        name: 'Bar',
        component: () => import('@views/echart/bar.vue'),
        meta: {
          title: '柱状图',
          icon: 'el-icon-s-data',
        },
      },
      {
        path: 'pie',
        name: 'Pie',
        component: () => import('@views/echart/pie.vue'),
        meta: {
          title: '饼状图',
          icon: 'el-icon-s-help',
        },
      },
    ],
  },
];
