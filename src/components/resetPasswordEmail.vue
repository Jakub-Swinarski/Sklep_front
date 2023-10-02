<script setup>
import {ref} from "vue";
import UserStore from "@/store/UserStore";

const email = ref();
const alertMessage = ref()
const message = ref()
const reset = () => {
  UserStore.ResetPasswordEmail(email.value)
      .then((res) => {
        message.value = "Email wysłano"
      }).catch((error) => {
        alertMessage.value = error.response.data.message;
  })
}
</script>

<template>
  <h1>Zresetuj hasło</h1>
  <p>{{ alertMessage }}</p>
  <input v-model="email" type="email" placeholder="Wpisz adres Email" name="email" id="email" required>
  <button @click="reset" type="submit" class="button">Wyślij</button>
  <p>{{ message }}</p>
</template>

<style scoped>
* {
  box-sizing: border-box
}



h1 {
  text-align: center;
  color: #3c0aee;
  font-size: 70px;
}

input {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

button {
  background-color: #3c0aee;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;

}
</style>