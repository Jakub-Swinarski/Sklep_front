<script setup>
import RatingStore from "@/store/RatingStore";
import AuthStore from "@/store/AuthStore";
import {ref} from "vue";

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;
const ratings = ref()
const isLoading = ref(true)
const notLoaded = ref(false)
const alertMessage = ref()
const heading = ref()
const description = ref()
const isVisible = ref(false)
const ratingValue = ref()
const isError = ref()
const isSomething = ref(false)

RatingStore.getUserRatings(AuthStore.userId.value).then((res) => {
  isLoading.value = false
  ratings.value = res
}).catch((e) => {
  alertMessage.value = e.response.data.message
  isLoading.value = false
  notLoaded.value = true
})
const getDate = (data) => {
  let temp = new Date(data)
  return temp.toLocaleDateString()
}
const edit = (id, h, d, r) => {
  isVisible.value = id
  heading.value = h
  description.value = d
  ratingValue.value = r
}
const accept = (id) => {
  isError.value = false
  RatingStore.editRatings(id, heading.value, description.value, ratingValue.value).then(() => {
    isVisible.value = undefined
  }).catch((error) => {
    alertMessage.value = error.response.data.message
    isError.value = id
  })
}
const cancel = () => {
  isError.value = false
  heading.value = undefined
  description.value = undefined
  ratingValue.value = undefined
  isVisible.value = false
}
</script>

<template>
  <div class="flex justify-self-center justify-center items-center self-center max-h-screen" v-if="isLoading">
    <img alt="loading..." src="../../assets/loader.gif">
  </div>
  <div v-if="notLoaded">
    <p class="m-6 text-center text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
      {{ alertMessage }}</p>
  </div>
  <div v-if="!notLoaded && !isLoading">
    <div class="bg-gray-200 p-6 rounded-3xl" v-for="rating of ratings">
      <p class="hidden">{{ isSomething = true}}</p>
      <p class="text-3xl">{{ rating.product.name }}</p>
      <div class="flex-row flex text-xl">
        <img class="w-1/3" :src="`${baseApiUrl}/storage/${rating.product.image.image}`" alt="zdjęcie">
        <div class="w-2/3">
          <div v-if="isError === rating.id">
            <p class="m-6 text-center text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
              {{ alertMessage }}</p>
          </div>
          <p class="font-bold text-2xl" v-if="isVisible !== rating.id">{{ rating.heading }}</p>
          <input v-model="heading" v-if="isVisible === rating.id" class="bg-gray-300 w-full p-4 rounded-2xl">
          <div v-if="isVisible === false" class="flex flex-row text-xl gap-2 items-center">
            <img class="max-h-6" v-if="rating.rating <= 0.5" src="@/assets/stars%200_5.png" alt="0/5">
            <img class="max-h-6" v-if="0.5 < rating.rating && rating.rating <= 1.5" src="@/assets/stars%201_5.png"
                 alt="1/5">
            <img class="max-h-6" v-if="1.5 < rating.rating && rating.rating <= 2.5" src="@/assets/stars%202_5.png"
                 alt="2/5">
            <img class="max-h-6" v-if="2.5 < rating.rating && rating.rating <= 3.5" src="@/assets/stars%203_5.png"
                 alt="3/5">
            <img class="max-h-6" v-if="3.5 < rating.rating && rating.rating <= 4.5" src="@/assets/stars%204_5.png"
                 alt="4/5">
            <img class="max-h-6" v-if="4.5 < rating.rating" src="@/assets/stars%205_5.png" alt="5/5">
            <p>({{ rating.rating }})</p>
          </div>
          <div v-if="isVisible === rating.id" class="flex flex-col">
            <div class="flex flex-row text-xl gap-2 items-center ml-3.5">
              <img class="max-h-6" v-if="ratingValue === 0" src="@/assets/stars%200_5.png" alt="0/5">
              <img class="max-h-6" v-if="ratingValue === 1" src="@/assets/stars%201_5.png" alt="1/5">
              <img class="max-h-6" v-if="ratingValue === 2" src="@/assets/stars%202_5.png" alt="2/5">
              <img class="max-h-6" v-if="ratingValue === 3" src="@/assets/stars%203_5.png" alt="3/5">
              <img class="max-h-6" v-if="ratingValue === 4" src="@/assets/stars%204_5.png" alt="4/5">
              <img class="max-h-6" v-if="ratingValue === 5" src="@/assets/stars%205_5.png" alt="5/5">
            </div>
            <div class="flex flex-row gap-3">
              <p @click="ratingValue = 0">0</p>
              <p @click="ratingValue = 1">1</p>
              <p @click="ratingValue = 2">2</p>
              <p @click="ratingValue = 3">3</p>
              <p @click="ratingValue = 4">4</p>
              <p @click="ratingValue = 5">5</p>
            </div>
          </div>
          <p>{{ getDate(rating.created_at) }}</p>
          <p v-if="rating.created_at !== rating.updated_at" class="text-gray-400">Edytowano dnia
            {{ getDate(rating.updated_at) }}</p>
          <textarea v-model="description" class="w-full bg-gray-300 p-6 rounded-2xl"
                    v-if="isVisible === rating.id"></textarea>
          <p v-if="isVisible !== rating.id">{{ rating.description }}</p>
          <div class="flex items-center justify-center" v-if="isVisible !== rating.id">
            <button class=" bg-blue-500 px-4 py-2 rounded-full"
                    @click="edit(rating.id,rating.heading,rating.description, rating.rating)">Edytuj
            </button>
          </div>
          <div v-if="isVisible === rating.id" class="flex items-center justify-center gap-6">
            <button class=" bg-blue-500 px-4 py-2 rounded-full" @click="accept(rating.id)">Zapisz</button>
            <button class=" bg-blue-500 px-4 py-2 rounded-full" @click="cancel">Anuluj</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center text-3xl" v-if="!isSomething && !notLoaded && !isLoading">
    <p>Nie ma żadnych opinij</p>
  </div>

</template>

<style scoped>

</style>