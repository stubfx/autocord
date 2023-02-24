<template>
  <div class="py-20 text-white">
    <div class="flex flex-col items-center w-full">
      <div class="max-w-2xl text-center">
        <h2 class="text-3xl font-bold sm:text-4xl">Jobs list</h2>
        <p class="mt-2 text-lg leading-8">Here you can automate your server</p>
        <p class="text-lg leading-8">This can be dangerous.</p>
      </div>
      <div
          class="mt-10 flex flex-row flex-wrap justify-center w-full">
        <guild-job v-for="job in jobs" :job="job"></guild-job>
      </div>
    </div>
  </div>
</template>

<script>
import {NetworkAdapter} from "../../network.js";
import GuildJob from "./guildJob.vue";

export default {
  name: "guildDashboardView",
  components: {GuildJob},
  data() {
    return {
      jobs: []
    }
  },
  async mounted() {
    this.jobs = await NetworkAdapter.getGuildJobs(this.$route.params.guildId)
  }
}
</script>

<style scoped>

</style>