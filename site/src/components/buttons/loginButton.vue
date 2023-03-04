<template>
  <app-button>
    <login_rounded></login_rounded>
  </app-button>
</template>

<script>
import AppButton from "./appButton.vue";
import Login_rounded from "../../assets/login_rounded.vue";

export default {
  name: "loginButton",
  components: {Login_rounded, AppButton}
}
</script>

<style scoped>

</style>