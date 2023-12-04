<script setup>

import {reactive, ref} from "vue";
import DeliveryStore from "@/store/DeliveryStore";
import AuthStore from "@/store/AuthStore";
import {vMaska} from "maska"
import {useRouter} from "vue-router";

const alertMessage = ref()
const isLoading = ref(true)
const notLoaded = ref(false)
const deliveryData = ref()
const isDelete = ref()
const isEdit = ref()
const name = ref()
const surname = ref()
const address = ref()
const city = ref()
const zipcode = ref()
const maskZipcode = reactive({})
const number = ref()
const maskTelNumber = reactive({})
const router = useRouter()
const isSomething = ref(false)

DeliveryStore.getUserDeliveryData(AuthStore.userId.value).then((res) => {
  isLoading.value = false
  deliveryData.value = res
}).catch((e) => {
  notLoaded.value = true
  isLoading.value = false
  alertMessage.value = e.response.data.message
})
const deleteAddress = (id) => {
  DeliveryStore.deleteAddress(id).then(() => {
    isDelete.value = undefined
    DeliveryStore.getUserDeliveryData(AuthStore.userId.value).then((res) => {
      isLoading.value = false
      deliveryData.value = res
    }).catch((e) => {
      notLoaded.value = true
      isLoading.value = false
      alertMessage.value = e.response.data.message
    })
  }).catch((e) => {
    alertMessage.value = e.response.data.message
  })
}
const edit = (id, n, sname, a, c, zip, num) => {
  isEdit.value = id
  name.value = n
  surname.value = sname
  address.value = a
  city.value = c
  console.log(zip.length)
  if (zip.toString().length < 5){

    zip = '0'+ zip
  }
  zipcode.value = zip
  number.value = num

}
const cancelEdit = () => {
  isEdit.value = undefined
  name.value = null
  surname.value = null
  address.value = null
  city.value = null
  zipcode.value = null
  number.value = null
}
const saveData = (deliveryId) => {
  DeliveryStore.editAddress(deliveryId, name.value, surname.value, address.value, city.value, maskZipcode.unmasked, maskTelNumber.unmasked).then(() => {
    isEdit.value = undefined
  })
}
const getZipcode=(z)=>{
  if (z.toString().length < 5){
    z= "0"+ z
  }
  return z
}
</script>

<template>
  <div class="flex justify-self-center justify-center items-center self-center max-h-screen" v-if="isLoading">
    <img alt="loading..." src="../../assets/loader.gif">
  </div>
  <div v-if="notLoaded === true">
    <p class="m-6 text-center text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
      {{ alertMessage }}</p>
  </div>
  <div class="grid-cols-2 gap-4 grid pt-4" v-if="!notLoaded && !isLoading">
    <div class="border-2 rounded-2xl flex-col flex gap-4 text-xl text-center" v-for="delivery of deliveryData">
      <p class="hidden">{{isSomething = true}}</p>
      <div>
        <p>Imię i nazwisko:</p>
        <p v-if="isEdit !== delivery.id">{{ delivery.name }} {{ delivery.surname }}</p>
        <div v-if="isEdit === delivery.id" class="flex flex-col gap-2">
          <input class="text-center py-2 px-4 rounded-2xl bg-gray-200 w-full" type="text" placeholder="Imię"
                 v-model="name">
          <input class="text-center py-2 px-4 rounded-2xl bg-gray-200 w-full" type="text" placeholder="Nazwisko"
                 v-model="surname">
        </div>
      </div>
      <div>
        <p>Ulica i numer:</p>
        <p v-if="isEdit !== delivery.id">{{ delivery.address }}</p>
        <div v-if="isEdit === delivery.id">
          <input class="text-center py-2 px-4 rounded-2xl bg-gray-200 w-full" type="text" placeholder="Ulica i numer"
                 v-model="address">
        </div>
      </div>
      <div>
        <p>Miejscowość i kod pocztowy:</p>
        <p v-if="isEdit !== delivery.id">{{ delivery.city }} {{ getZipcode(delivery.zipcode)}}</p>
        <div v-if="isEdit === delivery.id" class="flex flex-col gap-2">
          <input class="text-center py-2 px-4 rounded-2xl bg-gray-200 w-full" type="text" placeholder="Miejscowość"
                 v-model="city">
          <input class="text-center py-2 px-4 rounded-2xl bg-gray-200 w-full" v-maska="maskZipcode" data-maska="##-###"
                 v-model="zipcode" type="text" placeholder="Kod pocztowy">
        </div>
      </div>
      <div>
        <p>Numer telefonu:</p>
        <p v-if="isEdit !== delivery.id">+48{{ delivery.number }}</p>
        <div v-if="isEdit === delivery.id" class="flex flex-row justify-center items-center">
          <p>+48</p>
          <input class="text-center py-2 px-2 rounded-2xl bg-gray-200 w-2/4" data-maska="### ### ###"
                 v-maska="maskTelNumber" type="text" placeholder="Numer telefonu"
                 v-model="number">
        </div>
      </div>
      <div class="flex gap-4 justify-center" v-if="isEdit !== delivery.id">
        <button class="bg-blue-500 px-4 py-2 rounded-full" @click="isDelete = delivery.id">Usuń</button>
        <button class="bg-blue-500 px-4 py-2 rounded-full"
                @click="edit(delivery.id,delivery.name,delivery.surname,delivery.address,delivery.city,delivery.zipcode,delivery.number)">
          Edytuj
        </button>
      </div>
      <div class="flex gap-4 justify-center" v-else>
        <button class="bg-blue-500 px-4 py-2 rounded-full" @click="saveData(delivery.id)">Zapisz</button>
        <button class="bg-blue-500 px-4 py-2 rounded-full" @click="cancelEdit">Anuluj</button>
      </div>
      <div v-if="isDelete === delivery.id"
           class="bg-gray-200 p-6 -translate-x-1/2 -translate-y-1/2 rounded-2xl fixed top-1/2 left-1/2 gap-6 flex flex-col">
        <p>Czy na pewno chcesz usunąć te dane?</p>
        <button class="bg-red-500 px-4 py-2 rounded-full" @click="deleteAddress(delivery.id)">Tak, usuń</button>
        <button class="bg-blue-500 px-4 py-2 rounded-full" @click="isDelete = undefined">Nie, anuluj</button>
      </div>
    </div>
  </div>
  <div class="text-center text-3xl" v-if="!isSomething && !notLoaded && !isLoading">
    <p>Nie ma żadnych opinij</p>
  </div>
  <div class="w-full justify-center flex mt-6">
    <button class="bg-blue-500 px-4 py-2 rounded-full text-3xl " @click="router.push('dataToOrders/new')">Dodaj dane</button>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>