<template>
  <div class="text-white">
    <div class="flex flex-col items-center w-full">
      <div class="max-w-2xl text-center">
        <h2 class="text-3xl font-bold sm:text-4xl">Automate your server!</h2>
        <p class="text-lg leading-8 underline text-transparent">This can be dangerous.</p>
      </div>
      <div class="flex flex-col items-center mt-10">
        <h2 class="text-3xl font-bold sm:text-4xl">Storage</h2>
        <div class="flex flex-row w-full p-5">
          <storage-view class="mt-5" :storage="storage"></storage-view>
        </div>
        <h2 class="text-3xl font-bold sm:text-4xl">Jobs</h2>
        <div class="mt-2 flex flex-row flex-wrap justify-center w-full">
          <guild-job v-for="job in jobs" :job="job" @onAddLink="addJobLink(job)" @onSaveJob="onSaveJob"
                     @on-job-deleted="onJobDeleted" :deletable="true"></guild-job>
          <guild-job-add-card @click="addJob()"></guild-job-add-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {NetworkAdapter} from "../../network.js";
import GuildJob from "./guildJob.vue";
import GuildJobAddCard from "./guildJobAddCard.vue";
import {PAGES} from "../../pages.js";
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
    }
  },
  async mounted() {
    // reset current job
    this.$store.state.currentJob = null
    await this.refreshGuildData()
  },
  methods: {
    async refreshGuildData() {
      let response = await NetworkAdapter.getGuildData(this.$store.guildId)
      this.jobs = response['jobs']
      this.storage = response['storage']
    },
    addJob() {
      this.$emit('onPageChange', PAGES.JOB_DETAIL)
    },
    addJobLink(job) {
      this.$store.state.currentJob = job
      this.$emit('onPageChange', PAGES.JOB_DETAIL)
    },
    async onSaveJob(job) {
      let guildId = this.$store.guildId
      await NetworkAdapter.saveJob(guildId, job)
    },
    async onJobDeleted() {
      await this.refreshGuildData()
    }
  }
}
</script>

<style scoped>

</style>