<template>
  <div class="flex flex-row w-full">
    <add-storage-value-dialog ref="modal" @onClose="onStorageDataAdded"></add-storage-value-dialog>
    <confirm-deletion-dialog  ref="deleteModal"></confirm-deletion-dialog>
    <div class="flex flex-row p bg-dark rounded w-full items-center gap-2">
      <div class="flex flex-row bg-secondary p-2 rounded hover:bg-error text-accent cursor-pointer"
           v-for="item in getStorageData()" @click="onDeleteStorageData(item)">
        <p>{{ item.name }} : {{ item.value.toString() || 'N/A' }}</p>
      </div>
      <add_rounded class="w-10 h-10 bg-secondary rounded fill-accent hover:bg-success
    hover:fill-black cursor-pointer transition-colors" @click="onAddStorageData"></add_rounded>
    </div>
  </div>
</template>

<script>
import Add_rounded from "../assets/add_rounded.vue";
import SimpleDialog from "./dialog/simpleDialog.vue";
import AddStorageValueDialog from "./dialog/addStorageValueDialog.vue";
import ConfirmDeletionDialog from "./dialog/confirmDeletionDialog.vue";
import {NetworkAdapter} from "../network.js";

export default {
  name: "storageView",
  components: {ConfirmDeletionDialog, AddStorageValueDialog, SimpleDialog, Add_rounded},
  emits: ['onStorageDataAdded', 'onStorageDataDeleted'],
  props: {
    storage: Object
  },
  methods: {
    getStorageData() {
      let storageData = []
      let storage = this.$props.storage || {};
      let data = storage.data;
      for (let storageKey in data) {
        storageData.push({
          name: storageKey,
          value: data[storageKey]
        })
      }
      return storageData
    },
    onAddStorageData() {
      this.$refs.modal.open()
    },
    onStorageDataAdded() {
      this.$emit('onStorageDataAdded')
    },
    onDeleteStorageData(item) {
      this.$refs.deleteModal.open(async () => {
        await NetworkAdapter.deleteStorageData(this.$store.guildId, item.name)
        this.onStorageDataDeleted()
      })
    },
    onStorageDataDeleted() {
      this.$emit('onStorageDataDeleted')
    }
  }
}
</script>

<style scoped>

</style>