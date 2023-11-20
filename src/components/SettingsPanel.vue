<script setup>
import {ref} from "vue";
import AllUsers from "@/components/admin/allUsers.vue";
import AllOrders from "@/components/admin/allOrders.vue";
import AllProducts from "@/components/admin/allProducts.vue";
import AuthStore from "../store/AuthStore";
import CreateNewSide from "@/components/admin/CreateNewSide.vue";
import AccountSettings from "@/components/user/AccountSettings.vue";
import YourOrders from "@/components/user/YourOrders.vue";
import YourRatings from "@/components/user/YourRatings.vue";
import YourDeliveryData from "@/components/user/YourDeliveryData.vue";
import {useRoute, useRouter} from "vue-router";
const isLoading = ref(true)
const alertMessage = ref()
const notLoaded = ref()
const route = useRoute()
const router = useRouter()
const whichPanel = ref(0)
AuthStore.fetchUser().then((res) => {
  isLoading.value = false
}).catch((error) => {
  alertMessage.value = "Problem połączenia z serwerem strona niedostępna"
  notLoaded.value = true
  isLoading.value = false
});
</script>

<template>
  <div>
    <div class="flex justify-self-center justify-center items-center self-center max-h-screen" v-if="isLoading">
      <img alt="loading..." src="@/assets/loader.gif">
    </div>
  </div>
  <div v-if="notLoaded === true">
    <p class="m-6 text-center text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
      {{ alertMessage }}</p>
  </div>
  <div class="flex container gap-6 max-w-5xl w-full flex-row justify-self-center justify-items-start" v-if="!isLoading && !notLoaded">
    <div class="pt-20 flex text-2xl flex-col gap-12 w-full max-w-xs">
      <p class="text-xl">Cześć, {{ AuthStore.username.value }}</p>
      <div class="flex flex-col">
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/account')">
          Ustawienia konta
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/yoursOrders')">
          Twoje zamówienia
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/yoursRatings')">
          Twoje opinie
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/dataToOrders')">
          Dane do zamówień
        </button>

      </div>


      <div class="flex flex-col" v-if="AuthStore.isAdmin.value">
        <p class="text-3xl">Ustawienia administratora</p>
        <button class="py-3 text-start w-full hover:bg-gray-100" @click="router.push('/settings/allUsers')">
          Wszyscy użytkownicy
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/allOrders')">
          Wszystkie zamówienia
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/allProducts')">
          Wszystkie produkty
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/newProduct')">
          Dodaj nowy produkt
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/newSide')">
          Stwórz nową podstronę
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/createNewUser')">
          Stwórz nowego użytkownika
        </button>
        <button class="py-3 text-start hover:bg-gray-100" @click="router.push('/settings/createNewAdmin')">
          Stwórz nowego administratora
        </button>

      </div>

    </div>
    <div class="w-full max-w-3xl">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>