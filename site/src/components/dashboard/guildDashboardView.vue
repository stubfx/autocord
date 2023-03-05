<template>
  <confirm-deletion-dialog ref="deleteModal"></confirm-deletion-dialog>
  <div class="flex flex-row w-full text-accent">
    <div class="flex flex-col gap">
      <h2 class="text-3xl font-bold sm:text-4xl">Shared storage</h2>
      <div class="flex flex-row">
        <storage-view class="mt-5" :storage="storage"
                      @on-storage-data-added="refreshGuildData"
                      @on-storage-data-deleted="refreshGuildData"></storage-view>
      </div>
      <h2 class="text-3xl font-bold sm:text-4xl">Jobs</h2>
      <div class="mt-2 flex flex-row flex-wrap gap">
        <guild-job v-for="job in jobs" :job="job" @onAddLink="addJobLink(job)" @onJobUpdate="onUpdateJob(job)"
                   @on-job-deleted="onJobDelete" :deletable="false" :show-edit-button="false" :show-expand-button="true"
                   @onJobExpand="onJobExpand(job)"></guild-job>
        <guild-job-add-card @click="addJob()"></guild-job-add-card>
      </div>
    </div>
    <div class="w-job" v-if="!!sideViewJob"></div>
    <div class="fixed top-0 right-0 h-full w-job job-bg z-20 overflow-y-auto overflow-x-hidden" v-if="!!sideViewJob">
      <guild-job :job="sideViewJob" @onAddLink="addJobLink" @onJobUpdate="onUpdateJob"
                 @onJobDelete="onJobDelete" :deletable="true" :show-edit-button="true" :expanded="true"
                 v-if="!!sideViewJob"></guild-job>
    </div>
  </div>
</template>

<script>
import {NetworkAdapter} from "../../network.js";
import GuildJob from "./guildJob.vue";
import GuildJobAddCard from "./guildJobAddCard.vue";
import StorageView from "../storageView.vue";
import ConfirmDeletionDialog from "../dialog/confirmDeletionDialog.vue";

export default {
  name: "guildDashboardView",
  emits: ['onPageChange'],
  components: {ConfirmDeletionDialog, StorageView, GuildJobAddCard, GuildJob},
  data() {
    return {
      jobs: [],
      storage: {},
      sideViewJob: null
    }
  },
  async mounted() {
    await this.refreshGuildData()
  },
  methods: {
    async refreshGuildData() {
      this.$store.currentJob = null
      this.sideViewJob = null
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
          let response = await NetworkAdapter.getGuildData(this.$store.guildId)
          this.jobs = response['jobs']
          this.storage = response['storage']
          this.$store.storage = this.storage
        } else {
          this.$router.push({name: 'guilds'})
        }
      }
    },
    onJobExpand(job) {
      this.$store.currentJob = job
      // show current job in side view
      this.sideViewJob = job
    },
    addJob() {
      // this.$emit('onPageChange', DASHBOARDPAGES.JOB_DETAIL)
      this.$router.push({name: 'editjob'})
    },
    addJobLink() {
      this.$store.currentJob = this.sideViewJob
      // this.$emit('onPageChange', DASHBOARDPAGES.JOB_DETAIL)
      this.$router.push({name: 'editjob'})
    },
    async onUpdateJob() {
      let guildId = this.$store.guildId
      await NetworkAdapter.saveJob(guildId, this.sideViewJob)
    },
    async onJobDelete() {
      this.$refs.deleteModal.open(async () => {
        let guildId = this.$store.guildId
        await NetworkAdapter.deleteJob(guildId, this.sideViewJob)
        await this.refreshGuildData()
      })
    }
  }
}
</script>

<style scoped>

</style>