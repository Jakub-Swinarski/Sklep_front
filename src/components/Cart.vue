<script setup>
import ProductStore from "@/store/ProductStore";
import {ref} from "vue";
import router from "@/router";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;
const rawProductData = JSON.parse(localStorage.getItem('cart'))
const products = ref([])
const isLoading = ref(true)
const finalPrice = ref(0)

rawProductData.forEach((val) => {
  ProductStore.GetProduct(val.id).then((res) => {
    res.quantity = val.numberOfItems
    finalPrice.value += res.quantity * res.price
    products.value.push(res)
  })
})
isLoading.value = false
</script>

<template>
  <div v-if="isLoading" class="container flex justify-center">
    <img src="@/assets/loader.gif" alt="Loading...">
  </div>
  <div class="flex flex-row justify-around gap-10">
    <div class="pt-20 flex flex-col " v-if="!isLoading">
      <div class="flex text-3xl justify-center" v-for="product of products">
        <div>
          <img v-if="product.image.image" :src="`${baseApiUrl}/storage/${product.image.image}`" width="200">
        </div>
        <div class="flex flex-col gap-4">
          <p>{{ product.name }}</p>
          <p>{{ product.price }} zł</p>
          <p>Ile:{{ product.quantity }}</p>
        </div>
      </div>
    </div>
    <div class="pt-40 text-3xl max-w-md gap-6 flex flex-col">
      <p>Cena za wszystko: {{finalPrice}} zł</p>
      <button class="bg-blue-500 px-4 py-2 rounded-full" @click="router.push('/order')">Kup</button>
    </div>
  </div>

</template>

<style scoped>

</style>