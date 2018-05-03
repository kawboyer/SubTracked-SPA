<template>
  <div id="app">
    <Navbar></Navbar>
    <canvas id="planet-chart"></canvas>
    <PlantChart></PlantChart>
    <router-view/>
     <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Chart from 'chart.js'
import planetChartData from '@/components/home/chart-data.js'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    planetChartData,
  }
}
</script>

<style>

</style>
