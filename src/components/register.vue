<script setup>
import {ref} from "vue";
import AuthStore from "@/store/AuthStore";
import {useRouter} from "vue-router";
import router from "@/router";

const username = ref();
const email = ref();
const password = ref();
const r_password = ref();
const is_admin = false;
const alertMessage = ref();
const isRegistered = ref();
const register = () => {
  if (password.value === r_password.value && password.value !== undefined) {
    AuthStore.register(email.value, username.value, password.value, is_admin)
        .then(() => {
          isRegistered.value = true
        })
        .catch((error) => {
          alertMessage.value = error.response.data.message;
        })
  } else {
    alertMessage.value = "Hasła się nie zgadzają lub pole hasło jest puste"
  }

}
</script>

<template>
  <div class="container">
    <h1>Zarejestruj się</h1>
    <p>Wypełnij formularz w celu utworzenia konta.</p>
    <hr>
    <p>{{ alertMessage }}</p>
    <label class="bold" for="username">Nazwa użytkownika</label>
    <input v-model="username" type="text" name="username" id="username" placeholder="Wpisz nazwę użytkownika">
    <label class="bold" for="email">Email</label>
    <input v-model="email" type="email" placeholder="Wpisz adres Email" name="email" id="email" required>

    <label class="bold" for="psw">Hasło</label>
    <input v-model="password" type="password" placeholder="Wpisz hasło" name="psw" id="psw" required>

    <label class="bold" for="psw-repeat">Powtórz hasło</label>
    <input v-model="r_password" type="password" placeholder="Wpisz hasło" name="psw-repeat" id="psw-repeat" required>
    <hr>

    <p>Tworząc konto zgadasz się na nasz regulamin dostępny tu: <a href="rules.html">Zasady tworzenia konta</a>.</p>
    <button @click="register" type="submit" class="registerBtn">Zarejestruj się!</button>
    <h2 v-if="isRegistered === true">Potwierdź rejestracje. Potwierdzenie znajduje się na mailu</h2>
  </div>

  <div class="container signIn">
    <p>Masz już konto? <a @click="router.push('/login')">Zaloguj się</a>.</p>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.registerBtn {
  background-color: #3c0aee;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerBtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}

p {
  font-size: 25px;
}

h1 {

}
</style>