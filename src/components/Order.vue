<script setup>
import {useRoute, useRouter} from "vue-router";
import OrderStore from "@/store/OrderStore";
import {ref} from "vue";

const route = useRoute()
const router = useRouter()
const orderId = atob(route.params.id)
const order = ref()
const date = ref()
const alertMessage = ref()
const cartPrice = ref(0)
const product = ref()
const price = ref(0)
const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL
OrderStore.GetOrder(orderId).then((res)=>{
  order.value = res
  date.value = new Date(order.value.created_at)
  setCartPrice()
  setWholePrice()
}).catch((e)=>{
  alertMessage.value = e
})
const setCartPrice = () => {
  for (product.value of order.value.products) {
    cartPrice.value += parseFloat(product.value.price) * parseFloat(product.value.pivot.how_many)
  }
}
const setWholePrice = () => {
  price.value = cartPrice.value + order.value.type_of_delivery.price
  if (order.pay_type === 'cash') price.value += 5
}
const toProduct = (id) =>{
  router.push('/p/'+btoa(id))
}
</script>

<template>
  <div class="container text-3xl mx-auto gap-4 max-w-5xl flex flex-col mt-4">
    <div>
      <p>Zamówienie numer: {{ order.id }}</p>
      <p class="text-xl text-gray-500">Z dnia {{ date.toDateString() }}</p>
    </div>
    <p>Dostawa</p>
    <div class="flex">
      <div class=" text-xl rounded-xl border-2 p-2 pr-8">
        <p>{{ order.type_of_delivery.name }}</p>
        <p class="text-sm text-gray-500">Dostawa standardowa</p>
      </div>
    </div>
    <p>Adres dostawy</p>
    <div class="flex">
      <div class="text-lg rounded-xl border-2 p-2 pr-8 flex flex-col">
        <p class=" font-bold py-4">{{ order.address.name }} {{ order.address.surname }}</p>
        <p>{{ order.address.address }}</p>
        <p>{{ order.address.number }}</p>
        <p>{{ order.address.zipcode }}, {{ order.address.city }}</p>
        <p>{{ order.user.email }}</p>
      </div>
    </div>
    <p>Płatność</p>
    <div class="flex">
      <div class="text-xl border-2 p-2 rounded-xl pr-8">
        {{ order.pay_type }}
      </div>
    </div>
    <p class="border-b-2">Zamówienie</p>
    <div class=" border-b-2 flex flex-row gap-4 justify-between items-center w-full" v-for="product of order.products">
      <div class="flex flex-row items-center gap-4" @click="toProduct(product.id)">
        <img :src="`${baseApiUrl}/storage/${product.image}`" height="100" width="100" alt="zdięcie">
        <p>{{ product.name }}</p>
      </div>
      <div class="flex flex-row items-center gap-4">
        <p class="text-xl text-gray-500">{{product.pivot.how_many}} szt.</p>
        <p>{{ product.price }} zł</p>
      </div>
    </div>
    <div class="flex gap-2 flex-col self-end max-w-sm w-full text-2xl">
      <div class="flex flex-row justify-between">
        <p>Wartość koszyka:</p>
        <p>{{ cartPrice }} zł</p>
      </div>
      <div class="flex flex-row justify-between">
        <p>Dostawa:</p>
        <p>{{ order.type_of_delivery.price }} zł</p>
      </div>
      <div class="flex flex-row justify-between pb-2 border-b-2">
        <p>Płatność:</p>
        <p v-if="order.pay_type === 'cash'">5 zł</p>
        <p v-else>0zł</p>
      </div>
      <div class="flex flex-row justify-between">
        <p>Razem:</p>
        <p>{{price}} zł</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>