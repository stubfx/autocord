<template>
  <simple-dialog ref="modal" :close-on-click-outside="false" title="Add storage value">
    <div ref="form" class="flex flex-col w-[400px] gap" @submit="close()">
      <h1>Name</h1>
      <input class="bg-secondary rounded p-2 w-full" type="text" v-model="variableName"/>
      <h1>Type</h1>
      <select v-model="type" class="bg-secondary rounded p-2 w-full">
        <option :value="listType" v-for="listType in types" class="bg-dark">{{listType}}</option>
      </select>
      <save-button @onClick="close()" class="self-center"></save-button>
    </div>
  </simple-dialog>
</template>

<script>
import Save_rounded from "../../assets/save_rounded.vue";
import ChainLinkElement from "../chainLinkElement/chainLinkElement.vue";
import SimpleDialog from "./simpleDialog.vue";
import {NetworkAdapter} from "../../network.js";
import SaveButton from "../buttons/saveButton.vue";
import {StorageParamType} from "../../ParamTypes.js";

export default {
  name: "addStorageValueDialog",
  components: {SaveButton, Save_rounded, ChainLinkElement, SimpleDialog},
  data() {
    return {
      variableName : '',
      type: StorageParamType.STRING,
      types: [
          StorageParamType.STRING,
          StorageParamType.LIST
      ]
    }
  },
  emits: ['onClose'],
  methods: {
    open() {
      this.$refs.modal.open()
    },
    async close() {
      if (!this.variableName) {
        return
      }
      await NetworkAdapter.addStorageData(this.$store.guildId, this.variableName, this.type)
      this.$refs.modal.close()
      this.$emit("onClose")
    }
  }
}
</script>

<style scoped>

</style>