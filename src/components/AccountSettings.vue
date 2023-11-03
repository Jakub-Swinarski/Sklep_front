<script setup>
import AuthStore from '@/store/AuthStore'
import {ref} from "vue";
import UserStore from "@/store/UserStore";
import ResetConfirmation from "@/components/ResetConfirmation.vue";

const newUsername = ref();
const old_password = ref();
const password = ref()
const r_password = ref()
const alertMessage = ref()
const password_panel = ref(false)
const email_panel = ref(false)
const user_panel = ref(false)
const isLoading = ref(true)
const notLoaded = ref(false)
const isVisible = ref(false)
const email = ref();

AuthStore.fetchUser().then((res) => {
  isLoading.value = false
}).catch((error) => {
  alertMessage.value = "Problem połączenia z serwerem strona niedostępna"
  notLoaded.value = true
  isLoading.value = false
});
const changeUsername = () => {
  isVisible.value = false
  UserStore.ChangeUsername(newUsername.value, AuthStore.userId.value,true).then((res) => {
    user_panel.value = false
    newUsername.value = null
  }).catch((error) => {
    isVisible.value = true
    alertMessage.value = error.response.data.message;
    if (alertMessage.value === "The username has already been taken.") alertMessage.value = "Nazwa użytkownika jest już zajęta."
  })
}
const changeEmail = () => {
  isVisible.value = false
  UserStore.ChangeEmail(email.value, password.value, AuthStore.userId.value,true).then((res) => {
    email_panel.value = false
    email.value = null
    password.value = null
  }).catch((e) => {
    isVisible.value = true
    alertMessage.value = e.response.data.message;
    if (alertMessage.value === "The username has already been taken.") alertMessage.value = "Nazwa użytkownika jest już zajęta."
  })
}
const changePassword = () => {
  if (password.value !== r_password.value) {
    isVisible.value = true
    alertMessage.value = 'Nowe hasło się nie powtarza'
  } else {
    isVisible.value = false
    UserStore.ChangePassword(AuthStore.userId.value, old_password.value, password.value).then((res) => {
      password_panel.value = false
      password_panel.value = false
      old_password.value = null
      password.value = null
      r_password.value = null
    }).catch((e) => {
      isVisible.value = true
      alertMessage.value = e.response.data.message;
    })
  }

}
</script>

<template>
  <div class="justify-self-center self-center max-h-screen" v-if="isLoading">
    <img alt="loading..." src="@/assets/loader.gif">
  </div>
  <div v-if="notLoaded === true">
    <p class="m-6 text-center text-5xl text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700">
      {{ alertMessage }}</p>
  </div>
  <div
      class="container gap-6 flex flex-col justify-self-center self-center justify-center items-center  text-2xl py-8 min-h-screen"
      v-if="!isLoading && !notLoaded">
    <p>Nazwa użytkownika</p>
    <div class="gap-6 flex">
      <input class="bg-gray-100 p-2 rounded-full text-center" type="text" v-model="AuthStore.username.value"
             id="username" disabled>
      <button class="bg-blue-500 px-4 py-2 rounded-full" @click="user_panel = true">Zmień</button>
    </div>

    <div class="absolute bg-gray-100 p-6 rounded-2xl gap-6 flex flex-col" v-if="user_panel === true">
      <p class=" text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700" v-if="isVisible">
        {{ alertMessage }}</p>
      <input class="bg-white p-2 rounded-full text-center" v-model="newUsername" type="text"
             placeholder="Nowa nazwa użytkownika" name="" id="username" required>
      <button @click="changeUsername" type="submit" class="button">Zatwierdź</button>
      <button @click="user_panel = false" class="btn">Anuluj</button>

    </div>
    <p>Adres email</p>
    <div class="gap-6 flex">
      <input class="bg-gray-100 p-2 rounded-full text-center" v-model="AuthStore.userEmail.value" type="email"
             placeholder="mail" name="" id="email" disabled>
      <button class="bg-blue-500 px-4 py-2 rounded-full" @click="email_panel = true">Zmień</button>
    </div>
    <div class="absolute bg-gray-100 p-6 rounded-2xl gap-6 flex flex-col" v-if="email_panel === true">
      <p class=" text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700" v-if="isVisible">
        {{ alertMessage }}</p>
      <p>Obecny e-mail</p>
      <input class="bg-white p-2 rounded-full text-center" v-model="AuthStore.userEmail.value" type="email">
      <input class="bg-white p-2 rounded-full text-center" v-model="email" type="email" placeholder="Wpisz nowy email">
      <input class="bg-white p-2 rounded-full text-center" v-model="password" type="password" placeholder="Wpisz hasło">
      <button @click="changeEmail" type="submit" class="button">Zatwierdź</button>
      <button @click="email_panel = false" class="btn">Anuluj</button>

    </div>
    <p>Hasło</p>
    <div class="gap-6 flex">
      <input class="bg-gray-100 p-2 rounded-full text-center" value="12345678" type="password" id="password"
             disabled>
      <button class="bg-blue-500 px-4 py-2 rounded-full" @click="password_panel = true">Zmień</button>
    </div>

    <div class="absolute bg-gray-100 p-6 rounded-2xl gap-6 flex flex-col" v-if="password_panel === true">
      <p class=" text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700" v-if="isVisible">
        {{ alertMessage }}</p>
      <input class="bg-white p-2 rounded-full text-center" v-model="old_password" type="password"
             placeholder="Wpisz stare hasło">
      <input class="bg-white p-2 rounded-full text-center" v-model="password" type="password"
             placeholder="Wpisz nowe hasło">
      <input class="bg-white p-2 rounded-full text-center" v-model="r_password" type="password"
             placeholder="Powtórz nowe hasło">
      <button @click="changePassword">Zatwierdź</button>
      <button @click="password_panel = false">Anuluj</button>

    </div>
  </div>
</template>

<style scoped>

</style>