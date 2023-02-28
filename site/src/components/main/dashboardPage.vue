<template>
  <div class="flex flex-row w-full">
    <home_rounded class="w-[40px] cursor-pointer fill-white" @click="onPageChange(DASHBOARDPAGES.GUILD_SELECTION)"
     v-if="page !== DASHBOARDPAGES.GUILD_SELECTION"></home_rounded>
  </div>
  <guilds-selector v-if="page === DASHBOARDPAGES.GUILD_SELECTION" @on-page-change="onPageChange"></guilds-selector>
  <guild-dashboard-view  v-if="page === DASHBOARDPAGES.JOB_LISTING" @on-page-change="onPageChange"></guild-dashboard-view>
  <job-view  v-if="page === DASHBOARDPAGES.JOB_DETAIL" @on-page-change="onPageChange"></job-view>
</template>

<script>
import {DASHBOARDPAGES} from "../../pages.js";
import GuildsSelector from "../guilds/guildsSelector.vue";
import GuildDashboardView from "../dashboard/guildDashboardView.vue";
import JobView from "../job/jobView.vue";
import Home_rounded from "../../assets/home_rounded.vue";

export default {
  name: "dashboardPage",
  components: {Home_rounded, JobView, GuildDashboardView, GuildsSelector},
  data() {
    return {
      page: DASHBOARDPAGES.GUILD_SELECTION,
      DASHBOARDPAGES: DASHBOARDPAGES
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