<script setup>
import {ref} from "vue";
import AuthStore from "@/store/AuthStore";
import {useRouter} from "vue-router";

const username = ref();
const password = ref();
const router = useRouter();
const alertMessage = ref();
const login = () => {
  AuthStore.login(username.value, password.value)
      .then(() => {
        router.push('/dashboard');
      }).catch((error) => {
    alertMessage.value = error.response.data.message;
  })
}
</script>

<template>
  <div class="container">
    <p>{{ alertMessage }}</p>
    <label class="bold" for="username">Nazwa użytkownika</label>
    <input v-model="username" type="text" placeholder="Wpisz nazwę użytkownika" name="username" required>
    <label class="bold" for="psw">Hasło</label>
    <input v-model="password" type="password" placeholder="Wpisz hasło" name="psw" required>
    <button @click="login" type="submit">Zaloguj</button>
  </div>

  <div class="container2">
    <div>
      <button type="button" class="cancelBtn">Anuluj</button>
    </div>
    <span class="psw">Zapomniałeś <a @click="router.push('/reset/email')">hasła?</a></span>
  </div>
</template>

<style scoped>
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
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

button:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}

.container2 {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.cancelBtn {
  background-color: red;
  text-align: left;
  width: auto;
}

</style>