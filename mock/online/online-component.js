import Mock from 'mockjs';

export default [
  {
    url: '/online/component/options',
    method: 'get',
    response: () => {
      return {
        code: 200,
        result: [
          {
            data: {
              description: '',
              dictCode: 'online_report_type',
              dictDescription: '',
              dictId: '1528618949809971201',
              dictName: '报表类型',
              id: '1528618994672246785',
              itemText: '表格',
              itemValue: 'table',
            },
            disabled: false,
            label: '表格',
            title: '表格',
            value: 'table',
          },
          {
            data: {
              description: '',
              dictCode: 'online_report_type',
              dictDescription: '',
              dictId: '1528618949809971201',
              dictName: '报表类型',
              id: '1528619028931321857',
              itemText: '图表',
              itemValue: 'chart',
            },
            disabled: false,
            label: '图表',
            title: '图表',
            value: 'chart',
          },
        ],
      };
    },
  },
];
