<template>
  <app-button text="Cancel" class="bg-primary hover:bg-accent fill-accent text-accent">
    <cancel_rounded></cancel_rounded>
  </app-button>
</template>

<script>
import Close_rounded from "../../assets/close_rounded.vue";
import AppButton from "./appButton.vue";
import Cancel_rounded from "../../assets/cancel_rounded.vue";

export default {
  name: "cancelButton",
  components: {Cancel_rounded, AppButton, Close_rounded}
}
</script>

<style scoped>

</style>