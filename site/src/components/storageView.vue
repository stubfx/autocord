<template>
  <div class="flex flex-row">
    <add-storage-value-dialog ref="modal" @onClose="onStorageDataAdded"></add-storage-value-dialog>
    <storage-value-detail-dialog ref="detailDialog"
                                 @on-delete-storage-data="onDeleteStorageData"></storage-value-detail-dialog>
    <confirm-deletion-dialog  ref="deleteModal"></confirm-deletion-dialog>
    <div class="flex flex-row p bg-dark rounded w-full items-center gap-2 job-bg">
      <div class="flex flex-row bg-secondary p-2 pr-4 rounded hover:bg-primary text-accent cursor-pointer h-full"
           v-for="item in getStorageData()" @click="onItemClick(item)">
        <div class="flex flex-row items-center gap h-full">
          <text_fields_rounded v-if="item.type === StorageParamType.STRING" class="w-token h-token fill-success mr-2"></text_fields_rounded>
          <list_rounded v-if="item.type === StorageParamType.LIST" class="w-token h-token fill-success mr-2"></list_rounded>
          <p>{{ item.name }}</p>
        </div>
      </div>
      <add_rounded class="w-10 h-10 bg-secondary rounded fill-accent hover:bg-success
    hover:fill-black cursor-pointer transition-colors h-full" @click="onAddStorageData"></add_rounded>
    </div>
  </div>
</template>

<script>
import Add_rounded from "../assets/add_rounded.vue";
import SimpleDialog from "./dialog/simpleDialog.vue";
import AddStorageValueDialog from "./dialog/addStorageValueDialog.vue";
import ConfirmDeletionDialog from "./dialog/confirmDeletionDialog.vue";
import {NetworkAdapter} from "../network.js";
import StorageValueDetailDialog from "./dialog/storageValueDetailDialog.vue";
import List_rounded from "../assets/list_rounded.vue";
import {StorageParamType} from "../ParamTypes.js";
import Text_fields_rounded from "../assets/text_fields_rounded.vue";

export default {
  name: "storageView",
  computed: {
    StorageParamType() {
      return StorageParamType
    }
  },
  components: {
    Text_fields_rounded,
    List_rounded,
    StorageValueDetailDialog, ConfirmDeletionDialog, AddStorageValueDialog, SimpleDialog, Add_rounded},
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
          type: data[storageKey].type,
          value: data[storageKey].value
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
    onItemClick(item) {
      // show item details!
      this.$refs.detailDialog.open(item)
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