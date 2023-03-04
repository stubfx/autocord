<template>
  <div class="flex flex-col w-full gap items-center">
    <div class="flex flex-col container gap">
      <div class="flex flex-row gap">
        <login-button @on-click="login"></login-button>
        <support-server-button @on-click="supportServer"></support-server-button>
      </div>
      <h1 class="text-accent self-center text-4xl sm:text-5xl lg:text-9xl">AUTOCORD.IO</h1>
      <h1 class="text-accent text-2xl self-center mt-3">Discord automation made simple.</h1>
      <h1 class="text-accent text-2xl self-center mt-3">Currenly in {{ guildCount }} servers!</h1>
      <div class="flex w-full h-full flex-col items-center justify-center text-accent gap mt-10">
        <h1 class="text-6xl">This app is in <span class="text-success">early access</span></h1>
        <h1 @on-click="supportServer" class="text-1xl">If you have any question or need some help, please join our Support server!</h1>
        <h1 class="text-4xl">❤️</h1>
        <support-server-button @on-click="supportServer"></support-server-button>
        <div class="hidden flex-col md:flex items-center gap">
          <h1 class="text-4xl">Create cool automations!</h1>
          <guild-job :job="getSampleJob()" :is-sample="true"></guild-job>
          <guild-job :job="getSampleJob2()" :is-sample="true"></guild-job>
          <div class="flex flex-col w-full py-10 items-center">
            <h1 class="uppercase text-accent text-8xl">Try me!</h1>
            <h1 class="mt-5">You can do cooooler stuff after the login ❤️</h1>
          </div>
          <edit-job-view :is-sample="true"></edit-job-view>
          <h1 class="text-accent text-8xl mt-10">What are you waiting for?</h1>
          <h1 class="text-3xl">Join while in <span class="text-success">early access</span>
            and enjoy <span class="text-success">free</span> additional tokens for you flows!</h1>
          <login-button @on-click="login"
                        class="border-2 border-success hover:border-accent text-black mt-2"></login-button>
          <!--        <iframe width="560" height="315" src="https://www.youtube.com/embed/je2mOH8_sWw" title="YouTube video player"-->
          <!--                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"-->
          <!--                allowfullscreen></iframe>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {NetworkAdapter} from "../../network.js";
import {openPopup} from "../../../popup.js";
import GuildJob from "../dashboard/guildJob.vue";
import {getSampleJob, getSampleJob2} from "../../sampleJob.js";
import SupportServerButton from "../buttons/supportServerButton.vue";
import LoginButton from "../buttons/loginButton.vue";
import EditJobView from "../job/editJobView.vue";

export default {
  name: "homePage",
  emits: ['onPageChange'],
  components: {EditJobView, LoginButton, SupportServerButton, GuildJob},
  async mounted() {
    if (await NetworkAdapter.loginCheck()) {
      // redirect to selection
      // this.$emit('onPageChange', PAGES.DASHBOARD_PAGE)
      this.$router.push('/dashboard')
    } else {
      this.guildCount = await NetworkAdapter.getBotGuildCount()
    }
  },
  data() {
    return {
      guildCount: 0
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