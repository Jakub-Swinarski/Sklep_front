<script setup>
import {useRouter} from "vue-router";
import {vMaska} from "maska"
import {reactive, ref} from "vue";
import DeliveryStore from "@/store/DeliveryStore";
import AuthStore from "@/store/AuthStore";

const router = useRouter()
const nameSurname = reactive({})
const splited = ref()
const name = ref()
const surname = ref()
const address = reactive({})
const zipcode = reactive({})
const number = reactive({})
const city = ref()
const test = ref()
const isError = ref(false)
const error = ref()
const addAddress = () => {
  isError.value = false
  if (nameSurname.completed === true) {
    splited.value = nameSurname.masked.split(' ')
    name.value = splited.value[0]
    surname.value = splited.value[1]
  }
  if (nameSurname.completed === true) {
    if (address.completed === true) {
      if (city.value !== undefined) {
        if (zipcode.completed === true) {
          if (number.completed === true) {
            DeliveryStore.addAddress(name.value, surname.value, address.masked, city.value, zipcode.unmasked, number.unmasked,AuthStore.userId.value).then(()=>{
              router.back()
            }).catch((e)=>{
              isError.value = true
              error.value = e.response.data.message
            })
          } else {
            isError.value = true
            error.value = 'Brak numeru telefonu'
          }
        } else {
          isError.value = true
          error.value = 'Brak kodu pocztowego'
        }
      } else {
        isError.value = true
        error.value = 'Brak miasta'
      }
    } else {
      isError.value = true
      error.value = 'Błędny adres. Należy podać ulicę oraz numer'
    }
  } else {
    isError.value = true
    error.value = 'Błędne imię lub nazwisko'
  }

}

</script>

<template>
  <div
      class="container flex-col flex absolute w-2/5 py-4 bg-gray-100 rounded-2xl justify-center gap-6 text-xl items-center">
    <div v-if="isError">
      <p class="m-6 text-center text-3xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
        {{ error }}</p>
    </div>
    <div>
      <p class="text-center">Imię i nazwisko</p>
      <input class="py-2 px-4 rounded-2xl bg-gray-200 "
             v-maska="nameSurname"
             data-maska="a a"
             data-maska-tokens="a:[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆ]:multiple"
      >
    </div>
    <div>
      <p class="text-center">Adres</p>
      <input class="py-2 px-4 rounded-2xl bg-gray-200 "
             v-maska="address"
             data-maska="a 1"
             data-maska-tokens="a:[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆ]:multiple|1:[a-zA-Z0-9\/]:multiple"
      >
    </div>
    <div>
      <p class="text-center">Miasto</p>
      <input class="py-2 px-4 rounded-2xl bg-gray-200 " type="text" v-model="city">
    </div>
    <div>
      <p class="text-center">Kod pocztowy</p>
      <input class="py-2 px-4 rounded-2xl bg-gray-200 " type="text" v-maska="zipcode" data-maska="##-###">
    </div>
    <div>
      <p class="text-center">Numer telefonu</p>
      <input class="py-2 px-4 rounded-2xl bg-gray-200 " type="text" v-maska="number" data-maska="+48 ### ### ###">
    </div>
    <div class="flex flex-row gap-4">
      <button class="bg-blue-500 px-4 py-2 rounded-full" @click="router.back()">Anuluj</button>
      <button class="bg-blue-500 px-4 py-2 rounded-full" @click="addAddress">Zapisz</button>
    </div>
  </div>

</template>

<style scoped>

</style>