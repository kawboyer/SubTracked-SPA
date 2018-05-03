<template>
<footer class="page-footer">
<div class="container">
  <div class="row">
    <div class="col l6 s12">
      <h5 class="white-text">About SubTracked</h5>
      <p class="grey-text text-lighten-4">SubTracked is designed to help you keep track of all of your subscriptions and show you where your money goes each month. It helps you keep track of when free trials are about to end so that you can remember to unsubscribe before it starts charging you. The ultimate goal of SubTracked is to help subtract unwanted subscriptions and charges from your monthly expenses.</p>
    </div>
    <div class="col l4 offset-l2 s12">
      <h5 class="white-text">Github Links</h5>
      <ul>
        <li><a class="grey-text text-lighten-3" v-bind:href="this.results[0].link"> {{this.results[0].name}} </a></li>
        <li><a class="grey-text text-lighten-3" v-bind:href="this.results[1].link"> {{this.results[1].name}} </a></li>
        <li><a class="grey-text text-lighten-3" v-bind:href="this.results[2].link"> {{this.results[2].name}} </a></li>
        <li><a class="grey-text text-lighten-3" v-bind:href="this.results[3].link"> {{this.results[3].name}} </a></li>
      </ul>
    </div>
  </div>
</div>
<div class="footer-copyright">
  <div class="container">
    © 2017 Copyright Text
      <!-- <a class="grey-text text-lighten-4 right" href="#!">More Links</a> -->
  </div>
</div>
</footer>
</template>

<script>

import axios from "axios"
const url = "/Github";
export default {
  name: "Footer",
  data() {
    return {
      results: []
    };
  },
  mounted() {
    axios.get(url).then(response => {
      this.results = response.data;
      console.log(response.data)
    });
  }
};
</script>