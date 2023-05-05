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
      const reader = new FileReader();

      reader.readAsText(chartData);
      reader.onload = () => {
        const convertedData = reader.result
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

        this.setChartData(convertedData);
      };
      reader.onerror = () => Promise.reject(reader.error);
    },

    async getChartData() {
      const file = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: "POST",
        headers: { "Content-type": "text/plain" },
      })
        .then((res) => res.blob())
        .then((data) => {
          const url = URL.createObjectURL(data);
          const anchor = document.createElement("a");

          anchor.href = url;
          anchor.download = `Vasilevsky-${Date.now()}.txt`;

          document.body.append(anchor);

          anchor.style = "display: none";
          anchor.click();

          anchor.remove();
          URL.revokeObjectURL(url);

          return data;
        });

      this.convertChartData(file);
    },
  },
});
