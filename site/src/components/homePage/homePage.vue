<template>
  <navbar></navbar>
  <div class="flex flex-col w-full gap items-center">
    <div class="flex flex-col gap mt-52 w-full">
      <h1 class="text-accent self-center text-4xl sm:text-5xl lg:text-9xl font-discord-medium">AUTOCORD</h1>
      <h1 class="text-accent text-2xl self-center mt-3">Discord automation made simple.</h1>
      <h1 class="text-accent text-2xl self-center mt-3">Currenly in {{ guildCount }} servers!</h1>
      <div class="flex w-full h-full flex-col items-center justify-center text-accent gap-4 mt-10">
        <h1 class="text-6xl">This app is in <span class="text-success">early access</span></h1>
        <h1 @on-click="supportServer" class="text-1xl">If you have any question or need some help, please join our
          Support server!</h1>
        <h1 class="text-4xl">❤️</h1>
        <support-server-button @on-click="supportServer" class="p-2"></support-server-button>
        <div class="flex flex-col w-8/12 gap-16">
          <div class="flex flex-row justify-around mt-10 gap-10 items-center">
            <div class="flex flex-col gap">
              <h1 class="text-5xl">Assign a role when <br>any user sends a message!</h1>
              <p class="text-xl" v-pre>
                <span class="text-success">When a user sends a message&nbsp;</span>
                send a message back saying "Welcome <span class="text-success">{{ username }}!</span>", <br>then if the
                user
                sent "Hello!" (<span class="text-success">{{ messageContent }}</span> == "Hello!") assign him a role!
              </p>
            </div>
            <guild-job :job="getSampleJob()" :is-sample="true" :expanded="true"></guild-job>
          </div>
          <div class="flex flex-row-reverse justify-around mt-10 gap-10 items-center">
            <div class="flex flex-col gap">
              <h1 class="text-5xl">Assign a role when <br>any user sends a message!</h1>
              <p class="text-xl" v-pre>
                <span class="text-success">When a user sends a message&nbsp;</span>
                send a message back saying "Welcome <span class="text-success">{{ username }}!</span>", <br>then if the
                user
                sent "Hello!" (<span class="text-success">{{ messageContent }}</span> == "Hello!") assign him a role!
              </p>
            </div>
            <guild-job :job="getSampleJob2()" :is-sample="true" :expanded="true"></guild-job>
          </div>
        </div>
        <!--        <div class="hidden flex-col md:flex items-center gap">-->
        <!--          <h1 class="text-4xl">Create cool automations!</h1>-->
        <!--          <div class="flex flex-row gap">-->
        <!--            <guild-job :job="getSampleJob()" :is-sample="true" :expanded="true"></guild-job>-->
        <!--            <guild-job :job="getSampleJob2()" :is-sample="true" :expanded="true"></guild-job>-->
        <!--          </div>-->
        <!--          <div class="flex flex-col w-full py-10 items-center">-->
        <!--            <h1 class="uppercase text-accent text-8xl">Try me!</h1>-->
        <!--            <h1 class="mt-5">You can do cooooler stuff after the login ❤️</h1>-->
        <!--          </div>-->
        <!--          <edit-job-view :is-sample="true" :expanded="true"></edit-job-view>-->
        <!--          <h1 class="text-accent text-8xl mt-10">What are you waiting for?</h1>-->
        <!--          <h1 class="text-3xl">Join while in <span class="text-success">early access</span>-->
        <!--            and enjoy <span class="text-success">free</span> additional tokens for you flows!</h1>-->
        <!--          <login-button @on-click="login"-->
        <!--                        class="border-2 border-success hover:border-accent text-black mt-2"></login-button>-->
        <!--          &lt;!&ndash;        <iframe width="560" height="315" src="https://www.youtube.com/embed/je2mOH8_sWw" title="YouTube video player"&ndash;&gt;-->
        <!--          &lt;!&ndash;                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"&ndash;&gt;-->
        <!--          &lt;!&ndash;                allowfullscreen></iframe>&ndash;&gt;-->
        <!--        </div>-->
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
import Navbar from "./navbar.vue";

export default {
  name: "homePage",
  emits: ['onPageChange'],
  components: {Navbar, EditJobView, LoginButton, SupportServerButton, GuildJob},
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