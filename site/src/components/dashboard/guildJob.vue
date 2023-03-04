<template>
  <chain-link-parameters-dialog ref="modal" @onClose="onParameterChanged()">
  </chain-link-parameters-dialog>
  <confirm-deletion-dialog ref="deleteModal"></confirm-deletion-dialog>
  <div class="flex flex-col bg-discord-5 p-6 rounded items-center shadow-2xl gap w-full">
    <div class="flex flex-row w-full items-center gap">
      <h1 v-if="!showSave" class="text-3xl text-white flex-grow">{{ job.name }}</h1>
      <input v-else class="text-3xl bg-discord-3 text-white flex-grow p-1 rounded" v-model="job.name">
      <edit_rounded class="fill-discord-success rounded w-7 h-7 cursor-pointer"
                    v-if="showEditButton" @click="onAddLink()"></edit_rounded>
      <close_rounded class="fill-white bg-discord-error rounded w-7 h-7 cursor-pointer" @click="deleteJob"
                     v-if="deletable"></close_rounded>
      <save_rounded class="fill-discord-success rounded rounded w-7 h-7 cursor-pointer" @click="onSaveJob"
                    v-if="showSave"></save_rounded>
    </div>
    <div class="grid grid-flow-col gap w-full overflow-x-auto">
      <chain-link-element :showDelete="isLinkDeletable(link)" :link="link" v-for="(link, index) in job.chain.chainLinks"
                          @click="editLink(link)" @on-delete="onLinkDelete(index)"></chain-link-element>
    </div>
    <div class="relative group flex flex-row justify-center w-full cursor-pointer bg-discord-4 rounded py-4 hover:bg-discord-2
transition-colors overflow-hidden flex-grow items-center" v-if="job.chain.chainLinks.length < 5" @click="onAddLink()">
      <div class="absolute rounded-full bg-discord-2 w-[48px] h-[48px] group-hover:bg-discord-1 transition-all
                  group-hover:scale-[50] duration-700"></div>
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
import Save_rounded from "../../assets/save_rounded.vue";
import Edit_rounded from "../../assets/edit_rounded.vue";

export default {
  name: "guildJob",
  components: {
    Edit_rounded,
    Save_rounded,
    ConfirmDeletionDialog,
    Close_rounded,
    ChainLinkParametersDialog, ChainLinkElement, Sensor_rounded, Psicology_rounded, Task_rounded, Add_rounded
  },
  props: {
    job: Object,
    deletable: false,
    showSave: false,
    showEditButton: false,
    isSample: false,
    mode: 'DISPLAY'
  },
  emits: ['onAddLink', 'onSaveJob', 'onJobDeleted', 'onJobDeleted', "onJobUpdate"],
  methods: {
    onSaveJob() {
      this.$emit('onSaveJob', this.job)
    },
    onParameterChanged() {
      this.$emit('onJobUpdate', this.job)
    },
    deleteJob() {
      if (this.$props.isSample) {
        return
      }
      this.$refs.deleteModal.open(async () => {
        let guildId = this.$store.guildId
        await NetworkAdapter.deleteJob(guildId, this.job)
        this.$emit('onJobDeleted', this.job)
      })
    },
    onAddLink() {
      this.$emit("onAddLink")
    },
    onLinkDelete(index) {
      this.job.chain.chainLinks.splice(index, 1)
      this.$emit('onJobUpdate', this.job)
    },
    isLinkDeletable(link) {
      return link.type !== 'EVENT'
          && this.$props.mode === 'EDIT'
          && !this.$props.isSample
          // cannot delete link of a job with a single task/condition
          // event would remain alone otherwise
          // should check if there is at least a task tho.
          // if you can see showSave, then the job will save only on that button,
          // you are safe to delete the node.
          && (this.job.chain.chainLinks.length > 2 || this.$props.showSave)
    },
    editLink(link) {
      if (this.$props.isSample) {
        return
      }
      if (link.acceptParams.length > 0) {
        this.$refs.modal.open(this.job, link)
      }
    }
  }
}
</script>

<style scoped>

</style>