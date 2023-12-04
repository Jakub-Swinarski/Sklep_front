<script setup>
import {ref} from "vue";
import ProductStore from "@/store/ProductStore";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;
const rawProductData = JSON.parse(localStorage.getItem('cart'))
const products = ref([])
const isLoading = ref(true)
const finalPrice = ref(0)


rawProductData.forEach((val)=>{
  ProductStore.GetProduct(val.id).then((res) => {
    res.quantity = val.numberOfItems
    finalPrice.value += res.quantity * res.price
    products.value.push(res)
  })
})


</script>

<template>
  <div class=" bg-gray-100 rounded-xl flex flex-col py-10 px-8 ">
    <p class="text-center text-3xl">Koszyk</p>

    <div class="flex flex-row border-b-2" v-for="product of products">
      <div>
        <img v-if="product.image.image" :src="`${baseApiUrl}/storage/${product.image.image}`" width="100">
      </div>
      <div class="flex flex-col ">
        <p>{{product.name}}</p>
        <p>{{product.price}} zł</p>
        <p>Ile:{{product.quantity}}</p>
      </div>

    </div>
    <div>
      <p>Cez za wszystko: {{finalPrice}}</p>
    </div>

  </div>
</template>

<style scoped>

</style>