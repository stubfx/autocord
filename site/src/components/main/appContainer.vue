<template>
  <div class="flex w-full justify-center bg-discord-5 fixed top-0 left-0 z-[999999]"
       v-if="page !== PAGES.MAIN_PAGE">
    <h1 class="text-2xl font-bold text-discord-1 my-3">AUTOCORD.IO</h1>
  </div>
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

export default {
  name: "appContainer",
  components: {SplashScreen, DashboardPage, GuildDashboardView, GuildsSelector},
  data() {
    return {
      page: PAGES.MAIN_PAGE,
      PAGES: PAGES
    }
  },
  methods: {
    onPageChange(page) {
      this.page = page
    }
  }
}
</script>

<style scoped>

</style>