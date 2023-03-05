<template>
  <hero-button text="Add me to your server!">
    <icon_clyde class="w-[200px] h-[200px]"></icon_clyde>
  </hero-button>
</template>

<script>
import AppButton from "./appButton.vue";
import Login_rounded from "../../assets/login_rounded.vue";
import HeroButton from "./heroButton.vue";
import Icon_clyde from "../../assets/icon_clyde.vue";

export default {
  name: "loginWithDiscordButton",
  components: {Icon_clyde, HeroButton, Login_rounded, AppButton}
}
</script>

<style scoped>

</style>