<template>
  <div :data-linktype="link.type" class="group cursor-pointer p
  rounded transition-colors duration-100
  data-[linktype=EVENT]:bg-discord-success
  bg-discord-2 hover:text-discord-5 hover:bg-discord-1 flex-grow w-full h-full">
    <div class="flex flex-row h-full">
<!--      <div class="flex flex-col w-[60px] justify-start">-->
<!--        <sensor_rounded class="fill-black group-hover:fill-black" v-if="link.type === 'EVENT'"></sensor_rounded>-->
<!--        <task_rounded class="fill-gray-400  group-hover:fill-black" v-if="link.type === 'TASK'"></task_rounded>-->
<!--        <psicology_rounded class="fill-gray-400  group-hover:fill-black" v-if="link.type === 'CONDITION'"></psicology_rounded>-->
<!--      </div>-->
      <div class="flex flex-col mx-2 w-full flex-grow h-full" :class="link.type === 'EVENT' ? 'text-black' : 'text-gray-400 group-hover:text-white'">
        <span class="font-semibold tracking-wide"
              :class="link.type === 'EVENT' ? 'text-black' : 'text-white'">{{link.name}}</span>
          <span class="font-light">
            {{link.description}}
          </span>
        <div class="flex flex-col flex-grow w-full h-full justify-end">
          <exposed-argument-string :arguments="link.exposesArguments"></exposed-argument-string>
          <link-params-view-block :chain-link="link"></link-params-view-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task_rounded from "../assets/task_rounded.vue";
import Psicology_rounded from "../assets/psicology_rounded.vue";
import Sensor_rounded from "../assets/sensor_rounded.vue";
import Info_rounded from "../assets/info_rounded.vue";
import ExposedArgumentString from "./exposedArgumentString.vue";
import LinkParamsViewBlock from "./linkParamsViewBlock.vue";

export default {
  name: "chainLinkElement",
  components: {LinkParamsViewBlock, ExposedArgumentString, Info_rounded, Sensor_rounded, Psicology_rounded, Task_rounded},
  props: {
    link: Object
  }
}
</script>

<style scoped>

</style>