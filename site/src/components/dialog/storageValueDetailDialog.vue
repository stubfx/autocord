<template>
  <simple-dialog ref="modal" :close-on-click-outside="true" title="Storage Value">
    <div class="flex flex-col w-[400px] gap items-center my-6">
      <h1>Name {{storageItem.name}}</h1>
      <h1 v-if="storageItem.type !== StorageParamType.LIST">value {{storageItem.value}}</h1>
      <div class="flex flex-col" v-if="storageItem.type !== StorageParamType.LIST">
        <chip :text="value" v-for="value in storageItem.value"></chip>
      </div>
      <delete_rounded class="fill-accent bg-error rounded w-token cursor-pointer mt-2" @click="onDeleteStorageData"></delete_rounded>
<!--      no save in this dialog.-->
<!--      <save-button @onClick="close()" class="self-center"></save-button>-->
    </div>
  </simple-dialog>
</template>

<script>
import SimpleDialog from "./simpleDialog.vue";
import {StorageParamType} from "../../ParamTypes.js";
import Delete_rounded from "../../assets/delete_rounded.vue";
import Chip from "../chips/chip.vue";

export default {
  name: "storageValueDetailDialog",
  computed: {
    StorageParamType() {
      return StorageParamType
    }
  },
  emits: ['onDeleteStorageData'],
  components: {Chip, Delete_rounded, SimpleDialog},
  data() {
    return {
      storageItem: null
    }
  },
  methods: {
    open(storageItem) {
      this.storageItem = storageItem
      console.log(storageItem)
      this.$refs.modal.open()
    },
    onDeleteStorageData() {
      this.$emit('onDeleteStorageData', this.storageItem)
      this.$refs.modal.close()
    },
  }
}
</script>

<style scoped>

</style>