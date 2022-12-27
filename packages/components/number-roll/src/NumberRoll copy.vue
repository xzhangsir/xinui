<template>
  <div class="flex">
    <div class="number-item" v-for="(item, index) in numbers" :key="index">
      <span :style="{bottom:item as any * 40 + 'px'}">0123456789</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, watch, watchEffect } from 'vue'
type ns = {
  number: number | string
}
const props = defineProps<ns>()

const numbers = computed(() => {
  return (props.number + '').split('')
})
</script>
<script lang="ts">
export default {
  name: 'XNumberRoll'
}
</script>
<style lang="scss">
.flex {
  display: flex;
}
.number-item {
  width: 40px;
  height: 60px;
  background: #ccc;
  position: relative;
  margin-left: 20px;
  & span {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    bottom: 0;
    left: 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
    display: flex;
    align-items: center;
    font-size: 20px;
    letter-spacing: 20px;
    transform: translate(0, 50%);
    transition: bottom 0.3s ease-in-out;
  }
}
</style>
