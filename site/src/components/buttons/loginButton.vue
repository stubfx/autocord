<template>
  <app-button text="Login" class="bg-discord-2 hover:bg-discord-1 fill-white text-white">
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