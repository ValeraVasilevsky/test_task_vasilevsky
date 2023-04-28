import { http } from "@/api/http";
import { defineStore } from "pinia";

export const useChartStore = defineStore("chart", {
  state: () => ({
    chartData: [],
  }),
  actions: {
    getRandomColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },
    setChartData(chartData) {
      this.chartData = chartData;
    },
    convertChartData(chartData) {
      const convertedData = chartData
        .split("\n")
        .filter((dataItem) => dataItem.length)
        .map((dataItem) => dataItem.split(" "))
        .map((dataItem) => ({
          label: dataItem[0],
          data: [
            {
              name: dataItem[0],
              value: Number(dataItem[1]),
              backgroundColor: this.getRandomColor(),
            },
          ],
        }));

      return convertedData;
    },

    async getChartData() {
      const { data: responeData } = await http.get("frontend-2023.txt");
      const convertedData = this.convertChartData(responeData);

      this.setChartData(convertedData);
    },
  },
});
