<script setup>
import {reactive, ref} from "vue";
import DeliveryStore from "@/store/DeliveryStore";
import AuthStore from "@/store/AuthStore";
import OrderStore from "@/store/OrderStore";
import ProductStore from "@/store/ProductStore";
import {vMaska} from "maska";
import {useRouter} from "vue-router";

const deliveryType = ref()
const deliveryData = ref()
const deliveryId = ref()
const payType = ref()
const alertMessage = ref()
const isError = ref(false)
const finalPrice = ref(0)
const rawProductData = JSON.parse(localStorage.getItem('cart'))
const name = ref()
const surname = ref()
const address = reactive({})
const zipcode = reactive({})
const city = ref()
const number = reactive({})
const router = useRouter()

AuthStore.fetchUser()
DeliveryStore.getUserDeliveryData(AuthStore.userId.value).then((res) => {
  deliveryData.value = res.map((elem) => {
    elem.zipcode = elem.zipcode.toString().padStart(5, '0')
    let temp = elem.zipcode[0] + elem.zipcode[1]
    let temp2 = elem.zipcode[2] + elem.zipcode[3] + elem.zipcode[4]
    elem.zipcode = temp + '-' + temp2
    return elem
  })
})
rawProductData.forEach((val) => {
  ProductStore.GetProduct(val.id).then((res) => {
    res.quantity = val.numberOfItems
    finalPrice.value += res.quantity * res.price
  })
})


const sendOrder = () => {
  isError.value = false
  if (deliveryType.value !== undefined) {
    if (deliveryId.value !== undefined) {
      if (payType.value !== undefined) {
        console.log(deliveryId.value, AuthStore.userId.value, deliveryType.value, payType.value, JSON.parse(localStorage.getItem('cart')))
        OrderStore.addOrder(deliveryId.value, AuthStore.userId.value, deliveryType.value, payType.value, JSON.parse(localStorage.getItem('cart'))).then(() => {
          localStorage.removeItem('cart')
          router.push('/accept')
        })
      } else {
        alertMessage.value = 'Wybierz rodzaj płatności'
        isError.value = true
      }
    } else {
      alertMessage.value = 'Wybierz adres na jaki wysłać'
      isError.value = true
    }
  } else {
    isError.value = true
    alertMessage.value = 'Wybierz rodzaj dostawy'
  }
}
const sendOrderNotLogged = () => {
  isError.value = false
  if (name.value !== undefined) {
    if (surname.value !== undefined) {
      if (address.completed) {
        if (zipcode.completed) {
          if (city.value !== undefined) {
            if (number.completed) {
              if (deliveryType.value !== undefined) {
                if (payType.value !== undefined) {
                  console.log(deliveryId.value, AuthStore.userId.value, deliveryType.value, payType.value, JSON.parse(localStorage.getItem('cart')))
                  OrderStore.addOrderNotLogged(deliveryType.value, payType.value, JSON.parse(localStorage.getItem('cart')), name.value, surname.value, address.masked, zipcode.unmasked, city.value, number.unmasked).then(() => {
                    localStorage.removeItem('cart')
                    router.push('/accept')
                  })
                } else {
                  alertMessage.value = 'Wybierz rodzaj płatności'
                  isError.value = true
                }
              } else {
                isError.value = true
                alertMessage.value = 'Wybierz rodzaj dostawy'
              }
            } else {
              alertMessage.value = 'Podaj numer telefonu'
              isError.value = true
            }
          } else {
            alertMessage.value = 'Podaj miasto'
            isError.value = true
          }
        } else {
          alertMessage.value = 'Podaj kod pocztowy'
          isError.value = true
        }
      } else {
        alertMessage.value = 'Podaj adres'
        isError.value = true
      }
    } else {
      alertMessage.value = 'Podaj nazwisko'
      isError.value = true
    }
  } else {
    alertMessage.value = 'Podaj imię'
    isError.value = true
  }
}
const getPrice = () => {
  if (deliveryType.value === 'kurier' && payType.value !== 'odbiór') return finalPrice.value + 20 + ' zł'
  else if (deliveryType.value === 'kurier' && payType.value === 'odbiór') return finalPrice.value + 25 + ' zł'
  else if (deliveryType.value === 'paczkomat') return finalPrice.value + 10 + ' zł'
  else return finalPrice.value + ' zł'
}


</script>

