<script setup>
import {ref} from "vue";
import ProductStore from "@/store/ProductStore";
import {useRoute} from "vue-router";

const route = useRoute()
const productId = atob(route.params.id)
const isLoading = ref(true)
const notLoaded = ref(false)
const alertMessage = ref()
const product = ref()
const witchImage = ref(0)
const howMuch = ref(1)
const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL
ProductStore.GetProduct(productId).then((res) => {
  product.value = res
  isLoading.value = false
}).catch((e) => {
  notLoaded.value = true
  isLoading.value = false
  alertMessage.value = e.params.message
})
const getSupply = (supply) => {
  if (supply >= 1000) {
    return 'Dużo'
  } else if (supply >= 100) {
    return 'Średnio'
  } else if (supply >= 10) {
    return 'Mało'
  } else {
    return 'Ostatnie sztuki'
  }
}
const addToCart = () => {
  const products = ref([])

  const temp = localStorage.getItem('cart')

  products.value = JSON.parse(localStorage.getItem('cart'))
  if (!temp) {
    products.value = []
  }
  console.log(product.value)
  products.value.push({'id':product.value.id,'numberOfItems':howMuch.value})
  console.log(products.value)
  localStorage.setItem('cart', JSON.stringify(products.value))
}
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
  <div class="container justify-items-center justify-self-center" v-if="!notLoaded && !isLoading">
    <div class="flex flex-col gap-4 justify-self-center w-full max-w-5xl">
      <div class="grid grid-cols-2 ">
        <div class="flex flex-col py-2 items-center w-full border-r-2">
          <div v-for="(bigImg, index) of product.images" :key="index">
            <img v-if="witchImage === index" :src="`${baseApiUrl}/storage/${bigImg.image}`" alt="duży obrazek"
                 width="300"
                 height="300">
          </div>
          <div class="grid py-4 grid-cols-4 gap-4">
            <div v-for="(smallImg, index) of product.images" :key="index">
              <img class="rounded-xl hover:border-black border  border-gray-300" @click="witchImage = index"
                   :src="`${baseApiUrl}/storage/${smallImg.image}`" alt="mały" width="60" height="60">
            </div>
          </div>
        </div>
        <div class="text-xl flex flex-col gap-2 pl-3">
          <p class="text-3xl font-bold">{{ product.name }}</p>
          <div class="flex items-center flex-row">
            <img class="max-h-6" v-if="product.avgRating <= 0.5" src="@/assets/stars%200_5.png" alt="0/5">
            <img class="max-h-6" v-if="0.5 < product.avgRating && product.avgRating <= 1.5"
                 src="@/assets/stars%201_5.png"
                 alt="1/5">
            <img class="max-h-6" v-if="1.5 < product.avgRating && product.avgRating <= 2.5"
                 src="@/assets/stars%202_5.png"
                 alt="2/5">
            <img class="max-h-6" v-if="2.5 < product.avgRating && product.avgRating <= 3.5"
                 src="@/assets/stars%203_5.png"
                 alt="3/5">
            <img class="max-h-6" v-if="3.5 < product.avgRating && product.avgRating <= 5.5"
                 src="@/assets/stars%204_5.png"
                 alt="4/5">
            <img class="max-h-6" v-if="4.5 < product.avgRating" src="@/assets/stars%205_5.png" alt="5/5">
            <p class=" flex pl-2 text-xl max-h-8 text-gray-500 ">({{ product.countRatings }})</p>
          </div>
          <div class="flex-row flex gap-2">
            <p class="py-2">Cena: {{ product.price }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex-row flex gap-2">
              <p class="py-2">Ilość na magazynie: {{ getSupply(product.supply) }}</p>
            </div>
          </div>
          <div>
            <div v-if="product.supply > 0" class="flex flex-row gap-4 items-center">
              <button  class="bg-blue-500 px-4 py-2 rounded-full" @click="addToCart">Kup</button>
              <p>Ile:</p>
              <input type="number" v-model="howMuch">
            </div>
            <button v-else class="bg-blue-500 px-4 py-2 rounded-full">Brak produktu na magazynie</button>
          </div>
          <div class="flex flex-col gap-2">
            <p>Cechy produktu:</p>
            <div class="flex" v-for="category in product.categories">
              <p>- {{ category.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="text-5xl">Opis:</p>
      <p class="bg-white py-2 px-4 rounded-3xl max-h-screen">{{ product.description }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>