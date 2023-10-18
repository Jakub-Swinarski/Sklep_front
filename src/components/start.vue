<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <button @click="router.push('/login')">Logowanie</button>
  <button @click="router.push('/register')">Rejestrowanie</button>
</template>

<style scoped>

</style>