<template>
  <div class="app">
    <Chart class="app__chart" />
    <BaseButton
      class="app__base-button"
      :iconName="iconName"
      @handleClick="!isLoading ? startLoading() : stopLoading()"
    />
  </div>
</template>

<script setup>
import { useChartStore } from "@/store/chart";
import BaseButton from "@components/BaseButton.vue";
import Chart from "@components/Chart.vue";
import { ref } from "vue";

const isLoading = ref(false);
const iconName = ref("play");
const { getChartData } = useChartStore();

const startLoading = async () => {
  try {
    isLoading.value = true;
    iconName.value = "loading";

    const chartData = await getChartData();
  } catch (e) {
    console.error(e.message);
    iconName.value = "play";
  } finally {
    isLoading.value = false;
  }
};
const stopLoading = () => {
  isLoading.value = false;
  iconName.value = "play";
};
</script>

<style scoped lang="scss">
@import "@assets/styles/app.scss";
</style>
