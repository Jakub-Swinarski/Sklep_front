<script setup>
import {ref} from "vue";
import DeliveryStore from "@/store/DeliveryStore";
import AuthStore from "@/store/AuthStore";

const deliveryType = ref()
const deliveryData = ref()
DeliveryStore.getUserDeliveryData(AuthStore.userId.value).then((res)=>{
  deliveryData.value = res.map((elem)=>{
    elem.zipcode = elem.zipcode.toString().padStart(5,'0')
    let temp = elem.zipcode[0]
    return elem
  })

})
</script>

<template>
  <div class="container flex-col flex max-w-xl text-xl justify-self-center gap-6 pt-20">
    <p class="text-3xl">Dostawa</p>
    <div class="flex flex-col max-w-sm border-2 rounded-3xl p-4">

      <div class="justify-between flex">
        <label> Kurier</label>
        <input type="radio" name="delivery" value="kurier" v-model="deliveryType">
      </div>
      <div class="justify-between flex">
        <label> Odbierz w sklepie</label>
        <input type="radio" name="delivery" value="sklep" v-model="deliveryType">
      </div>
      <div class="justify-between flex">
        <label> InPost Paczkomat</label>
        <input type="radio" name="delivery" value="paczkomat" v-model="deliveryType">
      </div>
    </div>
    <p class="text-3xl">Dane do dostawy</p>
    <div class="grid grid-cols-2">
      <div class=" max-w-sm border-2 rounded-3xl p-4" v-for="data of deliveryData">
        <p>{{data.name}}</p>
        <p>{{data.surname}}</p>
        <p>{{data.address}}</p>
        <p>{{data.zipcode}}</p>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>