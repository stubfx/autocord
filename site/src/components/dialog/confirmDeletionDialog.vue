<template>
  <simple-dialog ref="modal" title="Are you sure?" :hide-close-button="true">
    <div class="flex flex-row w-full">
      <simple-button text="Delete" @on-click="onConfirmDeletion()" type="DELETE"></simple-button>
      <simple-button class="ml-5" text="cancel" @on-click="noDelete()"></simple-button>
    </div>
  </simple-dialog>
</template>

<script>
import SimpleDialog from "./simpleDialog.vue";
import SimpleButton from "../simpleButton.vue";

export default {
  name: "confirmDeletionDialog",
  components: {SimpleButton, SimpleDialog},
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