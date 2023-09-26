<script setup>

</script>

<template>
  <div class="container">
    <h1>Zarejestruj się</h1>
    <p>Wypełnij formularz w celu utworzenia konta.</p>
    <hr>

    <label class="bold" for="email">Email</label>
    <input type="text" placeholder="Wpisz adres Email" name="email" id="email" required>

    <label class="bold" for="psw">Hasło</label>
    <input type="password" placeholder="Wpisz hasło" name="psw" id="psw" required>

    <label class="bold" for="psw-repeat">Powtórz hasło</label>
    <input type="password" placeholder="Wpisz hasło" name="psw-repeat" id="psw-repeat" required>
    <hr>

    <p>Tworząc konto zgadasz się na nasz regulamin dostępny tu: <a href="rules.html">Zasady tworzenia konta</a>.</p>
    <button type="submit" class="registerBtn">Zarejestruj się!</button>
  </div>

  <div class="container signIn">
    <p>Masz już konto? <a href="login.html">Zaloguj się</a>.</p>
  </div>
</template>

<style scoped>
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.registerBtn {
  background-color: #3c0aee;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerBtn:hover {
  opacity:1;
}

a {
  color: dodgerblue;
}
p{
  font-size: 25px;
}
h1{
  
}
</style>