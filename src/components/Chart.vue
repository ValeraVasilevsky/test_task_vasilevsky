<template>
  <div class="chart">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup>
import { useChartStore } from "@/store/chart";
import { renderChart } from "@components/Chart";
import { computed, onMounted, ref, watch } from "vue";

const chartStore = useChartStore();
const chart = ref(null);
const chartData = computed(() => chartStore.chartData);

const drawChart = () => {
  const chartCtx = chart.value?.getContext("2d");
  renderChart({
    ctx: chartCtx,
    data: chartData.value,
  });
};

watch(chartData, () => drawChart());

onMounted(() => {
  drawChart();
});
</script>

<style lang="scss" scoped>
@import "@assets/styles/components/Chart.scss";
</style>
