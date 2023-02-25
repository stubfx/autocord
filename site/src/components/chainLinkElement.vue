<template>
  <div class="group cursor-pointer p-5 bg-discord-2 w-full rounded-xl hover:bg-discord-1
  hover:text-discord-5 transition-colors duration-100">
    <div class="flex flex-row items-center">
      <sensor_rounded class="fill-gray-400 w-10 group-hover:fill-black" v-if="link.type === 'EVENT'"></sensor_rounded>
      <task_rounded class="fill-gray-400 w-10 group-hover:fill-black" v-if="link.type === 'TASK'"></task_rounded>
      <psicology_rounded class="fill-gray-400 w-10 group-hover:fill-black" v-if="link.type === 'CONDITION'"></psicology_rounded>
      <div class="flex flex-col ml-2">
        <span class="font-semibold text-white tracking-wide">{{link.name}}</span>
        <div class="flex flex-row" v-if="link.params">
          <span class="text-gray-400 group-hover:text-white">{{link.params.join(",")}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task_rounded from "../assets/task_rounded.vue";
import Psicology_rounded from "../assets/psicology_rounded.vue";
import Sensor_rounded from "../assets/sensor_rounded.vue";

export default {
  name: "chainLinkElement",
  components: {Sensor_rounded, Psicology_rounded, Task_rounded},
  props: {
    link: Object
  }
}
</script>

<style scoped>

</style>