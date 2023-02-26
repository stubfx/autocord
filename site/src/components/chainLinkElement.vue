<template>
  <div :data-linktype="link.type" class="group cursor-pointer p-5  w-full
  rounded-xl transition-colors duration-100
  data-[linktype=EVENT]:bg-discord-success
  bg-discord-2 hover:text-discord-5 hover:bg-discord-1">
    <div class="flex flex-row items-center">
      <sensor_rounded class="fill-black w-[60px] h-[60px] group-hover:fill-black" v-if="link.type === 'EVENT'"></sensor_rounded>
      <task_rounded class="fill-gray-400 w-[60px] h-[60px] group-hover:fill-black" v-if="link.type === 'TASK'"></task_rounded>
      <psicology_rounded class="fill-gray-400 w-[60px] h-[60px] group-hover:fill-black" v-if="link.type === 'CONDITION'"></psicology_rounded>
      <div class="flex flex-col mx-2 w-full">
        <span class="font-semibold tracking-wide"
              :class="link.type === 'EVENT' ? 'text-black' : 'text-white'">{{link.name}}</span>
<!--        <div class="flex flex-row" v-if="link.acceptParams">-->
        <div class="flex flex-row">
          <span class="font-light" :class="link.type === 'EVENT' ? 'text-black' : 'text-gray-400 group-hover:text-white'">
<!--            {{link.acceptParams.join(", ")}}-->
            {{link.description}}
          </span>
        </div>
      </div>
<!--      <a class="group/info flex flex-col" :title="link.description">-->
<!--        <info_rounded class="w-[30px] group-hover:fill-black fill-gray-400-->
<!--      group-data-[linktype=EVENT]:fill-black"></info_rounded>-->
<!--      </a>-->
    </div>
  </div>
</template>

<script>
import Task_rounded from "../assets/task_rounded.vue";
import Psicology_rounded from "../assets/psicology_rounded.vue";
import Sensor_rounded from "../assets/sensor_rounded.vue";
import Info_rounded from "../assets/info_rounded.vue";

export default {
  name: "chainLinkElement",
  components: {Info_rounded, Sensor_rounded, Psicology_rounded, Task_rounded},
  props: {
    link: Object
  }
}
</script>

<style scoped>

</style>