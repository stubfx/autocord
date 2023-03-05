<template>
  <div class="fixed flex flex-row w-full backdrop-blur-lg bg-primary/30 opacity-100 z-50">
    <div class="flex flex-row gap p-4">
      <login-button @on-click="login"></login-button>
      <support-server-button @on-click="supportServer"></support-server-button>
    </div>
  </div>
</template>

<script>
import LoginButton from "../buttons/loginButton.vue";
import SupportServerButton from "../buttons/supportServerButton.vue";
import {NetworkAdapter} from "../../network.js";
import {openPopup} from "../../../popup.js";

export default {
  name: "navbar",
  components: {SupportServerButton, LoginButton},
  methods: {
    async login() {
      let url = await NetworkAdapter.getDiscordLoginUrl()
      if (url) {
        await openPopup(url)
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