<template>
  <app-button text="Delete" class="bg-primary hover:bg-error fill-accent text-accent">
    <close_rounded></close_rounded>
  </app-button>
</template>

<script>
import Close_rounded from "../../assets/close_rounded.vue";
import AppButton from "./appButton.vue";

export default {
  name: "deleteButton",
  components: {AppButton, Close_rounded}
}
</script>

<style scoped>

</style>