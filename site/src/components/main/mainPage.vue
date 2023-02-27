<template>
  <div id="ciao" class="flex w-full h-full flex-row items-center justify-center">
    <simple-button @on-click="login" :text="'Login'"></simple-button>
  </div>
</template>

<script>
import SimpleButton from "../simpleButton.vue";
import {PAGES} from "../../pages.js";
import {NetworkAdapter} from "../../network.js";

export default {
  name: "mainPage",
  emits: ['onPageChange'],
  components: {SimpleButton},
  async mounted() {
    if (await NetworkAdapter.loginCheck()) {
      // redirect to selection
      this.$emit('onPageChange',PAGES.GUILD_SELECTION)
    }
  },
  methods: {
    async login() {
      let url = await NetworkAdapter.getDiscordLoginUrl()
      if (url) {
        let params = `,status=no,location=no,toolbar=no,menubar=no,width=500,height=900,left=-1000,top=-1000`;
        let loginPopup = open(url, PAGES.LOGIN_POPUP, params);
        let intId = setInterval(async () => {
          try{
            if (loginPopup.closed || loginPopup.location.pathname.includes('close')) {
              if (!loginPopup.closed) {
                loginPopup.close()
              }
              clearInterval(intId)
              if (await NetworkAdapter.loginCheck()) {
                this.$emit('onPageChange',PAGES.GUILD_SELECTION)
              }
            }
          } catch (e) {
            // ok, do nothing
          }
        }, 200)
      }
    }
  }
}
</script>

<style scoped>

</style>