<template>
  <div class="flex flex-col w-full gap items-center">
    <div class="flex flex-col container gap">
      <simple-button @on-click="login" :text="'Login'" type="LOGIN"></simple-button>
      <h1 class="text-discord-1 text-9xl self-center">AUTOCORD.IO</h1>
      <div id="ciao" class="flex w-full h-full flex-col items-center justify-center text-white gap mt-10">
        <h1 class="text-6xl">This app is in <span class="text-discord-success">early access</span></h1>
        <h1 class="text-4xl">❤️</h1>
        <h1 class="text-4xl">Create cool automations!</h1>
        <guild-job :job="getSampleJob()" :is-sample="true"></guild-job>
        <guild-job :job="getSampleJob2()" :is-sample="true"></guild-job>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/je2mOH8_sWw" title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleButton from "../simpleButton.vue";
import {PAGES} from "../../pages.js";
import {NetworkAdapter} from "../../network.js";
import {openPopup} from "../../../popup.js";
import GuildJob from "../dashboard/guildJob.vue";
import {getSampleJob, getSampleJob2} from "../../sampleJob.js";

export default {
  name: "splashScreen",
  emits: ['onPageChange'],
  components: {GuildJob, SimpleButton},
  async mounted() {
    if (await NetworkAdapter.loginCheck()) {
      // redirect to selection
      this.$emit('onPageChange', PAGES.DASHBOARD_PAGE)
    }
  },
  methods: {
    getSampleJob2,
    getSampleJob,
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