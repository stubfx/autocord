<template>
  <div class="text-white">
    <div class="flex flex-col items-center w-full">
      <div class="max-w-2xl text-center">
        <h2 class="text-3xl font-bold sm:text-4xl">Jobs list</h2>
        <p class="mt-2 text-lg leading-8">Here you can automate your server</p>
        <p class="text-lg leading-8">This can be dangerous.</p>
      </div>
      <div
          class="mt-10 flex flex-row flex-wrap justify-center w-full">
        <guild-job v-for="job in jobs" :job="job" @onAddLink="addJobLink(job)"></guild-job>
        <guild-job-add-card @click="addJob()"></guild-job-add-card>
      </div>
    </div>
  </div>
</template>

<script>
import {NetworkAdapter} from "../../network.js";
import GuildJob from "./guildJob.vue";
import GuildJobAddCard from "./guildJobAddCard.vue";

export default {
  name: "guildDashboardView",
  components: {GuildJobAddCard, GuildJob},
  data() {
    return {
      jobs: []
    }
  },
  async mounted() {
    // reset current job
    this.$store.state.currentJob = null
    this.jobs = await NetworkAdapter.getGuildJobs(this.$route.params.guildId)
  },
  methods: {
    addJob() {
      let guildId = this.$route.params.guildId
      this.$router.push({name: 'jobView', params: {guildId: guildId}})
    },
    addJobLink(job) {
      let guildId = this.$route.params.guildId
      this.$store.state.currentJob = job
      this.$router.push({name: 'jobView', params: {guildId: guildId}})
    }
  }
}
</script>

<style scoped>

</style>