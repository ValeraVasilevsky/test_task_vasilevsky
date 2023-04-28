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
const intervalId = ref(null);
const intervalTimer = ref(5000);

const stopLoading = () => {
  try {
    clearInterval(intervalId.value);
    isLoading.value = false;
    iconName.value = "play";
  } catch (error) {
    console.error(error.message);
  }
};

const startLoading = async () => {
  isLoading.value = true;
  iconName.value = "pause";
  intervalId.value = setInterval(async () => {
    try {
      await getChartData();
    } catch (error) {
      stopLoading();
      alert(error.message);
    }
  }, intervalTimer.value);
};
</script>

<style scoped lang="scss">
@import "@assets/styles/app.scss";
</style>
