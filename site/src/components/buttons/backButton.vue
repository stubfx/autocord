<template>
  <app-button text="" class="bg-discord-2 hover:bg-discord-success fill-white text-white">
    <back_rounded></back_rounded>
  </app-button>
</template>

<script>
import AppButton from "./appButton.vue";
import List_alt_rounded from "../../assets/list_alt_rounded.vue";
import Refresh_rounded from "../../assets/refresh_rounded.vue";
import Back_rounded from "../../assets/back_rounded.vue";

export default {
  name: "backButton",
  components: {Back_rounded, Refresh_rounded, List_alt_rounded, AppButton}
}
</script>

<style scoped>

</style>