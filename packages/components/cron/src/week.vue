<template>
  <div :val="value_">
    <el-radio-group v-model="type" size="small">
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="1">每周[*]</el-radio-button>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="5">不指定[?]</el-radio-button>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="2">周期[-]</el-radio-button>
        <div>
          <span style="margin-right: 5px;">从星期</span>
          <el-input
            @change="type = '2'"
            v-model="cycle.start"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          <span style="margin-left: 5px; margin-right: 5px;">至星期</span>
          <el-input
            @change="type = '2'"
            v-model="cycle.end"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
        </div>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="7">指定周[#]</el-radio-button>
        <div>
          <span style="margin-right: 5px;">本月第</span>
          <el-input
            @change="type = '7'"
            v-model="week.start"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          <span style="margin-left: 5px; margin-right: 5px;">周，星期</span>
          <el-input
            @change="type = '7'"
            v-model="week.end"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
        </div>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="6">本月最后一个[L]</el-radio-button>
        <div>
          <span style="margin-right: 5px;">星期</span>
          <el-input
            @change="type = '6'"
            v-model="last"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
        </div>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="4">指定[,]</el-radio-button>
        <div>
          <el-select
            @change="type = '4'"
            clearable
            v-model="appoint"
            placeholder="可多选"
            multiple
            collapse-tags
            size="mini"
          >
            <el-option
              v-for="item in timeList"
              :key="item"
              :value="item + ''"
              >{{ item }}</el-option
            >
          </el-select>
        </div>
      </div>
    </el-radio-group>
  </div>
</template>

<script>
import renderCron from '../mixins/renderCron'
export default {
  mixins: [renderCron],
  data() {
    return {
      type: '5',
      timeList: Array.from({ length: 7 }, (_, i) => i + 1)
    }
  }
}
</script>

<style lang="css">
.el-checkbox + .el-checkbox {
  margin-left: 10px;
}
</style>
