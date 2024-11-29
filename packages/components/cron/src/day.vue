<template>
  <div :val="value_">
    <el-radio-group v-model="type" size="small">
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="1">每日[*]</el-radio-button>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="5">不指定[?]</el-radio-button>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="2">周期[-]</el-radio-button>
        <div>
          <span style="margin-left: 10px; margin-right: 5px;">从</span>
          <el-input
            @change="type = '2'"
            v-model="cycle.start"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          <span style="margin-left: 5px; margin-right: 5px;">至</span>
          <el-input
            @change="type = '2'"
            v-model="cycle.end"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          日
        </div>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="3">循环[/]</el-radio-button>
        <div>
          <span style="margin-left: 10px; margin-right: 5px;">从</span>
          <el-input
            @change="type = '3'"
            v-model="loop.start"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          <span style="margin-left: 5px; margin-right: 5px;">日开始，每</span>
          <el-input
            @change="type = '3'"
            v-model="loop.end"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          日执行一次
        </div>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="8">工作日[W]</el-radio-button>
        <div>
          <span style="margin-left: 10px; margin-right: 5px;">每月</span>
          <el-input
            @change="type = '8'"
            v-model="work"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          号，最近的工作日
        </div>
      </div>
      <div class="cron-item-row cron-item-row-120">
        <el-radio-button label="6">每月最后一天[L]</el-radio-button>
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
      timeList: Array.from({ length: 31 }, (_, i) => i + 1)
    }
  }
}
</script>

<style lang="css">
.el-checkbox + .el-checkbox {
  margin-left: 10px;
}
</style>
