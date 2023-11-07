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
const isVisible = ref(false)
const isLoading = ref(false)

const buttonClick = () => {
  isVisible.value = false
  register()
}

const register = () => {
  if (password.value === r_password.value && password.value !== undefined) {
    isLoading.value = true
    AuthStore.register(email.value, username.value, password.value, is_admin)
        .then(() => {
          isRegistered.value = true
        })
        .catch((error) => {
          isLoading.value = false
          alertMessage.value = error.response.data.message;
          isVisible.value = true
        })
  } else {
    alertMessage.value = "Hasła się nie zgadzają lub pole hasło jest puste"
    isVisible.value = true
  }


}
</script>

<template>
  <div
      class="container gap-6 flex flex-col justify-self-center self-center justify-center items-center  text-2xl py-8 min-h-screen">
    <p class="text-3xl">Zarejestruj się</p>
    <p class="text-xl">Wypełnij formularz w celu utworzenia konta.</p>
    <p v-if="isVisible" class="text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
      {{ alertMessage }}</p>
    <label for="username">Nazwa użytkownika</label>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="username" type="text" name="username"
           id="username" placeholder="Wpisz nazwę użytkownika">
    <label for="email">Email</label>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="email" type="email"
           placeholder="Wpisz adres Email" name="email" id="email" required>

    <label for="psw">Hasło</label>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="password" type="password"
           placeholder="Wpisz hasło" name="psw" id="psw" required>

    <label for="psw-repeat">Powtórz hasło</label>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="r_password" type="password"
           placeholder="Wpisz hasło" name="psw-repeat" id="psw-repeat" required>

    <p>Tworząc konto zgadasz się na nasz regulamin dostępny tu: <a class="text-blue-500" @click="router.push('/rules')">Zasady
      tworzenia
      konta</a>.</p>
    <button class="bg-blue-500 px-4 py-2 rounded-full" v-if="!isLoading" @click="buttonClick">Zarejestruj się!</button>
    <img v-if="isLoading" src="../../assets/loader.gif">
    <h2 v-if="isRegistered === true">Potwierdź rejestracje. Potwierdzenie znajduje się na mailu</h2>
    <p>Masz już konto? <a class="text-blue-500" @click="router.push('/login')">Zaloguj się</a>.</p>
  </div>
</template>

<style scoped>

</style>