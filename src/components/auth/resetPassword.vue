<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import UserStore from "@/store/UserStore";

const route = useRoute();
const router = useRouter();
const email = atob(route.params.email);
const token = route.params.token;
const password = ref()
const r_password = ref()
const alertMessage = ref()
const isVisible = ref(false)
const isLoading = ref(false)
const editPassword = () => {
  if (password.value === r_password.value && password.value !== undefined) {
    isLoading.value = true
    isVisible.value = false
    UserStore.ResetPasswordEmailSendNewPassword(email, token, password.value)
        .then(() => {
          router.push('/login')
        }).catch((error) => {
      isVisible.value = true
      isLoading.value = false
      alertMessage.value = error.response.data.message;
    })
  } else {
    isVisible.value = true
    alertMessage.value = "Hasła się nie zgadzają"
  }
}

</script>

<template>
  <div
      class="container gap-6 flex flex-col justify-self-center self-center justify-center items-center  text-2xl py-8 min-h-screen">
    <p class="text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700" v-if="isVisible">
      {{ alertMessage }}</p>
    <p>Nowe hasło</p>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="password" type="password"
           name="password" id="password">
    <p>Powtórz nowe hasło</p>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="r_password" type="password"
           name="r_password" id="r_password">
    <button class="bg-blue-500 px-4 py-2 rounded-full" v-if="!isLoading" @click="editPassword">Zapisz</button>
    <img v-if="isLoading" src="../../assets/loader.gif">
  </div>

</template>

<style scoped>
</style>