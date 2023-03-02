<template>
  <app-button text="" class="bg-discord-2 hover:bg-discord-error fill-white text-white">
    <logout_rounded></logout_rounded>
  </app-button>
</template>

<script>
import AppButton from "./appButton.vue";
import Logout_rounded from "../../assets/logout_rounded.vue";

export default {
  name: "logoutButton",
  components: {Logout_rounded, AppButton}
}
</script>

<style scoped>

</style>