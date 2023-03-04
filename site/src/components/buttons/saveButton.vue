<template>
  <app-button text="Save" class="bg-primary hover:bg-success fill-accent text-accent">
    <save_rounded></save_rounded>
  </app-button>
</template>


<script>
import AppButton from "./appButton.vue";
import Save_rounded from "../../assets/save_rounded.vue";

export default {
  name: "saveButton",
  components: {Save_rounded, AppButton}
}
</script>

<style scoped>

</style>