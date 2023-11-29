<script setup>
import {RouterView, useRouter} from 'vue-router'
import "@/assets/main.css"
import AuthStore from "@/store/AuthStore";
import authStore from "@/store/AuthStore";
import {ref} from "vue";
const router = useRouter()
const isLoading = ref(true)
AuthStore.fetchUser().then(()=>{
  isLoading.value = false
})
</script>

<template>
  <div class="grid">
    <div class=" h-16 flex flex-row justify-between items-center border-b-2 px-5 bg-gray-200" >
      <div class="flex flex-col items-center">
        <p class="text-2xl">Garniturex</p>
        <p class="text-xs">Sklep garniturowy</p>
      </div>
      <input class="px-4 py-2 rounded-full" type="text" placeholder="Wyszukaj produkt">
      <div v-if="isLoading === true">
        <img src="@/assets/loader.gif" alt="loading" width="50">
      </div>
      <div class="flex flex-row gap-6" v-else-if="AuthStore.userId.value !== undefined">
        <img src="@/assets/gear.webp" alt="Ustawienia" width="50" @click="router.push('/settings')">
        <img src="@/assets/logout.webp" alt="Wyloguj" width="50" @click="router.push('/logout')">
      </div>
      <div v-else class="flex-row flex gap-6">
        <button class="bg-blue-500 px-4 py-2 rounded-full text-xl " @click="router.push('/login')">Zaloguj</button>
        <button class="bg-blue-500 px-4 py-2 rounded-full text-xl " @click="router.push('/register')">Zarejestruj</button>
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<style scoped>

</style>
