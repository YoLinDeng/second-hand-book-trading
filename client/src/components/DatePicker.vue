<template>
  <div class="date-picker-box">
    <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @change="change"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "date-picker",
  data() {
    return {
      show: true,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(1990, 0, 1)
    };
  },
  methods: {
    confirm(d) {
      const checkDate =   d.getFullYear() + '年' + (Number(d.getMonth()) + 1) + '月' + d.getDate() + '日 '
      this.$emit("confirm", checkDate);
    },
    cancel() {
      this.$emit("hide");
    },
    change() {
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`
      }
      return value;
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
