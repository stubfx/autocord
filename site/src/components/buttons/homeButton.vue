<template>
  <app-button text="" class="bg-primary hover:bg-success fill-accent text-accent">
    <home_rounded></home_rounded>
  </app-button>
</template>

<script>
import AppButton from "./appButton.vue";
import Logout_rounded from "../../assets/logout_rounded.vue";
import Home_rounded from "../../assets/home_rounded.vue";

export default {
  name: "homeButton",
  components: {Home_rounded, Logout_rounded, AppButton}
}
</script>

<style scoped>

</style>