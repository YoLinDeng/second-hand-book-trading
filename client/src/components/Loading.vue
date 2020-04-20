<template>
  <div class="loading">
    <img :src="require('@/assets/images/loading.gif')" alt />
  </div>
</template>
 
<script>
export default {
  name: "loading",
  data() {
    return {};
  }
};
</script>
<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 121;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.loading img {
  width: 0.75rem;
  height: 0.75rem;
  margin: 7.5rem auto;
}
</style>