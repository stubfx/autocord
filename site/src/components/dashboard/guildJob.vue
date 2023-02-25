<template>
  <div class="flex flex-col flex-wrap bg-discord-5 p-6 w-[400px] rounded-xl m-5 items-center shadow-2xl">
    <h1 class="uppercase text-3xl mb-3">{{ job.name }}</h1>
    <div class="group cursor-pointer p-5 bg-discord-2 my-3 w-full rounded-xl
  hover:text-discord-5 transition-colors duration-100 bg-discord-success text-black">
      <div class="flex items-center">
        <sensor_rounded class="fill-black w-10"></sensor_rounded>
        <div class="flex flex-col ml-2">
          <span class="font-bold">{{ job.firedOn }}</span>
        </div>
      </div>
    </div>
    <chain-link-element :link="link" v-for="link in job.chain"></chain-link-element>
    <div class="flex flex-row justify-center group w-full cursor-pointer bg-discord-4 rounded-xl py-4 hover:bg-discord-2
transition-colors my-3" v-if="job.chain.length < 4">
      <add_rounded class="rounded-full bg-discord-2 fill-discord-1 w-[48px]
  group-hover:bg-discord-1 group-hover:fill-white transition-colors"></add_rounded>
    </div>
  </div>
</template>

<script>
import Add_rounded from "../../assets/add_rounded.vue";
import Task_rounded from "../../assets/task_rounded.vue";
import Psicology_rounded from "../../assets/psicology_rounded.vue";
import Sensor_rounded from "../../assets/sensor_rounded.vue";
import ChainLinkElement from "../chainLinkElement.vue";

export default {
  name: "guildJob",
  components: {ChainLinkElement, Sensor_rounded, Psicology_rounded, Task_rounded, Add_rounded},
  props: {
    job: Object
  }
}
</script>

<style scoped>

</style>