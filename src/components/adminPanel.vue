<script setup>
import {ref} from "vue";
import AllUsers from "@/components/allUsers.vue";
import AllOrders from "@/components/allOrders.vue";
import AllProducts from "@/components/allProducts.vue";

const whichPanel = ref(0)
</script>

<template>
  <div class="main">
    <div class="menu-wrapper">
      <button class="btn" @click="whichPanel = 1">
        wszyscy użytkownicy
      </button>
      <button class="btn" @click="whichPanel = 2">
      wszystkie zamówienia
      </button>
      <button class="btn" @click="whichPanel = 3">
      wszystkie produkty
      </button>
      <button class="btn" @click="whichPanel = 4">
      aaa
      </button>
    </div>
    <div class="wrapper">
    <all-users v-if="whichPanel === 1"></all-users>
      <all-orders v-if="whichPanel === 2"></all-orders>
      <all-products v-if="whichPanel === 3"></all-products>
    </div>
  </div>
</template>

<style scoped>
.main{
  width: 1024px;
  display: flex;
  flex-direction: row;
  justify-content: center ;
align-items: center;
}
.menu-wrapper{
  width: 256px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrapper{
  width: 768px;

}
.btn{
  background-color: red;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 200px;
  font-size: medium;
  font-weight: bold;
  border-radius: 15px;


}
</style>