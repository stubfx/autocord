<template>
  <simple-dialog ref="modal" :close-on-click-outside="false" title="Add storage value">
    <div ref="form" class="flex flex-col w-[400px] items-center gap" @submit="close()">
      <input class="bg-secondary rounded p-2 mt-2 w-full" type="text" v-model="value"/>
      <save-button @onClick="close()"></save-button>
    </div>
  </simple-dialog>
</template>

<script>
import Save_rounded from "../../assets/save_rounded.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import SimpleDialog from "./simpleDialog.vue";
import {NetworkAdapter} from "../../network.js";
import SaveButton from "../buttons/saveButton.vue";

export default {
  name: "addStorageValueDialog",
  components: {SaveButton, Save_rounded, ChainLinkElement, SimpleDialog},
  data() {
    return {
      value : ''
    }
  },
  emits: ['onClose'],
  methods: {
    open() {
      this.$refs.modal.open()
    },
    async close() {
      if (!this.value) {
        return
      }
      await NetworkAdapter.addStorageData(this.$store.guildId, this.value)
      this.$refs.modal.close()
      this.$emit("onClose")
    }
  }
}
</script>

<style scoped>

</style>