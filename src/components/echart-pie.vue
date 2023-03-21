<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import {defineProps, computed} from "vue";
import {IDataType} from "./types";

const props = defineProps<{
  pieData: IDataType;
}>();

const options = computed(() => {
  return {
    color: ["#FFAD49", "#9AB3FF", "#4DA1EE", "#33C4B3", "#FE9CA0", "#FFAD49"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "right",
      top: 10,
      itemGap: 5,
      itemWidth: 10,
      itemHeight: 10,
    },
    grid: {
      top: "10%",
      left: "5%",
      right: "15%",
      bottom: "5%",
      containLabel: true,
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        right: 100,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
      },
    ],
  };
});
</script>

<style scoped></style>
