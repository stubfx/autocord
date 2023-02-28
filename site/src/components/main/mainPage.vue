<template>
  <div id="ciao" class="flex w-full h-full flex-col items-center justify-center text-white">
    <h1 class="text-6xl">This app is in <span class="text-discord-success">early access</span></h1>
    <h1 class="m-2">Use at your own risk.</h1>
    <div class="ml-2 hover:scale-[4] duration-1000 transition-transform cursor-pointer w-fit text-9xl">🥰</div>
    <simple-button @on-click="login" :text="'Login'" class="mt-4"  type="LOGIN"></simple-button>
  </div>
</template>

<script>
import SimpleButton from "../simpleButton.vue";
import {PAGES} from "../../pages.js";
import {NetworkAdapter} from "../../network.js";
import {openPopup} from "../../../popup.js";

export default {
  name: "mainPage",
  emits: ['onPageChange'],
  components: {SimpleButton},
  async mounted() {
    if (await NetworkAdapter.loginCheck()) {
      // redirect to selection
      this.$emit('onPageChange', PAGES.DASHBOARD_PAGE)
    }
  },
  methods: {
    async login() {
      let url = await NetworkAdapter.getDiscordLoginUrl()
      if (url) {
        await openPopup(url)
        if (await NetworkAdapter.loginCheck()) {
          this.$emit('onPageChange', PAGES.DASHBOARD_PAGE)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>