<template>

  <div class="container flex-col flex max-w-xl text-xl justify-self-center gap-6 pt-20">
    <p class="text-3xl">Dostawa</p>
    <div class="flex flex-col max-w-sm border-2 rounded-3xl p-4">
      <div class="justify-between flex">
        <label> Kurier</label>
        <div class="flex flex-row gap-4 text-gray-500">
          <label>20zł</label>
          <input type="radio" name="delivery" value="kurier" v-model="deliveryType">
        </div>
      </div>
      <div class="justify-between flex">
        <label> Odbierz w sklepie</label>
        <div class="flex flex-row gap-4 text-gray-500">
          <label>0zł</label>
          <input type="radio" name="delivery" value="sklep" v-model="deliveryType">
        </div>
      </div>
      <div class="justify-between flex">
        <label> InPost Paczkomat</label>
        <div class="flex flex-row gap-4 text-gray-500">
          <label>10zł</label>
          <input type="radio" name="delivery" value="paczkomat" v-model="deliveryType">
        </div>
      </div>
    </div>
    <p class="text-3xl">Dane do dostawy</p>
    <div class="grid grid-cols-2">
      <div v-if="AuthStore.userId.value !== undefined" class=" max-w-sm border-2  rounded-3xl p-4"
           :class="[deliveryId === data.id ? 'border-black': 'border-2']"
           v-for="data of deliveryData">
        <p>{{ data.name }}</p>
        <p>{{ data.surname }}</p>
        <p>{{ data.address }}</p>
        <p>{{ data.zipcode }} {{ data.city }}</p>
        <p>+48 {{ data.number }}</p>
        <button class="bg-blue-500 px-4 py-2 rounded-full text-xl " @click="deliveryId = data.id">Wybieram</button>
      </div>
      <div v-else class="max-w-md flex-col flex gap-4">
        <p>Imię</p>
        <input class="py-2 px-4 rounded-2xl bg-gray-200 " v-model="name">
        <p>Nazwisko</p>
        <input class="py-2 px-4 rounded-2xl bg-gray-200 " v-model="surname">
        <p>Adres</p>
        <input class="py-2 px-4 rounded-2xl bg-gray-200 "
               v-maska="address"
               data-maska="a 1"
               data-maska-tokens="a:[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆ]:multiple|1:[a-zA-Z0-9\/]:multiple"
        >
        <p>Kod pocztowy</p>
        <input class="py-2 px-4 rounded-2xl bg-gray-200 " type="text" v-maska="zipcode" data-maska="##-###">
        <p>Miasto</p>
        <input class="py-2 px-4 rounded-2xl bg-gray-200 " type="text" v-model="city">
        <p>Numer telefonu</p>
        <input class="py-2 px-4 rounded-2xl bg-gray-200 " type="text" v-maska="number" data-maska="+48 ### ### ###">

      </div>
    </div>
    <p class="text-3xl">Sposób płatności</p>
    <div class="flex flex-col max-w-sm border-2 rounded-3xl p-4">
      <div class="flex flex-row justify-between">
        <label> Online</label>
        <div class="flex flex-row gap-4 text-gray-500">
          <label>0zł</label>
          <input type="radio" name="pay" value="online" v-model="payType">
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label> Przelew</label>
        <div class="flex flex-row gap-4 text-gray-500">
          <label>0zł</label>
          <input type="radio" name="pay" value="przelew" v-model="payType">
        </div>
      </div>
      <div v-if="deliveryType !== 'paczkomat'" class="flex flex-row justify-between">
        <label> Przy odbiorze</label>
        <div class="flex flex-row gap-4 text-gray-500">
          <label v-if="deliveryType === 'sklep'">0zł</label>
          <label v-else>5zł</label>
          <input type="radio" name="pay" value="odbiór" v-model="payType">
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label> Raty</label>
        <div class="flex flex-row gap-4 text-gray-500">
          <label>0zł</label>
          <input type="radio" name="pay" value="raty" v-model="payType">
        </div>
      </div>
    </div>
    <p class="text-3xl">Do zapłaty</p>
    <div class="flex flex-col max-w-sm border-2 rounded-3xl p-4">
      <div class="flex flex-row justify-between">
        <p>Dostawa: </p>
        <p v-if="deliveryType === 'kurier' && payType !== 'odbiór'">20 zł</p>
        <p v-else-if="deliveryType === 'kurier' && payType === 'odbiór'">25 zł</p>
        <p v-else-if="deliveryType === 'paczkomat'">10 zł</p>
        <p v-else>0 zł</p>
      </div>
      <div class="flex flex-row justify-between">
        <p>Produkty:</p>
        <p>{{ finalPrice }} zł</p>
      </div>
      <div class="flex flex-row justify-between">
        <p>Razem:</p>
        <p>{{ getPrice() }}</p>
      </div>
    </div>
    <div v-if="isError">
      <p class="m-6 text-center text-4xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
        {{ alertMessage }}</p>
    </div>
    <button v-if="AuthStore.userId.value === undefined" class="bg-blue-500 px-4 py-2 rounded-full text-xl "
            @click="sendOrderNotLogged">Zatwierdź
    </button>
    <button v-else class="bg-blue-500 px-4 py-2 rounded-full text-xl " @click="sendOrder">Zatwierdź</button>
  </div>
</template>

<style scoped>

</style>