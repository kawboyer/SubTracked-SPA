<template>
  <div id="app">
    <Navbar></Navbar>

    <router-view/>
     <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
 #app {
   background-color:#D8DFE2
 }

</style>
