<template>
  <div class="flex w-full h-full">
    <h1 class="text-8xl">Create a new job</h1>
    <guild-job></guild-job>
  </div>
</template>

<script>
import GuildJob from "../dashboard/guildJob.vue";

export default {
  name: "jobView",
  components: {GuildJob}
}
</script>

<style scoped>

</style>