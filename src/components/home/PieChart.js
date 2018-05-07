import { Pie } from 'vue-chartjs'
import db from "@/firebase/init";
import firebase from "firebase";
const database = firebase.database();
const messagesRef = database.ref("messages");

export default {
  extends: Pie,
  mounted () {
    db.collection("subscriptions")
    .where("to", "==", firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
      // Create an empty object to use
      let totals = {}
        querySnapshot.forEach(function(doc) {

            // Grab category from Firebase Database
            const category = doc.data().category;

            // Grab and convert price to integer
            const price = parseFloat(doc.data().price);

            // If a category already exists
            if (totals[category]) {
              // Sum up all prices in that category
              totals[category] += price;
            }
            // Else set the value equal to the price
            else {
              totals[category] = price; 
            }
            // console.log(doc.data());
        });
        console.log(totals)
        
        // Render Chart
        this.renderChart({
          labels: Object.keys(totals),
          datasets: [
            {
              backgroundColor: ['#FCFA70', '#6A99CB', '#4D7CAE', '#375A7F', '#FCFA70', '#6A99CB', '#4D7CAE', '#FCFA70'],
              data: Object.values(totals),
            }
          ]
        }, {responsive: true, maintainAspectRatio: false})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
}