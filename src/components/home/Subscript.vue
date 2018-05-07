<template>

<div class="container">
    <PieChart></PieChart>
    <Total></Total>

   <div id="subscription" class="container">
     <!-- Messages -->
     <div v-for="(message, index) in messages" v-bind:key="index" class="card">
       <div class="card-body">
           
         <!-- Subscription -->
         <h6 class="card-subtitle mb-2 text-muted">{{ message.nickname }}</h6>
        
         <!-- SUBSCRIPTION CONTENT -->
         <!-- Category -->
          <p v-if="message !== editingMessage" class="card-text">Category: {{ message.category }}</p>
         <div v-else>
           <p>Category:</p>
           <textarea v-model="subCategory" class="form-control"></textarea>
         </div>
         <!-- price -->
         <p v-if="message !== editingMessage" class="card-text">Price: {{ message.price }}</p>
         <div v-else>
           <p>Price:</p>
           <textarea v-model="subPrice" class="form-control"></textarea>
         </div>
         <!-- <textarea v-else v-model="subPrice" class="form-control"></textarea> -->

         <!-- frequency -->
         <p v-if="message !== editingMessage" class="card-text">Frequency: {{ message.frequency }}</p>
         <div v-else>
           <p>Frequency:</p>
           <textarea v-model="subFrequency" class="form-control"></textarea>
         </div>
         <!-- <textarea v-else v-model="subFrequency" class="form-control"></textarea> -->

         <!-- date -->
         <p v-if="message !== editingMessage" class="card-text">Start Date: {{ message.date }}</p>
         <div v-else>
           <p>Start Date:</p>
           <textarea v-model="subStartDate" class="form-control"></textarea>
         </div>
         <!-- <textarea v-else v-model="subStartDate" class="form-control"></textarea> -->

         <!-- reminder -->
         <p v-if="message !== editingMessage" class="card-text">Reminder: {{ message.reminder }}</p>
         <div v-else>
           <p>Reminder:</p>
           <textarea v-model="subReminder" class="form-control"></textarea>
         </div>
         <!-- <textarea v-else v-model="subReminder" class="form-control"></textarea> -->

         <!-- Notes -->
         <p v-if="message !== editingMessage" class="card-text">Message: {{ message.text }}</p>
         <div v-else>
           <p>Message:</p>
           <textarea v-model="messageText" class="form-control"></textarea>
         </div>
         <!-- <textarea v-else v-model="messageText" class="form-control"></textarea> -->


         <!-- actions -->
         <div v-if="message !== editingMessage">
           <a @click.prevent="deleteMessage(message)" href="#" class="card-link">Delete</a>
           <a @click.prevent="editMessage(message)" href="#" class="card-link">Edit</a>
         </div>
         <div v-else>
           <a @click.prevent="cancelEditing" href="#" class="card-link">Cancel</a>
           <a @click.prevent="updateMessage" href="#" class="card-link">Update</a>
         </div>
       </div>
     </div>


     <hr>
     <div class="card-outer">
     <!-- New Message -->
     <form v-if="!editingMessage" @submit.prevent="storeMessage">
       <div class="form-group">
         <label>Subscription:</label>
         <input v-model="nickname" class="form-control" />
       </div>
       <!-- Category -->
       <div class="form-group">
         <label>Category:</label>
         <input v-model="subCategory" class="form-control" />
       </div>
       <!-- price -->
       <div class="form-group">
         <label>Price:</label>
         <input v-model="subPrice" class="form-control" />
       </div>
       <!-- frequency -->
       <div class="form-group">
         <label>Frequency:</label>
         <input v-model="subFrequency" class="form-control" />
       </div>
       <!-- date -->
       <div class="form-group">
         <label>Start Date:</label>
         <input v-model="subStartDate" class="form-control" />
       </div>
       <!-- reminder -->
       <div class="form-group">
         <label>Reminder:</label>
         <input v-model="subReminder" class="form-control" />
       </div>
       <!-- notes -->
       <div class="form-group">
         <label>Message:</label>
         <textarea v-model="messageText" class="form-control"></textarea>
       </div>

       <button class="btn btn-primary">Send</button>
     </form>
   </div>
 </div>

</template>

