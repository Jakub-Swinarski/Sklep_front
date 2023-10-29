<script setup>
import UserStore from "@/store/UserStore";

  UserStore.GetAllUsers()
</script>

<template>
   <div class="main">
     <div class="kafel" v-for="(row,row_index) of UserStore.allUsers.value" :key = "row_index">
      <p class="name">{{row.username}}</p>
      <p class="email">{{row.email}}</p>
    </div>
   </div>
</template>

<style scoped>
.main{
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4,25%);

}

</style>