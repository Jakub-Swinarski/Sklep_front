<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import ProductStore from "@/store/ProductStore";

const router = useRouter()
const products = ref()
const isLoading = ref(true)
const notLoaded = ref(false)
const alertMessage = ref()
const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;
ProductStore.GetAllProducts().then((res) => {
  isLoading.value = false
  products.value = res
}).catch((e) => {
  isLoading.value = false
  notLoaded.value = true
  alertMessage.value = 'Nie udało się połączyć z serwerem'
})
const redirect =(id)=>{
  router.push('/p/'+btoa(id))
}
</script>

<template>
  <div v-if="isLoading" class="justify-self-center">
    <img src="@/assets/loader.gif" alt="loading...">
  </div>
  <div v-if="notLoaded">
    <p class="m-6 text-center text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
      {{ alertMessage }}</p>
  </div>
  <div v-if="!isLoading && !notLoaded" class="container max-w-5xl justify-self-center pt-20 items-center gap-6 grid-cols-2 grid">
    <div class="flex flex-row bg-gray-100 p-6 rounded-3xl h-30 min-h-full gap-6" @click="redirect(product.id)"  v-for="product of products">
      <div>
        <img v-if="product.first_image != null" :src="`${baseApiUrl}/${product.first_image.image}`" alt="img">
        <img v-else src="@/assets/no%20image.webp" width="100">
      </div>
      <div class="flex flex-col">
        <p>{{product.name}}</p>
        <p>{{product.price}} zł</p>
        <div class="flex items-center flex-row">
          <img class="max-h-6" v-if="product.avgRating <= 0.5" src="@/assets/stars%200_5.png" alt="0/5">
          <img class="max-h-6" v-if="0.5 < product.avgRating && product.avgRating <= 1.5" src="@/assets/stars%201_5.png"
               alt="1/5">
          <img class="max-h-6" v-if="1.5 < product.avgRating && product.avgRating <= 2.5" src="@/assets/stars%202_5.png"
               alt="2/5">
          <img class="max-h-6" v-if="2.5 < product.avgRating && product.avgRating <= 3.5" src="@/assets/stars%203_5.png"
               alt="3/5">
          <img class="max-h-6" v-if="3.5 < product.avgRating && product.avgRating <= 5.5" src="@/assets/stars%204_5.png"
               alt="4/5">
          <img class="max-h-6" v-if="4.5 < product.avgRating" src="@/assets/stars%205_5.png" alt="5/5">
          <p class=" flex pl-2 text-xl max-h-8 text-gray-500 ">({{ product.countRatings }})</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>