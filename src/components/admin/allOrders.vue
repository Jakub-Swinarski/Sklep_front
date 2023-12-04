<script setup>
import {ref} from "vue";
import OrderStore from "@/store/OrderStore";
import { useRouter} from "vue-router";

const isLoading = ref(true)
const notLoaded = ref(false)
const orders = ref()
const alertMessage = ref()
const router = useRouter()

OrderStore.GetOrders().then((res)=>{
  orders.value = res
  isLoading.value = false
}).catch(()=>{
  isLoading.value = false
  notLoaded.value = true
  alertMessage.value = 'Nie udało się połączyć z serwerem'
})
const click = (id) => {
  router.push(btoa(id))
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
  <div class="grid grid-cols-2  gap-2" v-if="!notLoaded && !isLoading" >
  <div class="bg-gray-100 rounded-3xl p-4"  v-for="order of orders">
    <p>Id: {{order.id}}</p>
    <p>Sposób dostawy: {{order.type_of_delivery.name}}</p>
    <p>Sposób zapłaty: {{order.pay_type}}</p>
    <p>Numer faktury: {{order.invoice_number}}</p>
    <p>E-mail: {{order.user.email}}</p>
    <p>Adres zamieszkania: {{order.address.address}}</p>
    <p>kod pocztowy i miasto: {{order.address.zipcode}} {{order.address.city}}</p>
    <p>Numer tel: +48 {{order.address.number}}</p>
    <p>Imie i nazwisko: {{order.address.name}} {{order.address.surname}}</p>
    <div class="flex flex-row gap-4">
      <button class="bg-blue-500 px-4 py-2 rounded-full" @click="click(order.id)">Więcej i Edycja</button>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>