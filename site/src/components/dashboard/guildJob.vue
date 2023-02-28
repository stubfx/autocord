<template>
  <chain-link-parameters-dialog ref="modal" @onClose="saveJob()">
  </chain-link-parameters-dialog>
  <confirm-deletion-dialog ref="deleteModal"></confirm-deletion-dialog>
  <div class="flex flex-col flex-wrap bg-discord-5 p-6 w-[400px] rounded-xl m-5 items-center shadow-2xl gap-5">
    <div class="flex flex-row w-full items-center">
      <h1 class="uppercase text-3xl text-white flex-grow">{{ job.name }}</h1>
      <close_rounded class="fill-white bg-discord-error rounded-full w-7 h-7 cursor-pointer" @click="deleteJob"
      v-if="deletable"></close_rounded>
    </div>
    <chain-link-element :link="link" v-for="link in job.chain.chainLinks" @click="editLink(link)"></chain-link-element>
    <div class="relative group flex flex-row justify-center w-full cursor-pointer bg-discord-4 rounded-xl py-4 hover:bg-discord-2
transition-colors overflow-hidden" v-if="job.chain.chainLinks.length < 5" @click="onAddLink()">
      <div class="absolute rounded-full bg-discord-2 w-[48px] h-[48px] group-hover:bg-discord-1 transition-all
                  group-hover:scale-[10]"></div>
      <add_rounded class="rounded-full fill-discord-1 w-[48px] group-hover:fill-white z-10 group-hover:rotate-180
      transition-all"></add_rounded>
    </div>
  </div>
</template>

<script>
import Add_rounded from "../../assets/add_rounded.vue";
import Task_rounded from "../../assets/task_rounded.vue";
import Psicology_rounded from "../../assets/psicology_rounded.vue";
import Sensor_rounded from "../../assets/sensor_rounded.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import ChainLinkParametersDialog from "../dialog/chainLinkParametersDialog.vue";
import Close_rounded from "../../assets/close_rounded.vue";
import ConfirmDeletionDialog from "../dialog/confirmDeletionDialog.vue";
import {NetworkAdapter} from "../../network.js";

export default {
  name: "guildJob",
  components: {
    ConfirmDeletionDialog,
    Close_rounded,
    ChainLinkParametersDialog, ChainLinkElement, Sensor_rounded, Psicology_rounded, Task_rounded, Add_rounded},
  props: {
    job: Object,
    deletable: false
  },
  emits: ['onAddLink', 'onSaveJob', 'onJobDeleted'],
  methods: {
    saveJob() {
      this.$emit('onSaveJob', this.job)
    },
    deleteJob() {
        this.$refs.deleteModal.open(async () => {
          let guildId = this.$store.guildId
          await NetworkAdapter.deleteJob(guildId, this.job)
          this.$emit('onJobDeleted', this.job)
        })
    },
    onAddLink() {
      this.$emit("onAddLink")
    },
    editLink(link) {
      if (link.acceptParams.length > 0) {
        this.$refs.modal.open(link)
      }
    }
  }
}
</script>

<style scoped>

</style>