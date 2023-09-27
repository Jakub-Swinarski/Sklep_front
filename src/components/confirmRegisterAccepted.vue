<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <h1>Potwierdzenie mailem udane</h1>
  <div class="container signIn">
    <p @click="router.push('/login')"> Powrót do logowania</p>
  </div>
</template>

<style scoped>

</style>