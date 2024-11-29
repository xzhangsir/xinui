<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="newVal"
    placement="top-start"
    ref="eltooltip"
    :manual="show"
    :disabled="(newVal + '').length <= 5"
    v-model="show"
  >
    <el-input v-model="newVal" size="small" @focus="inputFocus">
      <span
        slot="suffix"
        :style="{ color: index == activeIndex ? '#409eff' : '#C0C4CC' }"
        >{{ label }}</span
      >
    </el-input>
  </el-tooltip>
</template>
<script>
export default {
  props: ['value', 'index', 'label', 'activeIndex'],
  data() {
    return {
      show: false
    }
  },
  computed: {
    newVal: {
      get() {
        this.changeTooltip()
        return this.value
      },
      set(val) {
        console.log('val', val)
        switch (this.index * 1) {
          case 0:
            break
          case 1:
            break
          case 2:
            break
          case 3:
            break
          case 4:
            break
          case 5:
            break
          case 6:
            break
        }
        this.$emit('input', val)
      }
    }
  },
  methods: {
    inputFocus() {
      this.$emit('focus', this.index * 1)
    },
    changeTooltip() {
      this.show =
        this.index === this.activeIndex && (this.value + '').length > 5
    }
  }
}
</script>
