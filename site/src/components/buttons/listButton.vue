<template>
  <app-button text="" class="bg-primary hover:bg-success fill-accent text-accent">
    <list_alt_rounded></list_alt_rounded>
  </app-button>
</template>

<script>
import AppButton from "./appButton.vue";
import List_alt_rounded from "../../assets/list_alt_rounded.vue";

export default {
  name: "listButton",
  components: {List_alt_rounded, AppButton}
}
</script>

<style scoped>

</style>