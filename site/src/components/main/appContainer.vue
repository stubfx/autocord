<template>
  <main-page v-if="page === PAGES.MAIN_PAGE" @on-page-change="onPageChange"></main-page>
  <guilds-selector v-if="page === PAGES.GUILD_SELECTION" @on-page-change="onPageChange"></guilds-selector>
  <guild-dashboard-view  v-if="page === PAGES.JOB_LISTING" @on-page-change="onPageChange"></guild-dashboard-view>
  <job-view  v-if="page === PAGES.JOB_DETAIL" @on-page-change="onPageChange"></job-view>
</template>

<script>
import {PAGES} from "../../pages.js";
import GuildsSelector from "../guilds/guildsSelector.vue";
import GuildDashboardView from "../dashboard/guildDashboardView.vue";
import JobView from "../job/jobView.vue";
import MainPage from "./mainPage.vue";

export default {
  name: "appContainer",
  components: {MainPage, JobView, GuildDashboardView, GuildsSelector},
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