<script>
import PieChart from "@/components/home/PieChart";
import Total from "@/components/home/Total"
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Subscript",
  components: {
    PieChart,
    Total
  },
  data() {
    return {
      messages: [],
      messageText: "",
      nickname: "",
      subCategory: "",
      subPrice: "",
      subFrequency: "",
      subStartDate: "",
      subReminder: "",
      editingMessage: null,
      user: null
    };
  },
  //   firestore() {
  //     return {
  //       messages: db.collection("subscriptions")
  //     };
  //   },
  created() {
    let ref = db.collection("users");
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          (this.user = doc.data()), (this.user.id = doc.id);
        });
      });
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.user = user.data();
      });

    db
      .collection("subscriptions")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges.forEach(change => {
          if (change.type == "added") {
            this.messages.push({
              id: change.doc.id,
              //   from: change.doc.data().from,
              text: change.doc.data().text,
              nickname: change.doc.data().nickname,
              price: change.doc.data().price,
              category: change.doc.data().category,
              frequency: change.doc.data().frequency,
              date: change.doc.data().date,
              reminder: change.doc.data().reminder
            });
          } else if (change.type == "removed") {
            const index = this.messages.indexOf(change.doc.data().id);
            this.messages.splice(index, 1);
            console.log(index);
          } else if (change.type == "modified") {
            //   from: change.doc.data().from,
            console.log("FINDING");
            const updatedMessage = this.messages.find(message => message.id === change.doc.id);
            const index = this.messages.indexOf(updatedMessage);
            console.log(index);
            this.messages[index].text = change.doc.data().text;
            this.messages[index].category = change.doc.data().category;
            this.messages[index].price = change.doc.data().price;
            this.messages[index].frequency = change.doc.data().frequency;
            this.messages[index].date = change.doc.data().date;
            this.messages[index].reminder = change.doc.data().reminder;
            console.log(change.doc.data());
            // this.messages.set({
            // text: change.doc.data().text;
            // category: change.doc.data().category,
            // price: change.doc.data().price,
            // frequency: change.doc.data().frequency,
            // date: change.doc.data().date,
            // reminder: change.doc.data().reminder,
            // })
          }

          //   else if (change.type == "removed"){
          //        this.messages.unshift({
          //       id: change.doc.id,
          //       //   from: change.doc.data().from,
          //       text: change.doc.data().text,
          //       nickname: change.doc.data().nickname,
          //       price: change.doc.data().price,
          //       category: change.doc.data().category,
          //       frequency: change.doc.data().frequency,
          //       date: change.doc.data().date,
          //       reminder: change.doc.data().reminder
          //     });
          //   }
        });
      });

    // ref.on("child_added", snapshot => {
    //   this.messages.push({
    //     ...snapshot.val(),
    //     id: snapshot.key
    //   });
    // });
    // ref.on("child_removed", snapshot => {
    //   const deletedMessage = this.messages.find(
    //     message => message.id === snapshot.key
    //   );
    //   const index = this.messages.indexOf(deletedMessage);
    //   this.messages.splice(index, 1);
    // });
    // ref.on("child_changed", snapshot => {
    //   const updatedMessage = this.messages.find(
    //     message => message.id === snapshot.key
    //   );
    //   updatedMessage.text = snapshot.val().text;
    //   updatedMessage.category = snapshot.val().category;
    //   updatedMessage.price = snapshot.val().price;
    //   updatedMessage.frequency = snapshot.val().frequency;
    //   updatedMessage.date = snapshot.val().date;
    //   updatedMessage.reminder = snapshot.val().reminder;
    // });
  },
  methods: {
    storeMessage() {
      db.collection("subscriptions").add({
        to: this.$route.params.id,
        // from: this.user.id,
        text: this.messageText,
        nickname: this.nickname,
        price: this.subPrice,
        category: this.subCategory,
        frequency: this.subFrequency,
        date: this.subStartDate,
        reminder: this.subReminder
      });
      this.messageText = "";
      this.nickname = "";
      this.subCategory = "";
      this.subPrice = "";
      this.subFrequency = "";
      this.subStartDate = "";
      this.subReminder = "";
    },
    deleteMessage(message) {
      db
        .collection("subscriptions")
        .doc(message.id)
        .delete()
        .then(function() {
          //   db.collection("subscriptions").on("child_removed", snapshot => {
          //     const deletedMessage = this.message.id.find(
          //       message => message.id === snapshot.key
          //     );
          //     const index = this.messages.indexOf(deletedMessage);
          //     this.messages.splice(index, 1);
          //   });
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
      console.log(message.id);
      // re render the page.
      //   ref
      //     .delete() // sets the contents of the doc using the id
      //     .then(() => {
      //         console.log(ref.id);
      // fetch the doc again and show its data
      //   ref.get().then(doc => {
      //     console.log(doc.data()); // prints {id: "the unique id"}
      //   });
      // });
      // db.collection('subscriptions').doc.data().delete()
      //   var rmv = db.collection('subscriptions')
      //     console.log(rmv)

      //   db
      //     .collection("subscriptions")
      //     .doc()
      //     .delete()
      //     .then(function() {
      //       console.log("Document successfully deleted!");
      //     })
      //     .catch(function(error) {
      //       console.error("Error removing document: ", error);
      //     });
    },

    editMessage(message) {
      this.editingMessage = message;
      this.messageText = message.text;
      this.subCategory = message.category;
      this.subPrice = message.price;
      this.subFrequency = message.frequency;
      this.subStartDate = message.date;
      this.subReminder = message.reminder;
    },
    cancelEditing() {
      this.editingMessage = null;
      this.messageText = "";
      this.subCategory = "";
      this.subPrice = "";
      this.subFrequency = "";
      this.subStartDate = "";
      this.subReminder = "";
    },
    updateMessage() {
      // Careful with this one!!!!!!
      db
        .collection("subscriptions")
        .doc(this.editingMessage.id)
        .update({
          text: this.messageText,
          category: this.subCategory,
          price: this.subPrice,
          frequency: this.subFrequency,
          date: this.subStartDate,
          reminder: this.subReminder
        });
      this.cancelEditing();
    }
  }
};
</script>

<style>
.card-outer {
  background-color:#71ADB5;
}
.card {
  background-color: #176D81
}
</style>
