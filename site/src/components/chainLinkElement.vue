<template>
  <div :data-linktype="link.type" class="relative group cursor-pointer p
  rounded transition-colors duration-100
  data-[linktype=EVENT]:bg-success
  bg-primary hover:text-dark hover:bg-secondary flex-grow h-fit select-none">
    <div class="flex flex-row w-full">
      <div class="flex flex-row w-full items-center gap">
        <div class="flex flex-row gap-2 fill-accent bg-dark text-accent p-2 px-4 rounded w-fit">
          <token_rounded class="w-6"></token_rounded>
          {{ link.cost }}
        </div>
        <span class="font-semibold tracking-wide flex-grow"
              :class="link.type === 'EVENT' ? 'text-black' : 'text-accent'">{{ link.name }}</span>
        <expand_more_rounded class="w-token cursor-pointer transition-transform duration" :class="isElExpanded ? 'rotate-180' : ''"
                             @click="toggleExpand" @click.stop></expand_more_rounded>
        <div class="flex flex-row">
          <close_rounded class="w-token cursor-pointer" v-show="showDelete" @click="onDelete"
                         @click.stop></close_rounded>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-col w-full flex-grow gap overflow-hidden"
           :class="[link.type === 'EVENT' ? 'text-black' : 'text-accent group-hover:text-accent',
           isElExpanded ? 'h-fit' : 'h-0']">
        <div class="flex flex-row w-full">
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
import Expand_more_rounded from "../assets/expand_more_rounded.vue";

export default {
  name: "chainLinkElement",
  components: {
    Expand_more_rounded,
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
    showDelete: false,
    expanded: false
  },
  emits: ['onDelete'],
  data() {
    return {
      isElExpanded: this.$props.expanded
    }
  },
  methods: {
    onDelete() {
      this.$emit('onDelete')
    },
    toggleExpand() {
      this.isElExpanded = !this.isElExpanded
    }
  }
}
</script>

<style scoped>

</style>