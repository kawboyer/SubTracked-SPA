<template>
<footer class="page-footer">
<div class="container">
  <div class="row">
    <div class="col l6 s12">
      <h5 class="white-text">Footer Content</h5>
      <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
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
    © 2014 Copyright Text
      <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
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