<script setup>
import {ref} from "vue";
import UserStore from "@/store/UserStore";
import AuthStore from "@/store/AuthStore";

const username = ref()
const email = ref()
const password = ref()
const r_password = ref()
const alertMessage = ref()
const isVisible = ref(false)
const isLoading = ref(false)
const createUser = () => {
  isVisible.value = false
  if (username.value === undefined) {
    alertMessage.value = 'Nie podałeś nazwy administratora'
    isVisible.value = true
  } else if (email.value === undefined) {
    alertMessage.value = 'Nie podałeś emaila'
    isVisible.value = true
  } else if (password.value === undefined) {
    alertMessage.value = 'Nie podałeś hasła'
    isVisible.value = true
  } else if (r_password.value !== password.value) {
    alertMessage.value = 'Hasła nie są takie same'
    isVisible.value = true
  } else {
    isLoading.value = true
    AuthStore.register(email.value, username.value, password.value, true).then(() => {
      isLoading.value = false
    }).catch((e) => {
      alertMessage.value = e.response.data.message
      isLoading.value = false
      isVisible.value = true
    })
  }
}
</script>

<template>
  <div class="container flex flex-col justify-center items-center text-2xl max-h-screen gap-6 h-full">
    <p class="text-5xl text-center text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700"
       v-if="isVisible">
      {{ alertMessage }}
    </p>
    <div class="justify-center items-center flex flex-col gap-4">
      <p class="text-4xl font-bold">Tworzysz nowego administratora</p>
      <p class="text-xl text-gray-400">Administrator musi potwierdzić email</p>
    </div>
    <p>Nazwa administratora</p>
    <input class="min-w-fit bg-gray-100 p-2 rounded-full text-center" v-model="username" type="text">
    <p>Email</p>
    <input class="min-w-fit bg-gray-100 p-2 rounded-full text-center" v-model="email" type="email">
    <p>Hasło</p>
    <input class="min-w-fit bg-gray-100 p-2 rounded-full text-center" v-model="password" type="password">
    <p>Powtórz hasło</p>
    <input class="min-w-fit bg-gray-100 p-2 rounded-full text-center" v-model="r_password" type="password">
    <button v-if="!isLoading" class="bg-blue-500 px-4 py-2 rounded-full" @click="createUser">Utwórz</button>
    <img v-if="isLoading" src="@/assets/loader.gif" alt="loading..." height="100" width="100">
  </div>
</template>

<style scoped>

</style>