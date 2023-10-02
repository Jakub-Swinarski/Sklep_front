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
* {
  box-sizing: border-box
}

p{
  font-size: 40px;
}

h1 {
  text-align: center;
  color: #3c0aee;
  font-size: 70px;
}

input {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

button {
  background-color: #3c0aee;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;

}
</style>