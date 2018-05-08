import { Pie } from "vue-chartjs";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  extends: Pie,
  created() {
    db
      .collection("subscriptions")
      .where("to", "==", firebase.auth().currentUser.uid)
      .onSnapshot(snapshot => {
        snapshot.docChanges
          .forEach(change => {
            if (
              change.type == "added" ||
              change.type == "modified" ||
              change.type == "removed"
            ) {
              // Create an empty object to use
              let totals = {};
              snapshot.forEach(function(doc) {
                // Grab category from Firebase Database
                const category = doc.data().category;

                // Grab and convert price to integer
                const price = parseFloat(doc.data().price);

                let adjPrice = price;
                if (
                  doc.data().frequency === "Annually" ||
                  doc.data().frequency === "annually"
                ) {
                  adjPrice = parseFloat(doc.data().price) / 12;
                  console.log(adjPrice);
                }
                if (
                  doc.data().frequency === "Quarterly" ||
                  doc.data().frequency === "quarterly"
                ) {
                  adjPrice = parseFloat(doc.data().price) / 4;
                  console.log(adjPrice);
                }

                // If a category already exists
                if (totals[category]) {
                  // Sum up all prices in that category
                  totals[category] += adjPrice.toFixed(2);
                }
                // Else set the value equal to the price
                else {
                  totals[category] = adjPrice.toFixed(2);
                }
                // console.log(doc.data());
              });
              console.log(totals);

              // Render Chart
              
              this.renderChart(
                {
                  labels: Object.keys(totals),
                  datasets: [
                    {
                      backgroundColor: [
                        "#FCFA70",
                        "#6A99CB",
                        "#4D7CAE",
                        "#375A7F",
                        "#FCFA70",
                        "#6A99CB",
                        "#4D7CAE",
                        "#FCFA70"
                      ],
                      data: Object.values(totals)
                    }
                  ]
                },
                { responsive: true, maintainAspectRatio: false }
              );
            }
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      });
  }
};
