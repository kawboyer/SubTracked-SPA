<template>
  <div>
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import planetChartData from "./chart-data.js";
const ctx = document.getElementById("planet-chart");
const myChart = new Chart(ctx, {
  type: "",
  data: [],
  options: {},
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
    data() {
      return {
        planetChartData: planetChartData
      };
    },
    mounted() {
      this.createChart("planet-chart", this.planetChartData);
    }
  }
});
</script>

<style>

</style>
