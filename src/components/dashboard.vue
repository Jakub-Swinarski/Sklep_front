<script setup>
import AuthStore from '@/store/AuthStore'
</script>

<template>
  <h1>Witaj, {{ AuthStore.username.value}}</h1>
  <p class="alert">123</p>
  <input type="text" placeholder="Wpisz stare hasło" name="" id="passwprd" required>
  <input type="text" placeholder="Wpisz nowe hasło" name="" id="newpassword" required>
  <input type="text" placeholder="Powtórz nowe hasło" name="" id="newpassword" required>
  <button type="submit" class="button">Zatwierdź</button>
</template>

<style scoped>
* {box-sizing: border-box}
.container {
  padding: 16px;
}
h1{
  text-align: left;
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
p{
  color: red;
  font-size: 30px;
}
</style>