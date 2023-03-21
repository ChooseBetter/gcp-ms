import * as echarts from "echarts";

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el);

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  // 调整大小
  const updateSize = () => {
    echartInstance.resize();
  };

  //监听窗口，调整echart
  window.addEventListener("resize", () => {
    echartInstance.resize();
  });

  return {
    echartInstance,
    setOptions,
    updateSize,
  };
}
