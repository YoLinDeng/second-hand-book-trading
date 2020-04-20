<template>
  <div class="edit">
    <van-cell-group>
      <van-field :value="value" :placeholder="placeholder" clickable @input="change"/>
    </van-cell-group>
    <span class="desc">{{ desc }}</span>
  </div>
</template>

<script>
import Vue from "vue";
import { Field } from "vant";

Vue.use(Field);
export default {
  name: "edit",
  props: ["placeholder", "value", "desc"],
  data() {
    return {
    };
  },
  components: {},
  methods: {
    change(val) {
      this.$emit('change', val)
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  width: 750px;
  margin: 0 auto;
  .van-cell {
  height: 80px;
  line-height: 80px;
  box-sizing: border-box;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 26px;
  border-bottom: 0.01rem solid #eee; 
}
.desc {
  display: inline-block;
  font-size: 24px;
  color: #666;
  margin-top: 10px;
  margin-left: 10px;
}
}
</style>
