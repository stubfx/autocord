<template>
  <main-page v-if="page === PAGES.MAIN_PAGE" @on-page-change="onPageChange"></main-page>
  <dashboard-page v-if="page === PAGES.DASHBOARD_PAGE"></dashboard-page>
</template>

<script>
import {PAGES} from "../../pages.js";
import GuildsSelector from "../guilds/guildsSelector.vue";
import GuildDashboardView from "../dashboard/guildDashboardView.vue";
import JobView from "../job/jobView.vue";
import MainPage from "./mainPage.vue";
import DashboardPage from "./dashboardPage.vue";

export default {
  name: "appContainer",
  components: {DashboardPage, MainPage, JobView, GuildDashboardView, GuildsSelector},
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