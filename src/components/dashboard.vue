<script setup>
import AuthStore from '@/store/AuthStore'
import {ref} from "vue";
import UserStore from "@/store/UserStore";
import ResetConfirmation from "@/components/ResetConfirmation.vue";

AuthStore.fetchUser();
const old_password = ref();
const password = ref()
const r_password = ref()
const alertMessage = ref()
const password_rested = ref(0)
const password_panel = ref(false)
const email_panel = ref(false)
const user_panel = ref(false)
</script>

<template>
  <div class="wrapper">
    <h1>Witaj, {{ AuthStore.username.value }}</h1>
    <p class="alert">{{ alertMessage }}</p>
    <p>Nazwa użytkownika</p>
    <div class="inpbtn">
      <input class="inp" type="text" placeholder="nazwa" name="" id="usernamename" required>
      <button @click="user_panel = true" class="btn">Zmień</button>

    </div>
    <div class="main" v-if="user_panel === true">
      <input v-model="username" type="text" placeholder="nowa nazwa" name="" id="username" required>
      <button @click="user_panel = false" type="submit" class="button">Zatwierdź</button>
      <button @click="user_panel = false" class="btn">Anuluj</button>

    </div>
    <p>Adres email</p>
    <div class="inpbtn">
      <input class="inp" type="email" placeholder="mail" name="" id="email" required>
      <button @click="email_panel = true" class="btn">Zmień</button>
    </div>
    <div class="main" v-if="email_panel === true">
      <input v-model="old_email" type="email" placeholder="stary mail" name="" id="password" required>
      <input v-model="new_mail" type="email" placeholder="Wpisz nowy email" name="" id="newPassword" required>
      <input v-model="password" type="password" placeholder="Wpisz hasło" name="" id="Password" required>
      <button @click="email_panel = false" type="submit" class="button">Zatwierdź</button>
      <button @click="email_panel = false" class="btn">Anuluj</button>

    </div>
    <ResetConfirmation v-if="password_rested === 1"></ResetConfirmation>
    <p>Hasło</p>
    <div class="inpbtn">
      <input value="12345678" class="inp" type="password" placeholder="Wpisz stare hasło" name="" id="password"
             required>
      <button @click="password_panel = true" class="btn">Zmień</button>
    </div>
    <div class="main" v-if="password_panel === true">
      <input v-model="old_password" type="password" placeholder="Wpisz stare hasło" name="" id="password" required>
      <input v-model="password" type="password" placeholder="Wpisz nowe hasło" name="" id="newPassword" required>
      <input v-model="r_password" type="password" placeholder="Powtórz nowe hasło" name="" id="newPassword" required>
      <button @click="password_panel = false" type="submit" class="button">Zatwierdź</button>
      <button @click="password_panel = false" class="btn">Anuluj</button>

    </div>
  </div>
</template>

<style scoped>
* {
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper{
  gap: 15px;
  display: flex;
  flex-direction: column;
}
h1 {
  color: black;
  font-size: 70px;
}

input {
  font-size: x-large;
  margin: 5px;
  background: #f1f1f1;
  text-align: center;

}

.inp {
  border-radius: 15px;
}

.btn {
  background-color: red;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 70px;
  font-size: medium;
  font-weight: bold;
  border-radius: 15px;
}

p {
  color: black;
  font-size: 30px;
  }

.inpbtn {
  display: flex;
  flex-direction: row;
  text-align: center;;

}

.main {
  flex-direction: column;
  border-radius: 15px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: wheat;
  padding: 20px;
}

.button {
  background-color: red;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100px;
  font-size: medium;
  font-weight: bold;
  border-radius: 15px;
}

input {
  font-size: x-large;
  margin: 5px;
  background: #f1f1f1;
  text-align: center;
  border-radius: 15px;
}

</style>