<script setup>
import AuthStore from "../../store/AuthStore";
import OrderStore from "@/store/OrderStore";
import {ref} from "vue";
import {useRouter} from "vue-router";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;
const orders = ref()
const alertMessage = ref()
const isLoading = ref(true)
const notLoaded = ref(false)
const router = useRouter()
const isSomething = ref(false)

OrderStore.GetUserOrders(AuthStore.userId.value).then((res) => {
  orders.value = res
  isLoading.value = false
}).catch((e) => {
  isLoading.value = false
  notLoaded.value = true
  alertMessage.value = e.response.data.message
})
const toOrder = (id) =>{
  router.push('/o/'+btoa(id))
}
const getDate = (timestamp) => {
  let temp = new Date(timestamp)
  return temp.getDate() + '.' + temp.getMonth() + '.' + temp.getFullYear()
}
</script>

<template>
  <div>
    <div class="flex justify-self-center justify-center items-center self-center max-h-screen" v-if="isLoading">
      <img alt="loading..." src="../../assets/loader.gif">
    </div>
  </div>
  <div v-if="notLoaded === true">
    <p class="m-6 text-center text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
      {{ alertMessage }}</p>
  </div>
  <div v-if="!notLoaded && !isLoading">
    <div class=" mt-6 flex-col" v-for="order of orders">
      <p class="hidden">{{isSomething = true}}</p>
      <div class=" rounded-xl w-full border-2 border-gray-200 flex flex-row" @click="toOrder(order.id)">
        <div class="bg-gray-200 p-6 rounded-l-xl w-1/3">
          <p>Zamówienie numer: {{order.id}}</p>
          <p>{{ getDate(order.created_at) }}</p>
          <p>Cena:</p>
        </div>
        <div class="flex flex-row w-full p-2 items-center">
          <div v-if="order.productCount <= 1" v-for="product of order.products">
            <img :src="`${baseApiUrl}/storage/${product}`" >
            <p>{{product}}</p>
          </div>
          <div class="pr-6" v-else v-for="product of order.products">
            <img :src="`${baseApiUrl}/storage/${product}`" alt="img" width="100" height="100">
            <p>{{product.image }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center text-3xl" v-if="!isSomething && !notLoaded && !isLoading">
    <p>Nie ma żadnych opinij</p>
  </div>

</template>

<style scoped>

</style>