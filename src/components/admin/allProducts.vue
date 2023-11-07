<script setup>

import {ref} from "vue";
import ProductStore from "@/store/ProductStore";
import {useRouter} from "vue-router";

const isLoading = ref(true)
const notLoaded = ref(false)
const alertMessage = ref()
const products = ref()
const router = useRouter()

ProductStore.GetAllProducts().then((res)=>{
      products.value = res
      isLoading.value = false
}).catch(()=>{
  isLoading.value = false
  notLoaded.value = true
  alertMessage.value = 'Nie udało się połączyć z serwerem'
})
const click = (id)=>{
  router.push('/edit/product/'+btoa(id))
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
  <div class="grid grid-cols-2 gap-2" v-if="!notLoaded && !isLoading" >
    <div class="flex flex-col gap-4 bg-gray-100 p-2 rounded-2xl text-xl" v-for="product in products">
      <div class="self-center">
        <img class="rounded-2xl" v-if="product.first_image !== null" :src="product.first_image.image" alt="img" height="100" width="100">
        <img class="rounded-2xl" v-else src="@/assets/no%20image.webp" width="100" height="100">
      </div>
      <div class="flex flex-col gap-2">
        <p>Id: {{product.id}}</p>
        <p>Nazwa: {{product.name}}</p>
        <p>Cena: {{product.price}}zł</p>
        <p>Zaopatrzenie: {{product.supply}}</p>
      </div>
      <div>
        <button class="bg-blue-500 px-4 py-2 rounded-full" @click="click(product.id)">Szczegóły</button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>