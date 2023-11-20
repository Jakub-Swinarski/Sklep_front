<script setup>
import {ref} from "vue";
import ProductStore from "@/store/ProductStore";

const name = ref()
const price = ref()
const supply = ref()
const category = ref()
const image = ref()
const file = ref()
const description = ref()
const witch = ref(0)
const isVisible = ref(false)
const isLoading = ref(false)
const alertMessage = ref()
const categories = ref()
const images = ref()
const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL


const addProduct = () => {
  isVisible.value = false
  isLoading.value = true
  ProductStore.AddProduct(name.value, price.value, supply.value, description.value).then((res) => {
    witch.value = 1
    isLoading.value = false
    ProductStore.GetProduct(ProductStore.ProductId.value)
  }).catch((e) => {
    alertMessage.value = e.response.data.message
    isVisible.value = true
    isLoading.value = false
  })
}

const addCategory = () => {
  ProductStore.AddCategory(category.value, ProductStore.ProductId.value).then(() => {
        ProductStore.GetProduct(ProductStore.ProductId.value).then((res) => {
          categories.value = res.categories
        })
        category.value = undefined
      }
  )
}
const delCategory = (catId) => {
  ProductStore.DeleteCategory(catId, ProductStore.ProductId.value).then(() => {
    ProductStore.GetProduct(ProductStore.ProductId.value).then((res) => {
      categories.value = res.categories
    })
  })
}
const imageClick = () => {
  file.value.click();
}
const addImage = (e) => {
  image.value = e.target.files[0]
  if (image.value) {
    const form = new FormData
    form.append('image', e.target.files[0])
    ProductStore.AddImage(form.get('image'), ProductStore.ProductId.value).then(() => {
          ProductStore.GetProduct(ProductStore.ProductId.value).then((res) => {
            images.value = res.images
          })
        }
    )
  }
}
</script>

<template>
  <div class="container text-2xl items-center flex-col flex gap-10 pt-20">
    <p class="text-5xl text-center text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700"
       v-if="isVisible">
      {{ alertMessage }}
    </p>
    <div class=" flex flex-col text-center gap-4 " v-if="witch === 0">
      <p>Podaj nazwę produktu</p>
      <input class="min-w-fit bg-gray-100 p-2 rounded-full text-center" v-model="name" type="text">
      <p>Podaj cenę produktu</p>
      <input class="min-w-fit bg-gray-100 p-2 rounded-full text-center" v-model="price" type="text">
      <p>Podaj zapasy produktu</p>
      <input class="min-w-fit bg-gray-100 p-2 rounded-full text-center" v-model="supply" type="number">
      <p>Opis produktu</p>
      <textarea class="min-w-fit bg-gray-100 p-2 rounded-3xl text-center" v-model="description"></textarea>
      <button v-if="!isLoading" @click="addProduct">Dalej</button>
      <img v-if="isLoading" src="@/assets/loader.gif" alt="loading...">
    </div>
    <div v-else class="flex flex-col text-center gap-4">
      <p>Produkt został już stworzony</p>
      <p>teraz dodaj do niego cechy i zdjęcia</p>
      <p>Dodaj cechy</p>
      <div class="flex-row flex items-center justify-center" v-for="category of categories">
        <p>{{ category.name }}</p>
        <img @click="delCategory(category.id)" src="@/assets/xWhiteBg.png" alt="X" width="40">
      </div>
      <input class="min-w-fit bg-gray-100 p-2 rounded-full text-center" v-model="category" type="text">
      <button @click="addCategory">Dodaj cechę</button>
      <p>Dodaj zdjęcia</p>
      <div class="grid grid-cols-5 items-center justify-center">
        <div v-for="image of images">
          <img :src="`${baseApiUrl}/storage/${image.image}`" alt="duży obrazek" width="100"
               height="100">
        </div>
      </div>

      <input class="hidden" ref="file" @change="addImage" type="file" accept="image/*">
      <button @click="imageClick">Dodaj</button>

    </div>

  </div>
</template>

<style scoped>

</style>