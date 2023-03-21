<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, withDefaults} from "vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    lineOption: any;
    xLabels: string[];
    values: any[];
  }>(),
  {
    title: "",
    lineOption: {},
  }
);

const options = computed(() => {
  return {
    title: {
      text: props.title,
    },
    color: ["#FFAD49", "#9AB3FF", "#4DA1EE", "#33C4B3", "#FE9CA0", "#FFAD49"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      orient: "vertical",
      left: "right",
      top: 10,
      itemGap: 5,
      itemWidth: 20,
      itemHeight: 15,
    },
    grid: {
      top: "20%",
      left: "5%",
      right: "15%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        name: props.lineOption.xAxis.name,
        boundaryGap: false,
        data: props.xLabels,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: props.lineOption.yAxis.name,
      },
    ],
    series: [
      {
        type: "line",
        name: props.lineOption.series.name,
        data: props.values,
        label: {},
        labelLayout: {
          x: "10",
          draggable: true,
        },
      },
      props.lineOption.extra,
    ],
  };
});
</script>

<style scoped></style>
