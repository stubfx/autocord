<template>
  <div class="fixed flex flex-row w-full backdrop-blur-lg bg-secondary/30 opacity-100 z-50 justify-center">
    <div class="flex flex-row gap p-4 container">
      <login-button @on-click="login"></login-button>
      <support-server-button @on-click="supportServer"></support-server-button>
    </div>
  </div>
</template>

<script>
import LoginButton from "../buttons/loginButton.vue";
import SupportServerButton from "../buttons/supportServerButton.vue";
import {NetworkAdapter} from "../../network.js";
import {discordPopup} from "../../../popup.js";

export default {
  name: "navbar",
  components: {SupportServerButton, LoginButton},
  methods: {
    async login() {
      let url = await NetworkAdapter.getDiscordLoginUrl()
      if (url) {
        await discordPopup(url)
        if (await NetworkAdapter.loginCheck()) {
          // this.$emit('onPageChange', PAGES.DASHBOARD_PAGE)
          this.$router.push('/dashboard')
        }
      }
    },
    supportServer() {
      window.open('https://discord.gg/zG7RMmZj6U', "_blank")
    }
  }
}
</script>

<style scoped>

</style>