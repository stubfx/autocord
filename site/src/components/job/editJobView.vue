<template>
  <chain-link-parameters-dialog ref="modal">
  </chain-link-parameters-dialog>
  <div class="flex flex-row w-full h-full gap">
    <guild-job :job="job" @onSaveJob="onSaveJob" :show-save="true" mode="EDIT" :expanded="true" :on-link-click-dialog="true"></guild-job>
    <div class="h-full job-bg z-20 overflow-y-auto overflow-x-hidden rounded">
      <div class="flex flex-col rounded gap py">
        <div class="flex flex-row gap p w-full justify-around">
          <div v-for="listName in ['Events', 'Conditions', 'Tasks', 'SuperTasks']" @click="changeTab(listName)"
               class="flex flex-row flex-grow justify-center bg-dark rounded text-accent hover:bg-primary font-bold transition-colors">
            <div class="cursor-pointer p">{{listName}}</div>
          </div>
        </div>
        <event-list-selection name="Events" 
          :items="events"
          @onItemSelected="addLink"
          @onItemHover="onItemHover"
          v-if="tab === 'Events'">
        </event-list-selection>
        <event-list-selection name="Conditions" 
          :items="conditions"
          @onItemSelected="addLink"
          @onItemHover="onItemHover"
          v-if="tab === 'Conditions'">
        </event-list-selection>
        <event-list-selection name="Tasks" 
          :items="tasks"
          @onItemSelected="addLink"
          @onItemHover="onItemHover"
          v-if="tab === 'Tasks'">
        </event-list-selection>
        <event-list-selection name="SuperTasks" 
          :items="superTasks"
          @onItemSelected="addLink"
          @onItemHover="onItemHover"
          v-if="tab === 'SuperTasks'">
        </event-list-selection>
      </div>
    </div>
    <JobDescription :item="hoveringItem" />
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
import {discordPopup} from "../../../popup.js";
import JobDescription from "./jobDescription.vue";

export default {
  name: "editJobView",
  emits: ['onSaveJob'],
  props: {
    isSample: false
  },
  components: {
    ConfirmDeletionDialog,
    ChainLinkParametersDialog,
    SimpleDialog, Save_rounded, Sensor_rounded, EventListSelection, ChainLinkElement, GuildJob,
    JobDescription
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
      conditions: [],
      superTasks: [],
      hoveringItem: null,
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
    this.superTasks = await NetworkAdapter.getAvailableJobSuperTasks()
  },
  methods: {
    addLink(rawItem) {
      let item = JSON.parse(JSON.stringify(rawItem));
      if (item.type === "EVENT") {
        this.job.chain.chainLinks = this.job.chain.chainLinks.filter(el => el.type !== 'EVENT')
        // then add the new one :P
        this.job.chain.chainLinks.unshift(item)
        return;
        // this.onAddLink(item)
      }
      
      let count = this.job.chain.chainLinks.reduce((accumulator, currentValue) => {
        if (currentValue.type !== 'EVENT') {
          return ++accumulator
        }
        return accumulator
      }, 0)
    // TODO RETRIEVE THIS VALUE FROM THE SERVER
      if (count < 6) {
        this.onAddLink(item)
      }
    },
    onItemHover(item) {
      this.hoveringItem = item
    },
    onAddLink(item) {
      if (item.acceptParams.length > 0) {
        this.$refs.modal.open(this.job, item, () => {
          this.job.chain.chainLinks.push(item)
        })
      } else {
        // no params, just add the item!
        this.job.chain.chainLinks.push(item)
      }
    },
    async onSaveJob(job) {
      let guildId = this.$store.guildId
      let saveJob = await NetworkAdapter.saveJob(guildId, job)
      if (!saveJob.hasPermissions && !saveJob.url) {
        // an error has occurred :/
        return
      }
      if (!saveJob.hasPermissions) {
        // no permissions, ask!
        // todo prompt the user for the required permissions.
        await discordPopup(saveJob.url)
        // then try again.
        await NetworkAdapter.saveJob(guildId, job)
      }
      this.$router.push({name: 'jobs'})
    },
    changeTab(listName) {
      this.tab = listName
    }
  }
}
</script>

<style scoped>

</style>