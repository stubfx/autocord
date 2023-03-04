<template>
<!--  <app-button text="Support server" class="bg-primary hover:bg-accent fill-accent text-accent">-->
  <app-button>
    <icon_clyde></icon_clyde>
  </app-button>
</template>

<script>
import AppButton from "./appButton.vue";
import Icon_clyde from "../../assets/icon_clyde.vue";

export default {
  name: "supportServerButton",
  components: {Icon_clyde, AppButton}
}
</script>

<style scoped>

</style>