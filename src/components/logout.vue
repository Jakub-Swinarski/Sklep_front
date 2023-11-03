<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="container gap-6 flex flex-col justify-self-center self-center justify-center items-center  text-2xl py-8 ">
    <p class="text-3xl">Wylogowano!</p>
    <p class="text-blue-500" @click="router.push('/login')">Powrót do strony głównej</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 100px;
}
</style>