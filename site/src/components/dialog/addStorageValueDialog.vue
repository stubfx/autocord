<template>
  <simple-dialog ref="modal" :close-on-click-outside="false" title="Add storage value">
    <form ref="form" class="flex flex-col w-[400px]">
      <input class="bg-discord-3 rounded p-2 mt-2" type="text" v-model="value"/>
      <simple-button class="mt-5 w-fit self-center" @onClick="close()" text="save" type="SAVE"></simple-button>
    </form>
  </simple-dialog>
</template>

<script>
import SimpleButton from "../simpleButton.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import SimpleDialog from "./simpleDialog.vue";
import {NetworkAdapter} from "../../network.js";

export default {
  name: "addStorageValueDialog",
  components: {SimpleButton, Save_rounded, ChainLinkElement, SimpleDialog},
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