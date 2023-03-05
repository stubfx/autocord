<template>
  <chain-link-parameters-dialog ref="modal">
  </chain-link-parameters-dialog>
  <div class="flex flex-row w-full h-full gap justify-center">
    <guild-job :job="job" @onSaveJob="onSaveJob" :show-save="true" mode="EDIT"></guild-job>
    <div class="flex flex-col job-bg shadow-default rounded gap py w-job">
      <div class="flex flex-row gap p w-full justify-around">
        <div v-for="listName in ['Events', 'Conditions', 'Tasks']" @click="changeTab(listName)"
             class="flex flex-row flex-grow justify-center bg-dark rounded text-accent hover:bg-primary font-bold transition-colors">
          <div class="cursor-pointer p">{{listName}}</div>
        </div>
      </div>
      <event-list-selection name="Events" :items="events" @onItemSelected="addLink" v-if="tab === 'Events'"></event-list-selection>
      <event-list-selection name="Conditions" :items="conditions" @onItemSelected="addLink" v-if="tab === 'Conditions'"></event-list-selection>
      <event-list-selection name="Tasks" :items="tasks" @onItemSelected="addLink" v-if="tab === 'Tasks'"></event-list-selection>
    </div>
    <div class="w-job"></div>
    <div class="fixed top-0 right-0 h-full w-job job-bg z-20">
      <div class="w-job"></div>
    </div>
  </div>
</template>

<script>
import GuildJob from "../dashboard/guildJob.vue";
import ChainLinkElement from "../chainLinkElement/chainLinkElement.vue";
import {NetworkAdapter} from "../../network.js";
import EventListSelection from "./eventListSelection.vue";
import Sensor_rounded from "../../assets/sensor_rounded.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import SimpleDialog from "../dialog/simpleDialog.vue";
import ChainLinkParametersDialog from "../dialog/chainLinkParametersDialog.vue";
import ConfirmDeletionDialog from "../dialog/confirmDeletionDialog.vue";

export default {
  name: "editJobView",
  emits: ['onSaveJob'],
  props: {
    isSample: false
  },
  components: {
    ConfirmDeletionDialog,
    ChainLinkParametersDialog,
    SimpleDialog, Save_rounded, Sensor_rounded, EventListSelection, ChainLinkElement, GuildJob
  },
  data() {
    return {
      job: {
        name: "New Job",
        chain: {chainLinks: []}
      },
      tab: 'Events',
      events: [],
      tasks: [],
      conditions: []
    }
  },
  async mounted() {
    // is there a job in the store?
    let currentJob = this.$store.currentJob;
    if (currentJob) {
      this.job = currentJob
    }/* else {
      // nope.
      this.$router.push({name: 'jobs'})
    }*/
    this.events = await NetworkAdapter.getAvailableEventNames()
    this.tasks = await NetworkAdapter.getAvailableJobTasks()
    this.conditions = await NetworkAdapter.getAvailableJobConditions()
  },
  methods: {
    addLink(rawItem) {
      let item = JSON.parse(JSON.stringify(rawItem));
      if (item.type === "EVENT") {
        this.job.chain.chainLinks = this.job.chain.chainLinks.filter(el => el.type !== 'EVENT')
        // then add the new one :P
        this.job.chain.chainLinks.unshift(item)
        this.onAddLink(item)
      } else if (item.type === "TASK" || item.type === "CONDITION") {
        // count events in chain (max 4)
        let count = this.job.chain.chainLinks.reduce((accumulator, currentValue) => {
          if (currentValue.type !== 'EVENT') {
            return ++accumulator
          }
          return accumulator
        }, 0)
        if (count < 4) {
          this.onAddLink(item)
        }
      }
    },
    onAddLink(item) {
      if (item.acceptParams.length > 0) {
        this.$refs.modal.open(this.job, item, () => {
          this.job.chain.chainLinks.push(item)
        })
      }
    },
    async onSaveJob(job) {
      let guildId = this.$store.guildId
      if (await NetworkAdapter.saveJob(guildId, job)) {
        // this.page = DASHBOARDPAGES.JOB_LISTING
        this.$router.push({name: 'jobs'})
      }
    },
    changeTab(listName) {
      this.tab = listName
    }
  }
}
</script>

<style scoped>

</style>