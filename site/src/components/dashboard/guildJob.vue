<template>
  <chain-link-parameters-dialog ref="modal" @onClose="onParameterChanged()">
  </chain-link-parameters-dialog>
  <confirm-deletion-dialog ref="deleteModal"></confirm-deletion-dialog>
  <div class="flex flex-col job-bg p-6 rounded shadow-2xl gap h-fit w-job">
    <div class="flex flex-row gap">
      <div class="flex flex-row flex-grow overflow-hidden">
        <!--        prevents text overflow-->
        <h1 v-if="!showSave" class="text-3xl text-accent">{{ job.name }}</h1>
        <input v-else class="text-3xl bg-secondary text-accent rounded" v-model="job.name">
      </div>
      <div class="flex flex-ro gap">
        <edit_rounded class="fill-success rounded w-token cursor-pointer"
                      v-if="showEditButton" @click="onAddLink()"></edit_rounded>
        <close_rounded class="fill-accent bg-error rounded w-token cursor-pointer" @click="deleteJob"
                       v-if="deletable"></close_rounded>
        <save_rounded class="fill-success rounded rounded w-token cursor-pointer" @click="onSaveJob"
                      v-if="showSave"></save_rounded>
      </div>
    </div>
    <div class="flex flex-col gap overflow-x-auto">
      <chain-link-element :showDelete="isLinkDeletable(link)" :link="link" v-for="(link, index) in job.chain.chainLinks"
                          @click="editLink(link)" @on-delete="onLinkDelete(index)"></chain-link-element>
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