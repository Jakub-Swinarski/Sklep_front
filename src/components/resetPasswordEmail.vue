<script setup>
import {ref} from "vue";
import UserStore from "@/store/UserStore";

const email = ref();
const alertMessage = ref()
const message = ref()
const isVisible = ref(false)
const isLoading = ref(false)
const reset = () => {
  isLoading.value = true
  isVisible.value = false
  UserStore.ResetPasswordEmail(email.value)
      .then((res) => {
        message.value = "Email wysłano"
        isLoading.value = false
      }).catch((error) => {
    isVisible.value = true
    isLoading.value = false
    alertMessage.value = error.response.data.message;
  })
}
</script>

<template>
  <div
      class="container gap-6 flex flex-col justify-self-center self-center justify-center items-center  text-2xl py-8 min-h-screen">
    <h1>Zresetuj hasło</h1>
    <p class="text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700" v-if="isVisible">{{ alertMessage }}</p>
    <input class="min-w-full bg-gray-100 p-2 rounded-full text-center" v-model="email" type="email"
           placeholder="Wpisz adres Email" name="email" id="email" required>
    <button class="bg-blue-500 px-4 py-2 rounded-full" v-if="!isLoading" @click="reset">Zresetuj</button>
    <img v-if="isLoading" src="@/assets/loader.gif">
    <p>{{ message }}</p>
  </div>

</template>

<style scoped>

</style>