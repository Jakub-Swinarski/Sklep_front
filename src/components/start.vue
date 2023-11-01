<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div>
    <button class="bg-blue-500 px-4 py-2 rounded-full" @click="router.push('/login')">Logowanie</button>
    <button class="bg-blue-500 px-4 py-2 rounded-full" @click="router.push('/register')">Rejestrowanie</button>
  </div>

</template>

<style scoped>

</style>