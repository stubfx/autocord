<template>
  <div class="fixed flex flex-col top-0 h-full z-10 bg-tertiary">
    <dashboard-navbar class="w-full" :current-page="page" @on-page-change="onPageChange" @on-logout="logout"
                      @on-refresh="onRefresh"></dashboard-navbar>
  </div>
  <div class="flex flex-row w-full pt-16 pl-32 pr-20">
    <router-view></router-view>
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
import GuildJob from "./guildJob.vue";

export default {
  name: "dashboardPage",
  components: {GuildJob, DashboardNavbar, SimpleSelect, EditJobView, Home_rounded, GuildDashboardView, GuildsSelector},
  emits: ['onLogout'],
  data() {
    return {
      userGuilds: [],
      page: DASHBOARDPAGES.GUILD_SELECTION,
      DASHBOARDPAGES: DASHBOARDPAGES
    }
  },
  async mounted() {
    if (!await NetworkAdapter.loginCheck()) {
      // redirect to selection
      // this.$emit('onPageChange', PAGES.DASHBOARD_PAGE)
      this.$router.push('/')
    } else {
      let guildId = this.$route.params.guildId;
      // did we have a selected guild?
      if (guildId) {
        this.$store.guildId = guildId
        // awesome!
        this.$router.push({name: 'jobs', params: {guildId: guildId}})
      } else {
        this.$router.push({name: 'guilds'})
      }
    }
  },
  methods: {
    onRefresh() {
      this.$refs.jobListingComponent.refreshGuildData()
    },
    onPageChange(page) {
      this.page = page
    },
    async logout() {
      await NetworkAdapter.logout()
      // make sure to remove everything.
      // window.location.reload()
      // this.$emit('onLogout')
      this.$router.push('/')
    },
    async onSaveJob(job) {
      let guildId = this.$store.guildId
      await NetworkAdapter.saveJob(guildId, job)
      this.page = DASHBOARDPAGES.JOB_LISTING
    }
  }
}
</script>

<style scoped>

</style>