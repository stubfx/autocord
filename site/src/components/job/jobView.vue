<template>
  <div class="flex flex-col w-full h-full">
    <h1 class="text-9xl font-bold mb-20 text-white">Create a new job</h1>
    <div class="flex flex-row">
      <div class="">
        <guild-job :job="job"></guild-job>
      </div>
      <div class="flex flex-row p-6">
        <div class="flex flex-row bg-discord-5 p-6 shadow-2xl rounded-xl flex-wrap">
          <div class="m-2" v-for="event in events">
            <chain-link-element :link="event" @click="addLink(event)"></chain-link-element>
          </div>
          <div class="m-2" v-for="task in tasks">
            <chain-link-element :link="task" @click="addLink(task)"></chain-link-element>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuildJob from "../dashboard/guildJob.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import {NetworkAdapter} from "../../network.js";

export default {
  name: "jobView",
  components: {ChainLinkElement, GuildJob},
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