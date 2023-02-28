<template>
  <div class="flex flex-row p-5 bg-discord-5 rounded-xl w-full items-center gap-2">
    <div class="flex flex-row bg-discord-3 p-2 rounded-md" v-for="item in getStorageData()">
      <p>{{item.name}} : {{item.value}}</p>
    </div>
    <simple-dialog>
      <h2 class="text-3xl font-bold sm:text-4xl">Add Storage Data</h2>

    </simple-dialog>
    <add_rounded class="w-10 h-10 bg-discord-3 rounded-md fill-white hover:bg-discord-success
    hover:fill-black cursor-pointer transition-colors"></add_rounded>
  </div>
</template>

<script>
import Add_rounded from "../assets/add_rounded.vue";
import SimpleDialog from "./dialog/simpleDialog.vue";

export default {
  name: "storageView",
  components: {SimpleDialog, Add_rounded},
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
    }
  }
}
</script>

<style scoped>

</style>