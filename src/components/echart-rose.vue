<template>
  <div class="rose-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";
import {IDataType} from "./types";

const props = defineProps<{
  roseData: IDataType[];
}>();

const options = computed(() => {
  return {
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataview: {show: true, readonly: false},
        restore: {show: true},
        saveAsImage: {show: true},
      },
    },
    series: [
      {
        name: "类别数据",
        type: "pie",
        radius: [30, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
      },
    ],
  };
});
</script>

<style scoped></style>
