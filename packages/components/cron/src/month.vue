<template>
  <div :val="value_">
    <el-radio-group v-model="type" size="small">
      <div class="cron-item-row">
        <el-radio-button label="1">每月[*]</el-radio-button>
      </div>
      <div class="cron-item-row">
        <el-radio-button label="2">周期[-]</el-radio-button>
        <div>
          <span style="margin-right: 5px;">从</span>
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
          月
        </div>
      </div>
      <div class="cron-item-row">
        <el-radio-button label="3">循环[/]</el-radio-button>
        <div>
          <span style="margin-right: 5px;">从</span>
          <el-input
            @change="type = '3'"
            v-model="loop.start"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          <span style="margin-left: 5px; margin-right: 5px;">月开始，每</span>
          <el-input
            @change="type = '3'"
            v-model="loop.end"
            size="mini"
            style="width: 100px;"
            type="number"
          ></el-input>
          月执行一次
        </div>
      </div>
      <div class="cron-item-row">
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
      timeList: Array.from({ length: 12 }, (_, i) => i + 1)
    }
  }
}
</script>

<style lang="css">
.el-checkbox + .el-checkbox {
  margin-left: 10px;
}
</style>
