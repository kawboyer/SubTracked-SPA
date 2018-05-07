<template>
  <div>
    <p>Monthly Expenses: ${{this.subTotal}} </p>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
console.log("Hi!");

export default {
  name: "Total",
  data() {
    return {
      subTotal: ''
    }
  },
  mounted() {
    db.collection("subscriptions")
    .where("to", "==", firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
      // Create an empty object to use
      let total = 0;
      querySnapshot.forEach(function(doc) {
        total += parseFloat(doc.data().price);
      })
      this.subTotal = total.toFixed(2).toString();
    });
  }
}
</script>

<style>
p {
  text-align: center;
}
</style>