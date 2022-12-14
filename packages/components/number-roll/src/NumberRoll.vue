<template>
  <div class ="flex">
    <div v-for = "(item,index) in numbers" :key = "index">
      <span>0123456789</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, ref, watch, watchEffect} from "vue"
type ns = {
  number :number | string
}
const props = defineProps<ns>()


const numbers = computed(()=>{
  return (props.number + "").split("")
})

</script>
<script lang='ts'>
 export default {
    name:"XNumberRoll"
 }
</script>
<style lang = 'scss'>
.flex{
  display: flex;
}
</style>