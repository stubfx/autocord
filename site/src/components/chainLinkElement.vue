<template>
  <div class="group cursor-pointer p-5  w-full
  rounded-xl transition-colors duration-100"
       :class="link.type === 'EVENT' ? 'bg-discord-success' : 'bg-discord-2 hover:text-discord-5 hover:bg-discord-1'">
    <div class="flex flex-row items-center">
      <sensor_rounded class="fill-black w-[60px] group-hover:fill-black" v-if="link.type === 'EVENT'"></sensor_rounded>
      <task_rounded class="fill-gray-400 w-[60px] group-hover:fill-black" v-if="link.type === 'TASK'"></task_rounded>
      <psicology_rounded class="fill-gray-400 w-[60px] group-hover:fill-black" v-if="link.type === 'CONDITION'"></psicology_rounded>
      <div class="flex flex-col mx-2 w-full">
        <span class="font-semibold tracking-wide"
              :class="link.type === 'EVENT' ? 'text-black' : 'text-white'">{{link.name}}</span>
        <div class="flex flex-row" v-if="link.params">
          <span :class="link.type === 'EVENT' ? 'text-black' : 'text-gray-400 group-hover:text-white'">
            {{link.params.map(el => el.name).join(",")}}
          </span>
        </div>
      </div>
      <info_rounded data-tooltip-target="tooltip-default" class="w-[30px] mr-4 group-hover:fill-black"
                    :class="link.type === 'EVENT' ? 'fill-black' : 'fill-gray-400'"></info_rounded>
      <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Tooltip content
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
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