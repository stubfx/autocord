<template>
  <div class="flex flex-col w-full h-full">
    <h1 class="text-9xl font-bold mb-20 text-white">New Flow</h1>
    <div class="flex flex-row">
      <div>
        <guild-job :job="job"></guild-job>
      </div>
      <div class="flex flex-col bg-discord-5 shadow-2xl rounded-xl m-5 py-3">
        <event-list-selection name="Events" :items="events" @onItemSelected="addLink"></event-list-selection>
        <event-list-selection name="Tasks" :items="tasks" @onItemSelected="addLink"></event-list-selection>
      </div>
    </div>
  </div>
</template>

<script>
import GuildJob from "../dashboard/guildJob.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import {NetworkAdapter} from "../../network.js";
import EventListSelection from "./eventListSelection.vue";

export default {
  name: "newJobView",
  components: {EventListSelection, ChainLinkElement, GuildJob},
  data() {
    return {
      job: {
        name: "new Job",
        firedOn: "When?",
        chain: []
      },
      events: [],
      tasks: []
    }
  },
  async mounted() {
    this.events = await NetworkAdapter.getAvailableEventNames()
    this.tasks = await NetworkAdapter.getAvailableJobTasks()
    this.conditions = await NetworkAdapter.getAvailableJobTasks()
  },
  methods: {
    addLink(event) {
      if (event.type === "EVENT") {
        this.job.firedOn = event.name
      } else if (event.type === "TASK") {
        if (this.job.chain.length < 4) {
          this.job.chain.push(event)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>