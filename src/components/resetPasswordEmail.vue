<script setup>

</script>

<template>
  <h1>Zresetuj hasło</h1>
  <input type="text" placeholder="Wpisz adres Email" name="email" id="email" required>
  <button type="submit" class="button">Wyślij</button>
  </template>

<style scoped>
* {box-sizing: border-box}
.container {
  padding: 16px;
}
h1{
  text-align: center;
  color: #3c0aee;
  font-size: 70px;
}
input{
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
button{
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