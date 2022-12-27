<template>
  <div class="numberRoller">
    <div v-for="(c, i) in showVal" class="rolleItem" :key="'rollerItem' + i">
      <template v-if="c != ','">
        <div class="cell1"></div>
        <!-- <div class="cell1"></div> -->
        <div class="number">{{ c }}</div>
      </template>
      <template v-else-if="isSeparatorWithBg">
        <div class="cell1"></div>
        <!-- <div class="cell1"></div> -->
        <div class="number">{{ c }}</div>
      </template>
      <template v-else>
        <div class="cell2"></div>
        <div class="number">{{ c }}</div>
      </template>
    </div>
    <div class="unit"><span>人</span></div>
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

@mixin px2vw($name, $px) {
  #{$name}: $px / $wWidth * 100vw;
}
@mixin px2vh($name, $px) {
  #{$name}: $px / $wHeight * 100vh;
}

// .pos_absolute() {
//   position: absolute;
// }

.numberRoller {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  .rolleItem {
    position: relative;
    @include px2vw(margin-right, 4);
    @include px2vw(margin-left, 4);
    .cell1 {
      @include px2vw(width, 50);
      @include px2vh(margin-bottom, 4);
      @include px2vh(height, 90);
    }
    .number {
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      @include px2vh(font-size, 52);
      font-weight: bold;
    }
    .cell2 {
      @include px2vw(width, 50);
      @include px2vh(margin-bottom, 4);
      @include px2vh(height, 90);
    }

    // .bg1 {
    //   background: -webkit-linear-gradient(
    //     #0119a7,
    //     #0096ff
    //   ); /* Safari 5.1 - 6.0 */
    //   background: -o-linear-gradient(#0119a7, #0096ff); /* Opera 11.1 - 12.0 */
    //   background: -moz-linear-gradient(#0119a7, #0096ff); /* Firefox 3.6 - 15 */
    //   background: linear-gradient(#0119a7, #0096ff); /* 标准的语法 */
    // }
    // .bg2 {
    //   background: -webkit-linear-gradient(
    //     #0096ff,
    //     #0119a7
    //   ); /* Safari 5.1 - 6.0 */
    //   background: -o-linear-gradient(#0096ff, #0119a7); /* Opera 11.1 - 12.0 */
    //   background: -moz-linear-gradient(#0096ff, #0119a7); /* Firefox 3.6 - 15 */
    //   background: linear-gradient(#0096ff, #0119a7); /* 标准的语法 */
    // }
  }
  .unit {
    @include px2vw(width, 20);
    @include px2vh(margin-bottom, 4);
    @include px2vw(margin-left, 10);
    @include px2vh(height, 90);
    span {
      @include px2vh(margin-top, 50);
      display: inline-block;
    }
  }
}
</style>
