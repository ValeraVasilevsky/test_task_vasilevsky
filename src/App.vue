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
import { TIMER } from "@/constants/timer";
import { useChartStore } from "@/store/chart";
import BaseButton from "@components/BaseButton.vue";
import Chart from "@components/Chart.vue";
import { ref } from "vue";

const { getChartData } = useChartStore();

const intervalId = ref(null);
const isLoading = ref(false);
const iconName = ref("play");

const stopLoading = () => {
  clearInterval(intervalId.value);
  isLoading.value = false;
  iconName.value = "play";
};

const startLoading = async () => {
  isLoading.value = true;
  iconName.value = "loader";
  intervalId.value = setInterval(async () => {
    try {
      iconName.value = "pause";
      await getChartData();
    } catch (error) {
      stopLoading();
      alert(error.message);
    }
  }, TIMER);
};
</script>

<style scoped lang="scss">
@import "@assets/styles/app.scss";
</style>
