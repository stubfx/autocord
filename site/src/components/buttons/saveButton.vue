<template>
  <app-button text="Save" class="bg-discord-2 hover:bg-discord-success fill-white text-white">
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