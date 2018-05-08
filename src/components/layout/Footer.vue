<template>
<footer class="page-footer">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="white-text">About SubTracked</h5>
        <p class="footer-text grey-text text-lighten-4">Overwhelmed by subscriptions and free trials? SubTracked keeps track of all your online subscriptions in one convenient app. We monitor your monthly charges and notify you when your free trials are about to expire. Save time. Save money.</p>
      </div>
      <div class="col l4 offset-l2 s12">
        <h5 class="footer-github white-text">Github Links</h5>
        <ul class="footer-github">
          <li><a class="footer-github grey-text text-lighten-3" v-bind:href="this.results[0].link"> {{this.results[0].name}} </a></li>
          <li><a class="footer-github grey-text text-lighten-3" v-bind:href="this.results[1].link"> {{this.results[1].name}} </a></li>
          <li><a class="footer-github grey-text text-lighten-3" v-bind:href="this.results[2].link"> {{this.results[2].name}} </a></li>
          <li><a class="footer-github grey-text text-lighten-3" v-bind:href="this.results[3].link"> {{this.results[3].name}} </a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
      © 2018 SubTracked
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

<style>

  .footer-text {
    text-align: left;
  }

  .footer-github {
    text-align: right;
  }

  .page-footer {
    background-color: #31708E;
    bottom: 0px;
    color: #F7F9FB;
    font-family: 'Noto Sans', sans-serif;
  }
</style>
