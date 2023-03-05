<template>
  <chain-link-parameters-dialog ref="modal" @onClose="onParameterChanged()">
  </chain-link-parameters-dialog>
  <div class="flex flex-col job-bg p-6 rounded shadow-default gap h-fit w-job">
    <div class="flex flex-row gap">
      <div class="flex flex-row flex-grow overflow-hidden">
        <!--        prevents text overflow-->
        <h1 v-if="!showSave" class="text-3xl text-accent">{{ job.name }}</h1>
        <input v-else class="text-3xl bg-secondary text-accent rounded" v-model="job.name">
      </div>
      <div class="flex flex-ro gap">
        <expand_rounded class="fill-success rounded w-token cursor-pointer"
                      v-if="showExpandButton" @click="onJobExpand"></expand_rounded>
        <edit_rounded class="fill-success rounded w-token cursor-pointer"
                      v-if="showEditButton" @click="onAddLink()"></edit_rounded>
        <delete_rounded class="fill-accent bg-error rounded w-token cursor-pointer" @click="deleteJob"
                       v-if="deletable"></delete_rounded>
        <save_rounded class="fill-success rounded rounded w-token cursor-pointer" @click="onSaveJob"
                      v-if="showSave"></save_rounded>
      </div>
    </div>
    <div class="flex flex-col gap overflow-x-auto">
      <chain-link-element :showDelete="isLinkDeletable(link)" :link="link" v-for="(link, index) in job.chain.chainLinks"
                          @click="editLink(link)" @on-delete="onLinkDelete(index)" :expanded="expanded"
                          :show-expand-button="showLinksExpandButton"></chain-link-element>
    </div>
  </div>
</template>

<script>
import Add_rounded from "../../assets/add_rounded.vue";
import Task_rounded from "../../assets/task_rounded.vue";
import Psicology_rounded from "../../assets/psicology_rounded.vue";
import Sensor_rounded from "../../assets/sensor_rounded.vue";
import ChainLinkElement from "../chainLinkElement/chainLinkElement.vue";
import ChainLinkParametersDialog from "../dialog/chainLinkParametersDialog.vue";
import Close_rounded from "../../assets/close_rounded.vue";
import ConfirmDeletionDialog from "../dialog/confirmDeletionDialog.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import Edit_rounded from "../../assets/edit_rounded.vue";
import Expand_more_rounded from "../../assets/expand_more_rounded.vue";
import Expand_rounded from "../../assets/expand_rounded.vue";
import Delete_rounded from "../../assets/delete_rounded.vue";

export default {
  name: "guildJob",
  components: {
    Delete_rounded,
    Expand_rounded,
    Expand_more_rounded,
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
    mode: 'DISPLAY',
    expanded: false,
    showLinksExpandButton: false,
    onLinkClickDialog: false,
    showExpandButton: false
  },
  emits: ['onAddLink', 'onSaveJob', "onJobUpdate", 'onJobExpand', 'onJobDelete'],
  methods: {
    onSaveJob() {
      this.$emit('onSaveJob', this.job)
    },
    onParameterChanged() {
      this.$emit('onJobUpdate', this.job)
    },
    deleteJob() {
      if (!this.$props.isSample) {
        this.$emit('onJobDelete')
      }
    },
    onAddLink() {
      this.$emit("onAddLink")
    },
    onJobExpand() {
      this.$emit("onJobExpand")
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
      if (this.$props.isSample || !this.$props.onLinkClickDialog) {
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