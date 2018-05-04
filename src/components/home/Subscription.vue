<template>

   <div class="card">
   <div id="subscription" class="container">
     <h1 class="card-header">SubTracked</h1>
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

import db from '@/firebase/init'
import firebase from 'firebase'
const database = firebase.database()
const messagesRef = database.ref('messages')
export default {
  name: 'Subscription',
  data() {
    return {
      messages: [],
        messageText: '',
        nickname: '',
        subCategory: '',
        subPrice: '',
        subFrequency: '',
        subStartDate: '',
        subReminder: '',
        editingMessage: null
    }
  }, 
   methods: {
        storeMessage() {
          messagesRef.push({
            text: this.messageText,
            nickname: this.nickname,
            price: this.subPrice,
            category: this.subCategory,
            frequency: this.subFrequency,
            date: this.subStartDate,
            reminder: this.subReminder
          })
          this.messageText = ''
          this.nickname = ''
          this.subCategory =''
          this.subPrice = ''
          this.subFrequency = ''
          this.subStartDate = ''
          this.subReminder = ''
        },
        deleteMessage(message) {
          messagesRef.child(message.id).remove()
        },
        editMessage(message) {
          this.editingMessage = message
          this.messageText = message.text
          this.subCategory = message.category
          this.subPrice = message.price
          this.subFrequency = message.frequency
          this.subStartDate = message.date
          this.subReminder = message.reminder
        },
        cancelEditing() {
          this.editingMessage = null
          this.messageText = ''
          this.subCategory = ''
          this.subPrice = ''
          this.subFrequency = ''
          this.subStartDate = ''
          this.subReminder = ''
        },
        updateMessage() {
          // Careful with this one!!!!!!
          messagesRef.child(this.editingMessage.id).update({
            text: this.messageText,
            category: this.subCategory,
            price: this.subPrice,
            frequency: this.subFrequency,
            date: this.subStartDate,
            reminder: this.subReminder
          })
          this.cancelEditing()
        }
      },
      created() {
        // value = snapshot.val() | key = snapshot.key
        messagesRef.on('child_added', snapshot => {
          this.messages.push({ ...snapshot.val(),
            id: snapshot.key
          })
          if (snapshot.val().nickname !== this.nickname) {
            nativeToast({
              message: `New message by ${snapshot.val().nickname}`,
              type: 'success'
            })
          }
        })
        messagesRef.on('child_removed', snapshot => {
          const deletedMessage = this.messages.find(message => message.id === snapshot.key)
          const index = this.messages.indexOf(deletedMessage)
          this.messages.splice(index, 1)
          if (snapshot.val().nickname !== this.nickname) {
            nativeToast({
              message: `Message deleted by ${snapshot.val().nickname}`,
              type: 'warning'
            })
          }
        })
        messagesRef.on('child_changed', snapshot => {
          const updatedMessage = this.messages.find(message => message.id === snapshot.key)
          updatedMessage.text = snapshot.val().text
          updatedMessage.category = snapshot.val().category
          updatedMessage.price = snapshot.val().price
          updatedMessage.frequency = snapshot.val().frequency
          updatedMessage.date = snapshot.val().date
          updatedMessage.reminder = snapshot.val().reminder

          if (snapshot.val().nickname !== this.nickname) {
            nativeToast({
              message: `Message edited by ${snapshot.val().nickname}`,
              type: 'info'
            })
          }
        })
      }
    }
  </script>

<style>

</style>







