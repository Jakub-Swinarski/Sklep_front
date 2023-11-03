<script setup>
import {ref} from "vue";
import AuthStore from "@/store/AuthStore";
import {useRouter} from "vue-router";

const username = ref();
const password = ref();
const router = useRouter();
const alertMessage = ref();
const isVisible = ref(false)
const isLoading = ref(false)
const login = () => {
  isLoading.value = true
  AuthStore.login(username.value, password.value)
      .then(() => {
        router.push('/dashboard');
      }).catch((error) => {
    isLoading.value = false
    alertMessage.value = error.response.data.message;
    isVisible.value = true
  })
}
</script>

<template>
  <div
      class="container gap-6 flex flex-col justify-self-center self-center justify-center items-center  text-2xl py-8 min-h-screen">
    <p class="text-3xl">LOGOWANIE</p>
    <p v-if="isVisible" class="text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
      {{ alertMessage }}</p>
    <p>Nazwa użytkownika</p>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="username" type="text"
           placeholder="Wpisz nazwę użytkownika" name="username" required>
    <p>Hasło</p>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="password" type="password"
           placeholder="Wpisz hasło"
           name="psw" required>
    <button class="bg-blue-500 px-4 py-2 rounded-full" v-if="!isLoading" @click="login">Zaloguj</button>
    <img v-if="isLoading" src="../assets/loader.gif">
    <p>Zapomniałeś <a class="text-blue-500" @click="router.push('/reset/email')">hasła?</a></p>
    <p>Nie masz konta. <a class="text-blue-500" @click="router.push('/register')">Zarejestruj się</a></p>
    <div
        class="container gap-6 flex flex-col justify-self-center self-center justify-center items-center  text-2xl py-8 ">
      <p class="text-3xl">LOGOWANIE</p>
      <p v-if="isVisible" class="text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
        {{ alertMessage }}</p>
      <p>Nazwa użytkownika</p>
      <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="username" type="text"
             placeholder="Wpisz nazwę użytkownika" name="username" required>
      <p>Hasło</p>
      <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="password" type="password"
             placeholder="Wpisz hasło"
             name="psw" required>
      <button class="bg-blue-500 px-4 py-2 rounded-full" v-if="!isLoading" @click="login">Zaloguj</button>
      <img v-if="isLoading" src="../assets/loader.gif">
      <p>Zapomniałeś <a class="text-blue-500" @click="router.push('/reset/email')">hasła?</a></p>
      <p>Nie masz konta. <a class="text-blue-500" @click="router.push('/register')">Zarejestruj się</a></p>
    </div>
  </div>


</template>

<style scoped>

</style>