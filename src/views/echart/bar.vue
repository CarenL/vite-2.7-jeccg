<template>
  <div :id="id" class="chart-bar"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
import { ref, reactive, onMounted } from 'vue';
import { genId } from '@/utils/common';
export default {
  setup() {
    let id = ref();
    let chart = '';
    let option = reactive({
      title: {
        text: 'World Population',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
        {
          name: '2012',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807],
        },
      ],
    });
    id = genId();

    onMounted(() => {
      chart = echarts.init(document.getElementById(id));
      // console.log(document.getElementById(id));
      chart && chart.setOption(option);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    });

    return { id };
  },
};
</script>

<style lang="scss">
.chart-bar {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
}
</style>
