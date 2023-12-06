<script setup>
import {RouterView, useRouter} from 'vue-router'
import "@/assets/main.css"
import AuthStore from "@/store/AuthStore";
import {ref} from "vue";
import SmallCart from "@/components/SmallCart.vue";


const router = useRouter()
const isLoading = ref(true)
const logged = ref(false)
const smallCart = ref(false)
AuthStore.fetchUser().then(() => {
  isLoading.value = false
  logged.value = true
}).catch(() => {
  isLoading.value = false
  logged.value = false
})

</script>

<template>
  <div class="grid">
    <div class=" h-16 flex flex-row justify-between items-center border-b-2 px-5 bg-gray-200">
      <div class="flex flex-col items-center" @click="router.push('/')">
        <p class="text-2xl">Garniturex</p>
        <p class="text-xs">Sklep z garniturami</p>
      </div>
      <input class="px-4 py-2 rounded-full" type="text" placeholder="Wyszukaj produkt">
      <div v-if="isLoading">
        <img src="@/assets/loader.gif" alt="loading" width="50">
      </div>
      <div class="flex flex-row gap-6" v-else-if="!isLoading && logged">
        <div @mouseover="smallCart = true" @mouseout="smallCart = false" @click="router.push('/cart')">
          <img src="@/assets/cart.webp" alt="Koszyk" width="50">
        </div>
        <img src="@/assets/gear.webp" alt="Ustawienia" width="50" @click="router.push('/settings')">
        <img src="@/assets/logout.webp" alt="Wyloguj" width="50" @click="router.push('/logout')">
      </div>
      <div v-else class="flex-row flex gap-6">
        <div @mouseover="smallCart = true" @mouseout="smallCart = false" @click="router.push('/cart')">
          <img src="@/assets/cart.webp" alt="Koszyk" width="50">
        </div>
        <button class="bg-blue-500 px-4 py-2 rounded-full text-xl " @click="router.push('/login')">Zaloguj</button>
        <button class="bg-blue-500 px-4 py-2 rounded-full text-xl " @click="router.push('/register')">Zarejestruj
        </button>
      </div>
    </div>
    <router-view></router-view>
    <div v-if="smallCart" class="absolute top-16 right-40">
      <small-cart></small-cart>
    </div>
  </div>

</template>

<style scoped>

</style>
