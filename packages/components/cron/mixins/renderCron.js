export default {
  props: {
    value: {
      type: String,
      default: '*'
    },
    lable: {
      type: String
    }
  },
  data() {
    return {
      type: '1', // 类型
      cycle: {
        // 周期
        start: 0,
        end: 0
      },
      loop: {
        // 循环
        start: 0,
        end: 0
      },
      week: {
        // 指定周
        start: 0,
        end: 0
      },
      work: 0,
      last: 0,
      timer: null,
      appoint: [] // 指定
    }
  },
  computed: {
    value_() {
      let result = []
      switch (this.type) {
        case '1': // 每
          result.push('*')
          break
        case '2': // 周期
          result.push(`${this.cycle.start}-${this.cycle.end}`)
          break
        case '3': // 循环
          result.push(`${this.loop.start}/${this.loop.end}`)
          break
        case '4': // 指定
          result.push(this.appoint.join(','))
          break
        case '5': // 不指定
          result.push('?')
          break
        case '6': // 最后
          result.push(`${this.last === 0 ? '' : this.last}L`)
          break
        case '7': // 指定周
          result.push(`${this.week.start}#${this.week.end}`)
          break
        case '8': // 工作日
          result.push(`${this.work}W`)
          break
      }
      this.$emit('input', result.join(''))
      return result.join('')
    }
  },
  watch: {
    value() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.updateVal()
      }, 300)
    }
  },
  methods: {
    updateVal() {
      if (!this.value) {
        this.type = ''
        return
      }
      if (this.value === '?') {
        this.type = '5'
      } else if (this.value.indexOf('-') !== -1) {
        // 2周期
        if (this.value.split('-').length === 2) {
          this.type = '2'
          this.cycle.start = this.value.split('-')[0]
          this.cycle.end = this.value.split('-')[1]
        }
      } else if (this.value.indexOf('/') !== -1) {
        // 3循环
        if (this.value.split('/').length === 2) {
          this.type = '3'
          this.loop.start = this.value.split('/')[0]
          this.loop.end = this.value.split('/')[1]
        }
      } else if (this.value.indexOf('*') !== -1) {
        // 1每
        this.type = '1'
      } else if (this.value.indexOf('L') !== -1) {
        // 6最后
        this.type = '6'
        this.last = this.value.replace('L', '')
      } else if (this.value.indexOf('#') !== -1) {
        // 7指定周
        if (this.value.split('#').length === 2) {
          this.type = '7'
          this.week.start = this.value.split('#')[0]
          this.week.end = this.value.split('#')[1]
        }
      } else if (this.value.indexOf('W') !== -1) {
        // 8工作日
        this.type = '8'
        this.work = this.value.replace('W', '')
      } else {
        let temp = [
          ...new Set(
            this.value
              .split(',')
              .filter((_) => this.timeList.indexOf(_ * 1) !== -1)
          )
        ]

        if (temp.length > 0) {
          // *
          this.type = '4'
          this.appoint = temp
        } else {
          this.type = ''
          this.appoint = []
          this.$emit('input', '')
        }
      }
    }
  },
  created() {
    this.updateVal()
  }
}
