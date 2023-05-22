<template>
  <div :id="id" class="chart-bar"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
  ToolboxComponent,
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
  ToolboxComponent,
  PieChart,
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
      legend: {
        top: 'bottom',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' },
          ],
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
