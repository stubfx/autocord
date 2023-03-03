<template>
  <div :data-linktype="link.type" class="group cursor-pointer p
  rounded transition-colors duration-100
  data-[linktype=EVENT]:bg-discord-success
  bg-discord-2 hover:text-discord-5 hover:bg-discord-1 flex-grow w-full h-full select-none">
    <div class="flex flex-row h-full">
      <!--      <div class="flex flex-col w-[60px] justify-start">-->
      <!--        <sensor_rounded class="fill-black group-hover:fill-black" v-if="link.type === 'EVENT'"></sensor_rounded>-->
      <!--        <task_rounded class="fill-gray-400  group-hover:fill-black" v-if="link.type === 'TASK'"></task_rounded>-->
      <!--        <psicology_rounded class="fill-gray-400  group-hover:fill-black" v-if="link.type === 'CONDITION'"></psicology_rounded>-->
      <!--      </div>-->
      <div class="flex flex-col mx-2 w-full flex-grow h-full gap"
           :class="link.type === 'EVENT' ? 'text-black' : 'text-gray-400 group-hover:text-white'">
        <div class="flex flex-row w-full">
          <div class="flex flex-row flex-grow w-full">
            <div class="flex flex-row gap-2 fill-discord-1 bg-discord-5 text-white p-2 px-4 rounded w-fit">
              <token_rounded class="w-6"></token_rounded>
              {{ link.cost }}
            </div>
          </div>
          <div class="flex flex-row bg-discord-error p-2 rounded" v-show="showDelete" @click="onDelete" @click.stop>
            <close_rounded class="fill-white rounded w-6 cursor-pointer"></close_rounded>
          </div>
        </div>
        <div class="flex flex-row w-full items-center">
            <span class="font-semibold tracking-wide flex-grow"
                  :class="link.type === 'EVENT' ? 'text-black' : 'text-white'">{{ link.name }}</span>
        </div>
        <span class="font-light">{{ link.description }}</span>
        <div class="flex flex-col flex-grow w-full h-full justify-end overflow-hidden">
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
import Payments_rounded from "../assets/payments_rounded.vue";
import Token_rounded from "../assets/token_rounded.vue";
import Close_rounded from "../assets/close_rounded.vue";

export default {
  name: "chainLinkElement",
  components: {
    Close_rounded,
    Token_rounded,
    Payments_rounded,
    LinkParamsViewBlock,
    ExposedArgumentString,
    Info_rounded,
    Sensor_rounded,
    Psicology_rounded,
    Task_rounded
  },
  props: {
    link: Object,
    showDelete: false
  },
  emits: ['onDelete'],
  methods: {
    onDelete() {
      this.$emit('onDelete')
    }
  }
}
</script>

<style scoped>

</style>