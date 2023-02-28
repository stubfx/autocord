<template>
  <simple-dialog ref="modal">
    <h1>Are you sure you want to delete this item?</h1>
    <div class="flex flex-row w-full mt-4">
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