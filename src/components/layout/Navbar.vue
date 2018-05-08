<template>
  <div class="navbar">
    <nav class="navbar-color">
      <div class="container">
        <!-- REPLACE THE a herf below with this if we want to redirect it -->
        <li class="brand-logo left" v-if="user"><router-link :to="{ name: 'Subscript' }">Subtracked</router-link></li>
        <li class="brand-logo left" v-if="!user"><router-link :to="{ name: 'Login' }">Subtracked</router-link></li>


        <ul class="right">
          <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="user">{{user.email}}</li>
          <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'Login' });
        });
    }
  }
};
</script>

<style>
.navbar-color {
  background-color: #0D3446
}

</style>