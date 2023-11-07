<script setup>
import UserStore from "@/store/UserStore";
import AuthStore from "@/store/AuthStore";
import {ref} from "vue";

const isLoading = ref(true)
const notLoaded = ref(false)
const alertMessage = ref()
const isVisible = ref()
const isError = ref(false)
const user_panel = ref(false)
const email_panel = ref(false)
const password_panel = ref(false)
const newUsername = ref()
const email = ref()
const password = ref()
const r_password = ref()
const old_password = ref()
const userId = ref()

UserStore.GetAllUsers().then((res) => {
  isLoading.value = false
}).catch((e) => {
  notLoaded.value = true
  isLoading.value = false
  try {
    alertMessage.value = e.response.data.message
  } catch (e) {
    alertMessage.value = "Nie można połączyć się z serwerem"
  }
})
const changeUsername = (id) => {
  isError.value = false
  UserStore.ChangeUsername(newUsername.value, id).then((res) => {
    user_panel.value = false
    newUsername.value = null
    UserStore.GetAllUsers()
  }).catch((error) => {
    isError.value = true
    alertMessage.value = error.response.data.message;
    if (alertMessage.value === "The username has already been taken.") alertMessage.value = "Nazwa użytkownika jest już zajęta."
  })
}
const changeEmail = (id) => {
  isError.value = false
  UserStore.ChangeEmail(email.value, password.value, id).then((res) => {
    email_panel.value = false
    email.value = null
    password.value = null
    UserStore.GetAllUsers()
  }).catch((e) => {
    isError.value = true
    alertMessage.value = e.response.data.message;
    if (alertMessage.value === "The username has already been taken.") alertMessage.value = "Nazwa użytkownika jest już zajęta."
  })
}
const changePassword = (id) => {
  if (password.value !== r_password.value) {
    isVisible.value = true
    alertMessage.value = 'Nowe hasło się nie powtarza'
  } else {
    isError.value = false
    UserStore.ChangePassword(id, old_password.value, password.value).then((res) => {
      password_panel.value = false
      old_password.value = null
      password.value = null
      r_password.value = null
    }).catch((e) => {
      isError.value = true
      alertMessage.value = e.response.data.message;
    })
  }
}
const deleteUser = (id) =>{
  UserStore.DeleteUser(id).then(()=>{
    UserStore.GetAllUsers().then(()=>{
      isVisible.value = 0
    })
  })
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
  <div class="grid grid-cols-2 gap-2" v-if="!notLoaded && !isLoading">
    <div class="flex flex-col bg-gray-100 p-2 gap-2 rounded-2xl" v-for="(row,row_index) of UserStore.allUsers.value"
         :key="row_index">
      <p>Id: {{ row.id }}</p>
      <p class="name">Nazwa: {{ row.username }}</p>
      <p class="email">Email: {{ row.email }}</p>
      <div class="flex flex-row gap-2">
        <button class="py-2 px-4 bg-blue-500 rounded-full" @click="isVisible = 'Edit-'+row.id">Edytuj</button>
        <button class="py-2 px-4 bg-blue-500 rounded-full" @click="isVisible = 'Delete-'+row.id">Usuń</button>
      </div>
      <div class="fixed right-1/3 top-1/4" v-if="isVisible === 'Edit-'+row.id">
        <div
            class="bg-blue-100 container gap-6 flex flex-col justify-self-center self-center justify-center items-center rounded-3xl text-2xl p-8 "
            v-if="!isLoading && !notLoaded">
          <p>Nazwa użytkownika</p>
          <div class="gap-6 flex">
            <input class="bg-gray-100 p-2 rounded-full text-center" type="text" v-model="row.username"
                   id="username" disabled>
            <button class="bg-blue-500 px-4 py-2 rounded-full" @click="user_panel = true">Zmień</button>
          </div>

          <div class="absolute bg-gray-100 p-6 rounded-2xl gap-6 flex flex-col" v-if="user_panel === true">
            <p class=" text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700" v-if="isError">
              {{ alertMessage }}</p>
            <input class="bg-white p-2 rounded-full text-center" v-model="newUsername" type="text"
                   placeholder="Nowa nazwa użytkownika" name="" id="username" required>
            <button @click="changeUsername(row.id)" type="submit" class="button">Zatwierdź</button>
            <button @click="user_panel = false" class="btn">Anuluj</button>

          </div>
          <p>Adres email</p>
          <div class="gap-6 flex">
            <input class="bg-gray-100 p-2 rounded-full text-center" v-model="row.email" type="email"
                   placeholder="mail" name="" id="email" disabled>
            <button class="bg-blue-500 px-4 py-2 rounded-full" @click="email_panel = true">Zmień</button>
          </div>
          <div class="absolute bg-gray-100 p-6 rounded-2xl gap-6 flex flex-col" v-if="email_panel === true">
            <p class=" text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700" v-if="isError">
              {{ alertMessage }}</p>
            <p>Obecny e-mail</p>
            <input class="bg-white p-2 rounded-full text-center" v-model="row.email" type="email">
            <input class="bg-white p-2 rounded-full text-center" v-model="email" type="email"
                   placeholder="Wpisz nowy email">
            <input class="bg-white p-2 rounded-full text-center" v-model="password" type="password"
                   placeholder="Wpisz hasło">
            <button @click="changeEmail(row.id)" type="submit" class="button">Zatwierdź</button>
            <button @click="email_panel = false" class="btn">Anuluj</button>

          </div>
          <p>Hasło</p>
          <div class="gap-6 flex">
            <input class="bg-gray-100 p-2 rounded-full text-center" value="12345678" type="password" id="password"
                   disabled>
            <button class="bg-blue-500 px-4 py-2 rounded-full" @click="password_panel = true">Zmień</button>
          </div>

          <div class="absolute bg-gray-100 p-6 rounded-2xl gap-6 flex flex-col" v-if="password_panel === true">
            <p class=" text-red-700 bg-red-200 px-8 py-4 rounded-xl border-2 border-red-700" v-if="isError">
              {{ alertMessage }}</p>
            <input class="bg-white p-2 rounded-full text-center" v-model="old_password" type="password"
                   placeholder="Wpisz stare hasło">
            <input class="bg-white p-2 rounded-full text-center" v-model="password" type="password"
                   placeholder="Wpisz nowe hasło">
            <input class="bg-white p-2 rounded-full text-center" v-model="r_password" type="password"
                   placeholder="Powtórz nowe hasło">
            <button @click="changePassword(row.id)">Zatwierdź</button>
            <button @click="password_panel = false">Anuluj</button>
          </div>
          <div>
            <button class="bg-blue-500 px-4 py-2 rounded-full" @click="isVisible = 0">Anuluj</button>
          </div>
        </div>
      </div>
      <div class="fixed right-1/3 top-1/4 bg-blue-100 p-8 rounded-3xl flex-col flex text-2xl gap-6"
           v-if="isVisible === 'Delete-'+row.id">
        <p>Czy chcesz usunąć użytkownika: {{ row.username }}</p>
        <div class="flex flex-row gap-6">
          <button class="py-2 px-4 bg-blue-500 rounded-full" @click="deleteUser(row.id)">Tak</button>
          <button class="py-2 px-4 bg-blue-500 rounded-full" @click="isVisible = 0">Anuluj</button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>