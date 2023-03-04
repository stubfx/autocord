<template>
  <app-button>
    <refresh_rounded></refresh_rounded>
  </app-button>
</template>

<script>
import AppButton from "./appButton.vue";
import List_alt_rounded from "../../assets/list_alt_rounded.vue";
import Refresh_rounded from "../../assets/refresh_rounded.vue";

export default {
  name: "refreshButton",
  components: {Refresh_rounded, List_alt_rounded, AppButton}
}
</script>

<style scoped>

</style>