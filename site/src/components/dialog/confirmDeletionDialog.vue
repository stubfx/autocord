<template>
  <simple-dialog ref="modal" title="Are you sure?" :hide-close-button="true">
    <div class="flex flex-row w-full gap">
      <delete-button @on-click="onConfirmDeletion()"></delete-button>
      <cancel-button @on-click="noDelete()"></cancel-button>
    </div>
  </simple-dialog>
</template>

<script>
import SimpleDialog from "./simpleDialog.vue";
import SimpleButton from "../simpleButton.vue";
import DeleteButton from "../buttons/deleteButton.vue";
import CancelButton from "../buttons/cancelButton.vue";

export default {
  name: "confirmDeletionDialog",
  components: {CancelButton, DeleteButton, SimpleButton, SimpleDialog},
  data() {
    return {
      cb: null
    }
  },
  methods: {
    open(cb) {
      this.cb = cb
      this.$refs.modal.open()
    },
    onConfirmDeletion() {
      this.$refs.modal.close()
      this.cb()
    },
    noDelete() {
      this.$refs.modal.close()
    }
  }
}
</script>

<style scoped>

</style>