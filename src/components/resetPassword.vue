<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import UserStore from "@/store/UserStore";

const route = useRoute();
const router = useRouter();
const email = atob(route.params.email);
const token = route.params.token;
const password = ref()
const r_password = ref()
const alertMessage = ref()
const editPassword = () => {
  if (password.value === r_password.value && password.value !== undefined) {
    UserStore.ResetPasswordEmailSendNewPassword(email, token, password.value)
        .then(()=>{
          router.push('/login')
        }).catch((error)=>{
          alertMessage.value = error.response.data.message;
    })
  }
  else {
    alertMessage.value = "Hasła się nie zgadzają"
  }
}

</script>

<template>
  <p>{{ alertMessage }}</p>
  <p>Nowe hasło</p>
  <input v-model="password" type="password" name="password" id="password">
  <p>Powtórz nowe hasło</p>
  <input v-model="r_password" type="password" name="r_password" id="r_password">
  <button @click="editPassword">Zapisz</button>
</template>

<style scoped>

</style>