<template>
  <div class="edit-page">
    <app-header :title="title" :rightText="rightText" @clickRightBtn="save"></app-header>
    <edit :placeholder="placeholder" :value="value" :desc="desc" @change="change"></edit>
  </div>
</template>

<script>
import Edit from "@/components/Edit";
import AppHeader from "@/components/AppHeader";
import { mapState } from 'vuex';
export default {
  name: "edit-page",
  data() {
    return {
      title: "",
      placeholder: "",
      value: "",
      rightText: "保存",
      desc: "",
      key: ''
    };
  },
  mounted() {
    this.title = this.$route.params.title;
    this.placeholder = this.$route.params.placeholder;
    this.value = this.$route.params.value;
    this.desc = this.$route.params.desc
    this.key = this.$route.params.key
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    })
  },
  components: {
    Edit,
    AppHeader
  },
  methods: {
    save() {
      let params = { phone: this.info.phone }
      switch (this.key) {
        case 'name':
          params.name = this.value
          break
        case 'address':
          params.address = this.value
          break
        case 'school':
          params.school = this.value
          break
        case 'sign':
          params.sign = this.value
          break
      }
      this.API.updateUserInfo(params).then(res => {
          if (res.success) {
            this.$router.go(-1)
          }
        })
    },
    change(val) {
      this.value = val
    }
  }
};
</script>

<style></style>
