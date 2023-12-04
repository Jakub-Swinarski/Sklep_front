<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import ProductStore from "@/store/ProductStore";

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const notLoaded = ref(false)
const alertMessage = ref()
const product = ref()
const productId = atob(route.params.id)
const witchImage = ref(1)
const image = ref()
const file = ref(null)
const description = ref()
const name = ref()
const price = ref()
const supply = ref()
const nameEnable = ref(false)
const priceEnable = ref(false)
const supplyEnable = ref(false)
const enabled = ref(false)
const categoryEnabled = ref(false)
const category = ref()

ProductStore.GetProduct(productId).then((res) => {
  product.value = res
  description.value = product.value.description
  name.value = product.value.name
  supply.value = product.value.supply
  price.value = product.value.price
  product.value.description
  isLoading.value = false
}).catch(() => {
  isLoading.value = false
  notLoaded.value = true
  alertMessage.value = 'Nie udało się połączyć z serwerem'
})
const addImage = () => {
  file.value.click()
}
const sendImage = (e) => {
  notLoaded.value = false
  image.value = e.target.files[0]
  if (image.value) {
    const formImage = new FormData
    formImage.append('image', e.target.files[0])
    ProductStore.AddImage(formImage.get('image'), productId).then(() => {
      ProductStore.GetProduct(productId)
    }).catch(() => {
      notLoaded.value = true
      alertMessage.value = 'Gówno Nic nie zrobiłem Gówno'
    })
  }
}
const deleteImage = (id) => {
  ProductStore.DeleteImage(id).then(() => {
    ProductStore.GetProduct(productId).then((res) => {
      product.value = res
    })
  })
}
const setOldDesc = () => {
  description.value = product.value.description
  enabled.value = false
}
const setOldName = () => {
  name.value = product.value.name
  nameEnable.value = false
}
const setOldPrice = () => {
  price.value = product.value.price
  priceEnable.value = false
}
const setOldSupply = () => {
  supply.value = product.value.supply
  supplyEnable.value = false
}
const changeDesc = () => {
  ProductStore.ChangeDescription(description.value, productId).then(() => {
    ProductStore.GetProduct(productId).then((res) => {
      product.value = res
      enabled.value = false
    })
  })
}
const ChangeName = () => {
  ProductStore.ChangeName(name.value, productId).then(() => {
    ProductStore.GetProduct(productId).then((res) => {
      product.value = res
      nameEnable.value = false
    })
  })
}
const ChangePrice = () => {
  ProductStore.ChangePrice(price.value, productId).then(() => {
    ProductStore.GetProduct(productId).then((res) => {
      product.value = res
      priceEnable.value = false
    })
  })
}
const ChangeSupply = () => {
  ProductStore.ChangeSupply(supply.value, productId).then(() => {
    ProductStore.GetProduct(productId).then((res) => {
      product.value = res
      supplyEnable.value = false
    })
  })
}
const DeleteCategory = (catId) => {
  return ProductStore.DeleteCategory(catId,parseInt(productId) ).then(() => {
    ProductStore.GetProduct(productId).then((res) => {
      product.value = res
    })
  })
}
const AddCategory = () =>{
  return ProductStore.AddCategory(category.value,productId).then(() => {
    ProductStore.GetProduct(productId).then((res) => {
      product.value = res
      categoryEnabled.value = false
    })
  })
}

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;
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
  <div class="container justify-self-center" v-if="!notLoaded && !isLoading">
    <div>
      <button class=" bg-blue-500 px-4 py-2 rounded-full" @click="router.back()"> wróć</button>
    </div>
    <div class="flex flex-col gap-4 justify-self-center w-full max-w-5xl">
      <div class="grid grid-cols-2 ">
        <div class="flex flex-col py-2 items-center w-full border-r-2">
          <div v-for="(bigImg, index) of product.images" :key="index">
            <img v-if="witchImage === index" :src="`${baseApiUrl}/storage/${bigImg.image}`" alt="duży obrazek" width="300"
                 height="300">
          </div>
          <div class="grid py-4 grid-cols-4 gap-4">
            <div v-for="(smallImg, index) of product.images" :key="index">
              <img class="absolute rounded-full hover:opacity-100 opacity-50 w-5 m-0.5" @click="deleteImage(smallImg.id)"
                   src="@/assets/xWhiteBg.png" alt="x">
              <img class="rounded-xl hover:border-black border  border-gray-300" @click="witchImage = index"
                   :src="`${baseApiUrl}/storage/${smallImg.image}`" alt="mały" width="60" height="60">
            </div>
            <input ref="file" @change="sendImage" class="hidden" accept="image/*" type="file">
            <img @click="addImage" src="@/assets/add.png" alt="add" width="60" height="60">
          </div>
        </div>
        <div class="text-xl flex flex-col gap-2 pl-3">
          <input v-model="name" class="bg-white py-2 px-4 rounded-3xl enabled:bg-gray-200 text-3xl font-bold"
                 :disabled="nameEnable === false">
          <div class="flex gap-6">
            <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="nameEnable === false" @click=" nameEnable = true">
              Zmień nazwę produktu
            </button>
            <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="nameEnable" @click="ChangeName">Zapisz</button>
            <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="nameEnable" @click="setOldName">Anuluj</button>
          </div>

          <div class="flex items-center flex-row">
            <img class="max-h-6" v-if="product.avgRating <= 0.5" src="@/assets/stars_0_5.png" alt="0/5">
            <img class="max-h-6" v-if="0.5 < product.avgRating && product.avgRating <= 1.5" src="@/assets/stars_1_5.png"
                 alt="1/5">
            <img class="max-h-6" v-if="1.5 < product.avgRating && product.avgRating <= 2.5" src="@/assets/stars_2_5.png"
                 alt="2/5">
            <img class="max-h-6" v-if="2.5 < product.avgRating && product.avgRating <= 3.5" src="@/assets/stars_3_5.png"
                 alt="3/5">
            <img class="max-h-6" v-if="3.5 < product.avgRating && product.avgRating <= 5.5" src="@/assets/stars_4_5.png"
                 alt="4/5">
            <img class="max-h-6" v-if="4.5 < product.avgRating" src="@/assets/stars_5_5.png" alt="5/5">
            <p class=" flex pl-2 text-xl max-h-8 text-gray-500 ">({{ product.countRatings }})</p>
          </div>
          <div class="flex-row flex gap-2">
            <p class="py-2">Cena: </p>
            <input v-model="price" class="bg-white py-2 px-4 rounded-3xl enabled:bg-gray-200"
                   :disabled="priceEnable === false">
          </div>
          <div class="flex gap-6">
            <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="priceEnable === false" @click=" priceEnable = true">
              Zmień Cenę
            </button>
            <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="priceEnable" @click="ChangePrice">Zapisz</button>
            <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="priceEnable" @click="setOldPrice">Anuluj</button>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex-row flex gap-2">
              <p class="py-2">Ilość na magazynie: </p>
              <input v-model="supply" class="bg-white py-2 px-4 rounded-3xl enabled:bg-gray-200"
                     :disabled="supplyEnable === false">
            </div>
            <div class="flex gap-6">
              <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="supplyEnable === false"
                      @click=" supplyEnable = true">Zmień ilość na magazynie
              </button>
              <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="supplyEnable" @click="ChangeSupply">Zapisz
              </button>
              <button class=" bg-blue-500 px-4 py-2 rounded-full" v-if="supplyEnable" @click="setOldSupply">Anuluj
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <p>Cechy produktu:</p>
            <div class="flex" v-for="category in product.categories">
              <p>- {{ category.name }}</p>
              <img @click="DeleteCategory(category.id)" class="self-center max-h-6" src="@/assets/xWhiteBg.png" alt="">
            </div>
            <input class="bg-white py-2 px-4 rounded-full enabled:bg-gray-200 max-h-screen" v-model="category"
                   v-if="categoryEnabled">
            <div class="flex gap-4">
              <button class="bg-blue-500 px-4 py-2 rounded-full" @click="AddCategory" v-if="categoryEnabled">Zapisz</button>
              <button class="bg-blue-500 px-4 py-2 rounded-full" @click="categoryEnabled = false, category = '' "
                      v-if="categoryEnabled">Anuluj
              </button>
            </div>
            <div>
              <button class="bg-blue-500 px-4 py-2 rounded-full" @click="categoryEnabled = true" v-if="!categoryEnabled">
                Dodaj cechę
              </button>
            </div>
          </div>
        </div>
      </div>
      <p class="text-5xl">Opis:</p>
      <textarea class="bg-white py-2 px-4 rounded-3xl enabled:bg-gray-200 max-h-screen" ref="descriptionInput"
                v-model="description" :disabled="enabled === false"></textarea>
      <div class="self-center">
        <button class="bg-blue-500 px-4 py-2 rounded-full" v-if="enabled === false" @click="enabled = true">Edytuj Opis
        </button>
      </div>

      <div v-if="enabled === true" class="self-center flex flex-row gap-6">
        <button class="text-start bg-blue-500 px-4 py-2 rounded-full" @click="changeDesc">Zapisz</button>
        <button class="text-start bg-blue-500 px-4 py-2 rounded-full" @click="setOldDesc">Anuluj</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>