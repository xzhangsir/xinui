<template>
  <div class="numroll">
    <ul>
      <li v-for="(item, index) in newNum" :key="index">
        <span v-if="item === ','">,</span>
        <span v-else> <i ref="numberItem">0123456789</i></span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch, watchEffect } from 'vue'
type ns = {
  number: number | string
  length: number | string
}
const props = defineProps<ns>()

const tempNum = computed(() => {
  return ('000000000' + props.number).slice(-props.length)
})
const newNum = computed(() => {
  return tempNum.value.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
})
watch(
  () => newNum.value,
  () => {
    setNumberTransform()
  }
)
const numberItem = ref(null)
const setNumberTransform = function () {
  for (let index = 0; index < tempNum.value.length; index++) {
    var elem = numberItem.value[index]
    elem.style.transform = `translate(0, -${
      Number(tempNum.value[index]) * 10
    }%)`
  }
}
</script>
<script lang="ts">
export default {
  name: 'XNumberRoll'
}
</script>
<style lang="scss">
$wWidth: 1920;
$wHeight: 1080;

@mixin vw($name, $px) {
  #{$name}: $px / $wWidth * 100vw;
}
@mixin vh($name, $px) {
  #{$name}: $px / $wHeight * 100vh;
}

.numroll {
  ul {
    width: 100%;
    display: flex;
    justify-content: sapce-between;
    & > li:nth-child(4n) {
      background: #0000;
    }
    li {
      color: #f00;
      font-size: 68px;
      @include vh(height, 100);
      @include vw(margin-left, 10);
      @include vw(margin-right, 10);
      text-align: center;
      list-style: none;
      overflow: hidden;
      background: #000;
      span {
        width: 100%;
        display: inline-block;
      }
      i {
        width: 100%;
        display: inline-block;
        text-align: center;
        writing-mode: vertical-lr;
        text-orientation: upright;
        transform: translate(0, 0);
        transition: transform 1s ease-in-out;
      }
    }
  }
}
</style>
