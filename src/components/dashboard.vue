<script setup>
import AuthStore from '@/store/AuthStore'
import {ref} from "vue";
import UserStore from "@/store/UserStore";
const old_password = ref();
const password = ref()
const r_password = ref()
const alertMessage = ref()
const changePassword =() =>{
  if (password.value === r_password.value && password.value !== undefined) {
    UserStore.ChangePassword(old_password, password).catch((error)=>{
      alertMessage.value = error.response.data.message;
    })
  }
  else {
    alertMessage.value = "Hasła się nie zgadzają"
  }
}
</script>

<template>
  <h1>Witaj, {{ AuthStore.username.value}}</h1>
  <p class="alert">{{alertMessage}}</p>
  <input v-model="old_password" type="text" placeholder="Wpisz stare hasło" name="" id="password" required>
  <input v-model="password" type="text" placeholder="Wpisz nowe hasło" name="" id="newPassword" required>
  <input v-model="r_password" type="text" placeholder="Powtórz nowe hasło" name="" id="newPassword" required>
  <button @click="changePassword" type="submit" class="button">Zatwierdź</button>
</template>

<style scoped>
* {box-sizing: border-box}
h1{
  text-align: left;
  color: #3c0aee;
  font-size: 70px;
}
input{
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
button{
  background-color: #3c0aee;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;

}
p{
  color: red;
  font-size: 30px;
}
</style>