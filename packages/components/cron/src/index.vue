<template>
  <div class="cron" @click="handleClickOutside">
    <div class="cron-header">
      <div class="cron-active" :style="computedStyle"></div>
      <cron-item
        v-model="sVal"
        :index="0"
        :activeIndex="activeIndex"
        label="秒"
        @focus="inputFocus"
        ref="second-item"
      />
      <cron-item
        v-model="mVal"
        :index="1"
        :activeIndex="activeIndex"
        label="分"
        @focus="inputFocus"
      />
      <cron-item
        v-model="hVal"
        :index="2"
        :activeIndex="activeIndex"
        label="时"
        @focus="inputFocus"
      />
      <cron-item
        v-model="dVal"
        :index="3"
        :activeIndex="activeIndex"
        label="日"
        @focus="inputFocus"
      />
      <cron-item
        v-model="monthVal"
        :index="4"
        :activeIndex="activeIndex"
        label="月"
        @focus="inputFocus"
      />
      <cron-item
        v-model="weekVal"
        :index="5"
        :activeIndex="activeIndex"
        label="周"
        @focus="inputFocus"
      />
      <cron-item
        v-model="yearVal"
        :index="6"
        :activeIndex="activeIndex"
        label="年"
        @focus="inputFocus"
      />
      <!-- <el-button icon="el-icon-copy-document" size="small"></el-button> -->
    </div>

    <div class="cron-popover" v-show="activeIndex !== -1" ref="cronPopover">
      <div>
        <second-and-minute
          v-model="sVal"
          lable="秒"
          v-show="activeIndex === 0"
        ></second-and-minute>
        <second-and-minute
          v-model="mVal"
          lable="分"
          v-show="activeIndex === 1"
        ></second-and-minute>
        <hour v-model="hVal" v-show="activeIndex === 2"></hour>
        <day v-model="dVal" v-show="activeIndex === 3"></day>
        <month v-model="monthVal" v-show="activeIndex === 4"></month>
        <week v-model="weekVal" v-show="activeIndex === 5"></week>
        <year v-model="yearVal" v-show="activeIndex === 6"></year>
      </div>
      <!-- cronStr -->
      <div class="cron-result" v-if="cronStr">
        <!-- <div v-for="(item, key) in recentRunWill" :key="key">{{ item }}</div> -->
        <CrontabResult :ex="cronStr"></CrontabResult>
      </div>
    </div>
  </div>
</template>

<script>
// import SecondAndMinute from '../assets/cron/secondAndMinute'
// import hour from '../assets/cron/hour'
// import day from '../assets/cron/day'
// import month from '../assets/cron/month'
// import week from '../assets/cron/week'
// import year from '../assets/cron/year'
import SecondAndMinute from './secondAndMinute'
import hour from './hour'
import day from './day'
import month from './month'
import week from './week'
import year from './year'

import CronItem from './cronitem.vue'
// import CronParser from 'cron-parser'
import CrontabResult from './result.vue'
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      sVal: '',
      mVal: '',
      hVal: '',
      dVal: '',
      monthVal: '',
      weekVal: '',
      yearVal: '',
      activeIndex: -1
    }
  },
  watch: {
    value() {
      this.updateVal()
    },
    dVal(n) {
      if (n !== '?' && this.activeIndex === 3) {
        this.weekVal = '?'
      }
    },
    weekVal(n) {
      if (n !== '?' && this.activeIndex === 5) {
        this.dVal = '?'
      }
    }
  },
  computed: {
    computedStyle() {
      if (this.activeIndex > -1) {
        return { transform: `translateX(${this.activeIndex * 80}px)` }
      } else {
        return { transform: 'scale(0)' }
      }
    },
    cronStr() {
      if (!this.dVal && !this.weekVal) {
        return ''
      }
      let v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`
      if (v !== this.value) {
        this.$emit('input', v)
      }
      return v
      // let interval = CronParser.parseExpression(v)
      // let list = []
      // for (let i = 0; i < 5; i++) {
      //   list.push(this.format(interval.next()))
      // }
      // return list
    }
  },
  created() {
    this.updateVal()
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  methods: {
    inputFocus(index) {
      this.activeIndex = index
    },
    updateVal() {
      if (!this.value) {
        return
      }
      let arrays = this.value.split(' ')
      this.sVal = arrays[0]
      this.mVal = arrays[1]
      this.hVal = arrays[2]
      this.dVal = arrays[3]
      this.monthVal = arrays[4]
      this.weekVal = arrays[5]
      this.yearVal = arrays[6]
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.activeIndex = -1
      }
    },
    format(date) {
      return (
        date.getFullYear() +
        '-' +
        this.complementZero(date.getMonth() + 1) +
        '-' +
        this.complementZero(date.getDate()) +
        ' ' +
        this.complementZero(date.getHours()) +
        ':' +
        this.complementZero(date.getMinutes()) +
        ':' +
        this.complementZero(date.getSeconds())
      )
    },
    complementZero(val) {
      if ((val + '').length < 2) {
        return '0' + val
      }
      return val
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  components: {
    SecondAndMinute,
    hour,
    day,
    month,
    week,
    year,
    CronItem,
    CrontabResult
  }
}
</script>

<style lang="css">
.cron {
  position: relative;
}
.cron-header {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 80px);
  line-height: 30px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.cron-active {
  position: absolute;
  height: 2px;
  width: 80px;
  left: 0;
  bottom: -2px;
  background-color: #409eff;
  transition: all 0.3s;
}
.cron-popover {
  position: absolute;
  top: 34px;
  left: 0px;
  background: #fff;
  width: 100%;
  z-index: 10;
  text-align: left;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  .cron-result {
    flex: 1;
    max-width: 160px;
    font-size: 14px;
  }
}
.cron-header .el-input__inner {
  border: none;
}
.cron-item-row {
  display: grid;
  grid-template-columns: 80px auto;
  column-gap: 16px;
  margin-bottom: 10px;
  .el-radio {
    margin-right: 0px;
  }
  > div {
    font-size: 12px;
  }
}
.cron-item-row-120 {
  grid-template-columns: 120px auto;
}
</style>
