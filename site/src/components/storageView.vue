<template>
  <div class="flex flex-row w-full">
    <add-storage-value-dialog ref="modal" @onClose="onStorageDataAdded"></add-storage-value-dialog>
    <div class="flex flex-row p bg-discord-5 rounded w-full items-center gap-2">
      <div class="flex flex-row bg-discord-3 p-2 rounded" v-for="item in getStorageData()">
        <p>{{ item.name }} : {{ item.value.toString() || 'EMPTY' }}</p>
      </div>
      <add_rounded class="w-10 h-10 bg-discord-3 rounded fill-white hover:bg-discord-success
    hover:fill-black cursor-pointer transition-colors" @click="onAddStorageData"></add_rounded>
    </div>
  </div>
</template>

<script>
import Add_rounded from "../assets/add_rounded.vue";
import SimpleDialog from "./dialog/simpleDialog.vue";
import AddStorageValueDialog from "./dialog/addStorageValueDialog.vue";

export default {
  name: "storageView",
  components: {AddStorageValueDialog, SimpleDialog, Add_rounded},
  emits: ['onStorageDataAdded'],
  props: {
    storage: Object
  },
  methods: {
    getStorageData() {
      let storageData = []
      let data = this.storage.data;
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
    }
  }
}
</script>

<style scoped>

</style>