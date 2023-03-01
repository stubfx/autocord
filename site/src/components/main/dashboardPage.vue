<template>
  <div class="flex flex-col w-full gap">
    <div class="flex flex-row p bg-discord-5 rounded" v-if="page !== DASHBOARDPAGES.GUILD_SELECTION">
      <home_rounded class="w-[40px] cursor-pointer fill-white"
                    @click="onPageChange(DASHBOARDPAGES.GUILD_SELECTION)"></home_rounded>
    </div>
    <guilds-selector v-if="page === DASHBOARDPAGES.GUILD_SELECTION" @on-page-change="onPageChange"></guilds-selector>
    <guild-dashboard-view v-if="page === DASHBOARDPAGES.JOB_LISTING"
                          @on-page-change="onPageChange"></guild-dashboard-view>
    <edit-job-view v-if="page === DASHBOARDPAGES.JOB_DETAIL" @on-page-change="onPageChange"></edit-job-view>
  </div>
</template>

<script>
import {DASHBOARDPAGES} from "../../pages.js";
import GuildsSelector from "../guilds/guildsSelector.vue";
import GuildDashboardView from "../dashboard/guildDashboardView.vue";
import Home_rounded from "../../assets/home_rounded.vue";
import EditJobView from "../job/editJobView.vue";

export default {
  name: "dashboardPage",
  components: {EditJobView, Home_rounded, GuildDashboardView, GuildsSelector},
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