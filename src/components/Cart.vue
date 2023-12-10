<script setup>
import ProductStore from "@/store/ProductStore";
import {ref, watch} from "vue";
import router from "@/router";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;
const rawProductData = ref(JSON.parse(localStorage.getItem('cart')))
const products = ref([])
const isLoading = ref(true)
const finalPrice = ref(0)
const isExists = ref(true)
watch(localStorage.getItem('cart'),()=>{
  rawProductData.value = JSON.parse(localStorage.getItem('cart'))
  if (rawProductData.value !== null){
    rawProductData.forEach((val) => {
      ProductStore.GetProduct(val.id).then((res) => {
        res.quantity = val.numberOfItems
        finalPrice.value += res.quantity * res.price
        products.value.push(res)
      })
    })
  }else {
    isExists.value = false
  }
})
if (rawProductData.value !== null){
  rawProductData.forEach((val) => {
    ProductStore.GetProduct(val.id).then((res) => {
      res.quantity = val.numberOfItems
      finalPrice.value += res.quantity * res.price
      products.value.push(res)
    })
  })
}else {
  isExists.value = false
}

isLoading.value = false
const deleteCart = ()=>{
  localStorage.removeItem('cart')
}
</script>

<template>
  <div v-if="isLoading" class="container flex justify-center">
    <img src="@/assets/loader.gif" alt="Loading...">
  </div>
  <div class="flex flex-row justify-around gap-10">
    <div class="pt-20 flex flex-col " v-if="!isLoading">
      <div v-if="isExists" class="flex text-3xl justify-center" v-for="product of products">
        <div>
          <img v-if="product.image" :src="`${baseApiUrl}/storage/${product.image.image}`" width="200">
          <img v-else src="@/assets/no_image.webp" alt="no image" width="200">
        </div>
        <div class="flex flex-col gap-4">
          <p>{{ product.name }}</p>
          <p>{{ product.price }} zł</p>
          <p>Ile:{{ product.quantity }}</p>
        </div>
      </div>
      <div class="text-3xl text-center" v-if="!isExists">Brak produktów w koszyku</div>
    </div>
    <div v-if="isExists" class="pt-40 text-3xl max-w-md gap-6 flex flex-col">
      <p>Cena za wszystko: {{finalPrice}} zł</p>
      <button class="bg-blue-500 px-4 py-2 rounded-full" @click="router.push('/order')">Kup</button>
      <button class="bg-red-500 px-4 py-2 rounded-full" @click="deleteCart">Usuń wszystkie produkty</button>
    </div>
  </div>

</template>

<style scoped>

</style>