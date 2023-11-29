<script setup>
import {vMaska} from "maska"
const options = {
  preProcess: val => val.replace('3','5'),
}
</script>

<template>
  <input
      v-maska:[options]
      data-maska="0.99"
      data-maska-tokens="0:\d:multiple|9:\d:optional"
      placeholder="importedOptions"
  />
</template>

<style scoped>

</style>