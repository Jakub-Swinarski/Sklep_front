<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <button @click="router.push('/login')">Logowanie</button>
  <button @click="router.push('/register')">Rejestrowanie</button>
</template>

<style scoped>
button{
  background-color: red;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 170px;
  font-size: medium;
  font-weight: bold;
  border-radius: 15px;

}
</style>