<template>
  <div id="app">
    <loading v-show="loading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import { mapGetters } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  components: {
    Loading
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/reset.scss";
</style>
