<template>
  <chain-link-parameters-dialog ref="modal" @onClose="saveJob()">
  </chain-link-parameters-dialog>
  <div class="flex flex-col flex-wrap bg-discord-5 p-6 w-[400px] rounded-xl m-5 items-center shadow-2xl gap-5">
    <h1 class="uppercase text-3xl text-white">{{ job.name }}</h1>
    <chain-link-element :link="link" v-for="link in job.chain.chainLinks" @click="editLink(link)"></chain-link-element>
    <div class="relative group flex flex-row justify-center w-full cursor-pointer bg-discord-4 rounded-xl py-4 hover:bg-discord-2
transition-colors overflow-hidden" v-if="job.chain.chainLinks.length < 5" @click="onAddLink()">
      <div class="absolute rounded-full bg-discord-2 w-[48px] h-[48px] group-hover:bg-discord-1 transition-all
                  group-hover:scale-[10]"></div>
      <add_rounded class="rounded-full fill-discord-1 w-[48px] group-hover:fill-white z-10 group-hover:rotate-180
      transition-all"></add_rounded>
    </div>
  </div>
</template>

<script>
import Add_rounded from "../../assets/add_rounded.vue";
import Task_rounded from "../../assets/task_rounded.vue";
import Psicology_rounded from "../../assets/psicology_rounded.vue";
import Sensor_rounded from "../../assets/sensor_rounded.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import ChainLinkParametersDialog from "../dialog/chainLinkParametersDialog.vue";
import {NetworkAdapter} from "../../network.js";

export default {
  name: "guildJob",
  components: {ChainLinkParametersDialog, ChainLinkElement, Sensor_rounded, Psicology_rounded, Task_rounded, Add_rounded},
  props: {
    job: Object
  },
  emits: ['onAddLink'],
  methods: {
    async saveJob() {
      let guildId = this.$store.guildId
      await NetworkAdapter.saveJob(guildId, this.job)
      window.location.reload()
    },
    onAddLink() {
      this.$emit("onAddLink")
    },
    editLink(link) {
      if (link.acceptParams.length > 0) {
        this.$refs.modal.open(link)
      }
    }
  }
}
</script>

<style scoped>

</style>