import http from "@/api/http";
import { defineStore } from "pinia";

export const useChartStore = defineStore("chart", {
  state: () => ({}),
  actions: {
    async getChartData() {
      const { data: chartData } = await http.get("frontend-2023.txt");
      return chartData;
    },
  },
});
