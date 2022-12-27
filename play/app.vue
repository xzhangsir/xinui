<template>
  <XIcon color="red" size="26" class="x-icon-bianji" />
  <XNumberRoll :number="number" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const number = ref(123)

setInterval(() => {
  number.value += 123
}, 1000)
</script>
