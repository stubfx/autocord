<template>
  <div class="flex flex-col w-full gap md:px-6 lg:px-14 xl:px-32">
    <dashboard-navbar :current-page="page" @on-page-change="onPageChange" @on-logout="logout"></dashboard-navbar>
    <guilds-selector v-if="page === DASHBOARDPAGES.GUILD_SELECTION" @on-page-change="onPageChange"></guilds-selector>
    <guild-dashboard-view v-if="page === DASHBOARDPAGES.JOB_LISTING"
                          @on-page-change="onPageChange"></guild-dashboard-view>
    <edit-job-view v-if="page === DASHBOARDPAGES.JOB_DETAIL" @on-save-job="onSaveJob"></edit-job-view>
  </div>
</template>

<script>
import {DASHBOARDPAGES} from "../../pages.js";
import GuildsSelector from "../guilds/guildsSelectionPage.vue";
import GuildDashboardView from "../dashboard/guildDashboardView.vue";
import Home_rounded from "../../assets/home_rounded.vue";
import EditJobView from "../job/editJobView.vue";
import SimpleSelect from "../general/simpleSelect.vue";
import DashboardNavbar from "./dashboardNavbar.vue";
import {NetworkAdapter} from "../../network.js";

export default {
  name: "dashboardPage",
  components: {DashboardNavbar, SimpleSelect, EditJobView, Home_rounded, GuildDashboardView, GuildsSelector},
  emits: ['onLogout'],
  data() {
    return {
      userGuilds:[],
      page: DASHBOARDPAGES.GUILD_SELECTION,
      DASHBOARDPAGES: DASHBOARDPAGES
    }
  },
  methods: {
    onPageChange(page) {
      this.page = page
    },
    async logout() {
      await NetworkAdapter.logout()
      this.$emit('onLogout')
    },
    async onSaveJob(job) {
      let guildId = this.$store.guildId
      await NetworkAdapter.saveJob(guildId, job)
      this.$emit('onPageChange', DASHBOARDPAGES.JOB_LISTING)
    }
  }
}
</script>

<style scoped>

</style>