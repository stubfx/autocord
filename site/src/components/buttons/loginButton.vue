<template>
  <app-button text="Login" class="bg-primary hover:bg-accent fill-accent text-accent">
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