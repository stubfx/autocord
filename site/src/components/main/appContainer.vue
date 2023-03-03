<template>
<!--  <div class="flex w-full justify-center bg-discord-5 fixed top-0 left-0 z-[999999]"-->
<!--       v-if="page !== PAGES.MAIN_PAGE">-->
<!--    <h1 class="text-2xl font-bold text-discord-1 my-3">AUTOCORD.IO</h1>-->
<!--  </div>-->
  <div class="w-full mt-3 pt-8">
    <home-page v-if="page === PAGES.MAIN_PAGE" @on-page-change="onPageChange"></home-page>
    <dashboard-page @on-logout="onPageChange(PAGES.MAIN_PAGE)" v-if="page === PAGES.DASHBOARD_PAGE"></dashboard-page>
  </div>
</template>

<script>
import {PAGES} from "../../pages.js";
import GuildsSelector from "../guilds/guildsSelectionPage.vue";
import GuildDashboardView from "../dashboard/guildDashboardView.vue";
import DashboardPage from "../dashboard/dashboardPage.vue";
import Logout_rounded from "../../assets/logout_rounded.vue";
import {NetworkAdapter} from "../../network.js";
import HomePage from "../homePage/homePage.vue";
import LogoutButton from "../buttons/logoutButton.vue";

export default {
  name: "appContainer",
  components: {LogoutButton, HomePage, Logout_rounded, DashboardPage, GuildDashboardView, GuildsSelector},
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