<template>
  <div class="flex w-full justify-center bg-discord-5 fixed top-0 left-0 z-[999999]"
       v-if="page !== PAGES.MAIN_PAGE">
    <h1 class="text-2xl font-bold text-discord-1 my-3">AUTOCORD.IO</h1>
  </div>
  <simple-button @on-click="logout" :text="'Logout'" type="LOGOUT" class="ml-20 mt-20"
                 v-if="page === PAGES.DASHBOARD_PAGE"></simple-button>
  <div class="w-full min-h-full mt-3 py-20">
    <splash-screen v-if="page === PAGES.MAIN_PAGE" @on-page-change="onPageChange"></splash-screen>
    <dashboard-page v-if="page === PAGES.DASHBOARD_PAGE"></dashboard-page>
  </div>
</template>

<script>
import {PAGES} from "../../pages.js";
import GuildsSelector from "../guilds/guildsSelector.vue";
import GuildDashboardView from "../dashboard/guildDashboardView.vue";
import DashboardPage from "./dashboardPage.vue";
import SplashScreen from "../splashScreen/splashScreen.vue";
import Logout_rounded from "../../assets/logout_rounded.vue";
import {NetworkAdapter} from "../../network.js";
import SimpleButton from "../simpleButton.vue";

export default {
  name: "appContainer",
  components: {SimpleButton, Logout_rounded, SplashScreen, DashboardPage, GuildDashboardView, GuildsSelector},
  data() {
    return {
      page: PAGES.MAIN_PAGE,
      PAGES: PAGES
    }
  },
  methods: {
    onPageChange(page) {
      this.page = page
    },
    async logout() {
      await NetworkAdapter.logout()
      this.page = PAGES.MAIN_PAGE
    }
  }
}
</script>

<style scoped>

</style>