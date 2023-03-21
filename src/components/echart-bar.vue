<template>
  <div class="bar-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, withDefaults} from "vue";
import * as echarts from "echarts";

const props = withDefaults(
  defineProps<{
    title?: string;
    barOption: any;
    xLabels: string[];
    values: any[];
  }>(),
  {
    title: "",
    barOption: {},
  }
);

const options = computed(() => {
  return {
    xAxis: {
      data: props.xLabels,
      name: props.barOption.xAxis.name,
      axisLabel: {
        inside: false,
        color: "#999",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      z: 10,
    },
    yAxis: {
      name: props.barOption.yAxis.name,
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    grid: {
      width: 750,
      top: "20%",
      left: "5%",
      right: "15%",
      bottom: "5%",
      containLabel: true,
    },
    series: [
      {
        type: "bar",
        name: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: "#83bff6"},
            {offset: 0.5, color: "#188df0"},
            {offset: 1, color: "#188df0"},
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: "#2378f7"},
              {offset: 0.7, color: "#2378f7"},
              {offset: 1, color: "#83bff6"},
            ]),
          },
        },
        data: props.values,
      },
    ],
  };
});
</script>

<style scoped></style>
