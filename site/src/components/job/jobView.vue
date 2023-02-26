<template>
  <chain-link-parameters-dialog ref="modal" :chain-link="currentItem">
  </chain-link-parameters-dialog>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-row items-baseline w-full mb-20 justify-self-stretch">
      <h1 class="text-9xl font-bold text-white">New Flow</h1>
    </div>
    <div class="flex flex-row">
      <div class="flex flex-col items-center">
        <guild-job :job="job"></guild-job>
        <div class="group cursor-pointer p-5 bg-discord-2 rounded-xl hover:bg-discord-success
                   transition-colors duration-100 w-[400px]" @click="saveJob()">
          <div class="flex flex-row items-center">
            <save_rounded class="fill-gray-400 w-10 group-hover:fill-black"></save_rounded>
            <div class="flex flex-col ml-2">
              <span class="font-semibold text-white tracking-wide group-hover:text-black">save</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col bg-discord-5 shadow-2xl rounded-xl m-5 py-3">
        <event-list-selection name="Events" :items="events" @onItemSelected="addLink"></event-list-selection>
        <event-list-selection name="Conditions" :items="conditions" @onItemSelected="addLink"></event-list-selection>
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
import Sensor_rounded from "../../assets/sensor_rounded.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import SimpleDialog from "../simpleDialog.vue";
import ChainLinkParametersDialog from "./chainLinkParametersDialog.vue";

export default {
  name: "jobView",
  components: {
    ChainLinkParametersDialog,
    SimpleDialog, Save_rounded, Sensor_rounded, EventListSelection, ChainLinkElement, GuildJob},
  data() {
    return {
      job: {
        name: "new Job",
        chain: {chainLinks: []}
      },
      events: [],
      tasks: [],
      conditions: [],
      currentItem: {acceptParams: [], params: []}
    }
  },
  async mounted() {
    // is there a job in the store?
    let currentJob = this.$store.state.currentJob;
    if (currentJob) {
      this.job = currentJob
    }
    this.events = await NetworkAdapter.getAvailableEventNames()
    this.tasks = await NetworkAdapter.getAvailableJobTasks()
    this.conditions = await NetworkAdapter.getAvailableJobConditions()
  },
  methods: {
    addLink(item) {
      if (item.type === "EVENT") {
        this.job.chain.chainLinks = this.job.chain.chainLinks.filter(el => el.type !== 'EVENT')
        // then add the new one :P
        this.job.chain.chainLinks.unshift(item)
        this.onLinkAdded(item)
      } else if (item.type === "TASK" || item.type === "CONDITION") {
        // count events in chain (max 4)
        let count = this.job.chain.chainLinks.reduce((accumulator, currentValue) => {
              if (currentValue.type !== 'EVENT') {
                return ++accumulator
              }
              return accumulator
            }, 0)
        if (count < 4) {
          this.job.chain.chainLinks.push(item)
          this.onLinkAdded(item)
        }
      }
    },
    onLinkAdded(item) {
      // open modal
      // open only if it has params!
      this.currentItem = item
      if (this.currentItem.acceptParams.length > 0) {
        this.$refs.modal.open()
      }
    },
    async saveJob() {
      let guildId = this.$route.params.guildId
      await NetworkAdapter.saveJob(guildId, this.job)
      this.$router.push({name: 'dashboard', params: {guildId: guildId}})
    }
  }
}
</script>

<style scoped>

</style>