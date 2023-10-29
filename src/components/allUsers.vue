<script setup>
import UserStore from "@/store/UserStore";

  UserStore.GetAllUsers()
</script>

<template>
  {{UserStore.allUsers.value}}
  <div class="kafel" >
    <label class="name" for="username">Nazwa użytkownika</label>
    <label class="email" for="email">Email</label>
  </div>
</template>

<style scoped>

</style>